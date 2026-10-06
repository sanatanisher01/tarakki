export type Shop={name:string;slug:string;category:string;description:string;phone:string;address:string;hours:string;theme:'blue'|'green'|'orange';published:boolean};
export type Product={id:string;name:string;price:number;description:string;stock:number;image:string};
export type Post={id:string;productId:string;platform:'Instagram'|'Facebook'|'Threads';language:'English'|'Hindi'|'Hinglish';caption:string;scheduledAt:string;status:'draft'|'planned'};
export type WorkspaceState={shop:Shop;products:Product[];posts:Post[]};
export const emptyState:WorkspaceState={shop:{name:'',slug:'',category:'',description:'',phone:'',address:'',hours:'',theme:'blue',published:false},products:[],posts:[]};
