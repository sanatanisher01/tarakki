import {env} from 'cloudflare:workers';
import {getChatGPTUser} from './chatgpt-auth';
import {emptyState,type WorkspaceState} from './types';
export class ApiError extends Error{constructor(public status:number,message:string){super(message);}}
export function db(){if(!env.DB)throw new ApiError(503,'Storage is unavailable. Your changes have not been saved.');return env.DB;}
export function bucket(){if(!env.BUCKET)throw new ApiError(503,'Image storage is unavailable. Please try again.');return env.BUCKET;}
export async function owner(request?:Request){const user=await getChatGPTUser();if(!user)throw new ApiError(401,'Please sign in to continue.');if(request&&request.method!=='GET'){const origin=request.headers.get('origin');if(origin&&origin!==new URL(request.url).origin)throw new ApiError(403,'This request is not allowed.');}return user.userId;}
export type Row={owner:string;slug:string|null;payload:string;revision:number;updated_at:string};
export async function workspace(userId:string){await db().prepare('INSERT OR IGNORE INTO workspaces (owner,slug,payload,revision,updated_at) VALUES (?,NULL,?,0,?)').bind(userId,JSON.stringify(emptyState),new Date().toISOString()).run();const row=await db().prepare('SELECT * FROM workspaces WHERE owner=?').bind(userId).first<Row>();if(!row)throw new ApiError(503,'Could not load your shop.');return {state:JSON.parse(row.payload) as WorkspaceState,revision:row.revision};}
export function failure(e:unknown){if(e instanceof ApiError)return Response.json({error:e.message},{status:e.status});console.error('Tarakki request failed',e);return Response.json({error:'Something went wrong. Please try again.'},{status:500});}
export async function json(request:Request){const value=await request.text();if(value.length>1_000_000)throw new ApiError(413,'Too much data. Please reduce your catalogue size.');try{return JSON.parse(value);}catch{throw new ApiError(400,'Please send valid data.');}}
