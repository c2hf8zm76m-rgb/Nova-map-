const wait=ms=>new Promise(r=>setTimeout(r,ms));
let C,U,busy=false;
const css=document.createElement('style');
css.textContent=`.s21member{grid-template-columns:34px minmax(0,1fr) auto!important;border-radius:11px;transition:background .16s ease}.s21member:hover{background:rgba(255,255,255,.035)}.nc221-kick{width:27px;height:27px;border:1px solid rgba(255,120,140,.16);border-radius:8px;background:rgba(105,32,48,.18);color:#ff9cac;display:grid;place-items:center;cursor:pointer;font-size:12px;font-weight:900;opacity:0;transform:scale(.88);transition:.16s ease}.s21member:hover .nc221-kick,.nc221-kick:focus-visible{opacity:1;transform:scale(1)}.nc221-kick:hover{background:rgba(180,54,75,.42);border-color:rgba(255,125,145,.52);transform:scale(1.08)}@media(max-width:680px){.nc221-kick{opacity:1;transform:none}}`;
document.head.appendChild(css);
function toast(t){const e=document.createElement('div');e.className='nc22-pwa-note';e.textContent=t;document.body.appendChild(e);setTimeout(()=>e.remove(),2400)}
async function server(){
 const on=[...document.querySelectorAll('[data-rail] .s21rb')].findIndex(b=>b.classList.contains('on'));if(on<0)return null;
 const q=await C.from('novacall_server_members').select('server_id,role,joined_at').eq('user_id',U.id).order('joined_at',{ascending:false});if(q.error)return null;
 const ids=(q.data||[]).map(x=>x.server_id);if(!ids.length)return null;
 const s=await C.from('novacall_servers').select('id,name').in('id',ids);if(s.error)return null;
 const m=new Map((s.data||[]).map(x=>[String(x.id),x]));
 return (q.data||[]).map(x=>m.get(String(x.server_id))?{...m.get(String(x.server_id)),myRole:x.role}:null).filter(Boolean)[on]||null;
}
async function patch(){
 if(busy||!C||!U||!document.querySelector('.s21'))return;busy=true;
 try{
  const srv=await server();if(!srv)return;
  const admin=['owner','admin'].includes(String(srv.myRole));
  const q=await C.from('novacall_server_members').select('server_id,user_id,role,joined_at').eq('server_id',srv.id).order('joined_at');if(q.error)return;
  const ids=(q.data||[]).map(x=>x.user_id),p=ids.length?(await C.from('novacall_accounts').select('user_id,username').in('user_id',ids)).data||[]:[];
  const byName=new Map(p.map(x=>[String(x.username||'').trim().toLowerCase(),x])),byId=new Map((q.data||[]).map(x=>[String(x.user_id),x]));
  for(const row of document.querySelectorAll('.s21member')){
   const username=String(row.querySelector('b')?.textContent||'').trim(),prof=byName.get(username.toLowerCase()),mem=prof?byId.get(String(prof.user_id)):null;
   let b=row.querySelector('.nc221-kick');const ok=!!(admin&&mem&&mem.role!=='owner'&&String(mem.user_id)!==String(U.id));
   if(!ok){b?.remove();continue}
   if(!b){b=document.createElement('button');b.type='button';b.className='nc221-kick';b.textContent='✕';b.title='Retirer '+username+' du serveur';row.appendChild(b)}
   b.onclick=async e=>{e.stopPropagation();if(!confirm('Retirer '+username+' du serveur ?'))return;b.disabled=true;const d=await C.from('novacall_server_members').delete().eq('server_id',srv.id).eq('user_id',mem.user_id);if(d.error){toast('Impossible de retirer '+username+'.');b.disabled=false;return}row.remove();toast(username+' a été retiré du serveur ✓')};
  }
 }finally{busy=false}
}
(async()=>{for(let i=0;i<120&&!window.NovaCallAccountClient;i++)await wait(250);C=window.NovaCallAccountClient;if(!C)return;const s=await C.auth.getSession();U=s?.data?.user||s?.data?.session?.user||null;if(!U)return;setInterval(()=>{if(!document.hidden)patch()},900);patch()})();