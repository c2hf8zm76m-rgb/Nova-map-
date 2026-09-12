const C235=window.NovaCallAccountClient;
const norm235=s=>String(s||'').replace(/\s*\(toi[^)]*\)\s*$/i,'').replace(/\s*·\s*toi\s*$/i,'').trim().toLowerCase();
let profiles235=new Map(),busy235=false;
const css235=document.createElement('style');
css235.textContent=`
#people .personTop{display:flex!important;align-items:center!important;gap:9px!important}
#people .personTop>.avatar[data-nc235-main="1"],#people .personTop>.v16-avatar[data-nc235-main="1"]{display:grid!important;flex:0 0 auto!important;background-size:cover!important;background-position:center!important;background-repeat:no-repeat!important;overflow:hidden!important}
#people .personTop>[data-nc235-duplicate="1"]{display:none!important}
`;
document.head.appendChild(css235);
function isAvatarLike235(el){
 if(!el||el.nodeType!==1)return false;
 if(el.matches?.('.avatar,.v16-avatar,.nc181-avatar,.nc182-avatar,.nc226-photo,img'))return true;
 const c=String(el.className||'').toLowerCase();
 if(c.includes('avatar')||c.includes('profile-photo')||c.includes('profilepic'))return true;
 const bg=getComputedStyle(el).backgroundImage||'';
 return bg&&bg!=='none'&&(el.offsetWidth<=80&&el.offsetHeight<=80);
}
function patchRow235(row){
 const top=row.querySelector('.personTop')||row;
 const name=norm235(row.querySelector('.pname')?.textContent||'');
 const p=profiles235.get(name);
 let main=top.querySelector(':scope > .avatar,:scope > .v16-avatar')||top.querySelector('.avatar,.v16-avatar');
 const candidates=[...top.children].filter(isAvatarLike235);
 if(!main&&candidates.length)main=candidates[0];
 if(!main)return;
 main.dataset.nc235Main='1';
 delete main.dataset.nc235Duplicate;
 if(p?.avatar_image){
   main.classList.remove('nc182-avatar');
   main.style.setProperty('background-image',`url(${JSON.stringify(p.avatar_image)})`,'important');
   main.style.setProperty('background-size','cover','important');
   main.style.setProperty('background-position','center','important');
   main.style.setProperty('color','transparent','important');
   main.style.setProperty('font-size','0','important');
   main.textContent='';
   main.classList.add('nc226-photo');
   main.style.setProperty('--nc226-avatar',`url(${JSON.stringify(p.avatar_image)})`);
 }
 for(const el of candidates){
   if(el===main)continue;
   el.dataset.nc235Duplicate='1';
   el.setAttribute('aria-hidden','true');
 }
 // Also catch injected avatar images nested as siblings after initial rendering.
 for(const el of top.querySelectorAll('img,[class*="avatar" i]')){
   if(el===main||main.contains(el))continue;
   if(el.closest('.pname,.pmeta'))continue;
   el.dataset.nc235Duplicate='1';
   el.setAttribute('aria-hidden','true');
 }
}
function patch235(){document.querySelectorAll('#people .person').forEach(patchRow235)}
async function refresh235(){
 if(!C235||busy235)return;busy235=true;
 try{
   const q=await C235.from('novacall_accounts').select('username,avatar_image');
   if(!q.error)profiles235=new Map((q.data||[]).map(p=>[norm235(p.username),p]));
 }catch(e){console.warn('NovaCall avatar V0.23.5',e)}finally{busy235=false}
 patch235();
}
(async()=>{
 if(C235)await refresh235();
 patch235();
 const mo=new MutationObserver(()=>patch235());
 const people=document.querySelector('#people');
 if(people)mo.observe(people,{childList:true,subtree:true});
 setInterval(()=>{if(!document.hidden)patch235()},1200);
 setInterval(()=>{if(!document.hidden)refresh235()},15000);
})();