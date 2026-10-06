'use client';
export default function ErrorPage({reset}:{reset:()=>void}){return <main style={{padding:'10vh 24px',textAlign:'center',fontFamily:'system-ui'}}><h1>We could not load your shop.</h1><p>Please try again. Previously saved details are still stored.</p><button onClick={reset}>Try again</button></main>;}
