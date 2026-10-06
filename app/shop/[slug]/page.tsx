import {notFound} from 'next/navigation';
import {getChatGPTUser} from '../../chatgpt-auth';
import {db,type Row} from '../../server';
import type {WorkspaceState} from '../../types';
import Storefront from '../../storefront';
export const dynamic='force-dynamic';
export default async function ShopPage({params,searchParams}:{params:Promise<{slug:string}>;searchParams:Promise<{preview?:string}>}){const {slug}=await params;const query=await searchParams;const row=await db().prepare('SELECT * FROM workspaces WHERE slug=?').bind(slug).first<Row>();if(!row)notFound();const state=JSON.parse(row.payload) as WorkspaceState;const user=await getChatGPTUser();const isOwner=user?.userId===row.owner;if(!state.shop.published&&!isOwner)notFound();return <Storefront shop={state.shop} products={state.products} preview={isOwner&&query.preview==='1'}/>;}
