const sleep226=ms=>new Promise(r=>setTimeout(r,ms));
const norm226=s=>String(s||'').replace(/\s*·\s*toi\s*$/i,'').replace(/\s*\(toi[^)]*\)\s*$/i,'').trim().toLowerCase();
const css226=document.createElement('style');
css226.textContent=`
#grid.v14-stage{display:grid!important;grid-template-columns:minmax(0,1fr) minmax(230px,28%)!important;grid-template-rows:minmax(0,1fr)!important;gap:12px!important;align-items:stretch!important;overflow:hidden!important}
#grid.v14-stage>.tile.v14-presenting{position:relative!important;inset:auto!important;width:100%!important;height:100%!important;min-height:260px!important;margin:0!important;grid-column:1!important;grid-row:1!important;z-index:5!important;border:1px solid rgba(124,104,255,.72)!important;border-radius:18px!important;box-shadow:0 18px 50px rgba(0,0,0,.34)!important;background:#05070b!important}
#grid.v14-stage>.tile.v14-presenting video{width:100%!important;height:100%!important;object-fit:contain!important;background:#03050a!important}
#grid.v14-stage .nc181-roster{grid-column:2!important;grid-row:1!important;width:100%!important;height:100%!important;min-height:0!important;max-width:none!important;margin:0!important;opacity:1!important;pointer-events:auto!important;transform:none!important;display:grid!important;grid-template-columns:1fr!important;grid-auto-rows:minmax(145px,1fr)!important;gap:10px!important;overflow:auto!important;align-content:start!important}
#grid.v14-stage .nc181-card{min-height:145px!important;height:auto!important}
.nc226-photo{position:relative!important;overflow:hidden!important;color:transparent!important;font-size:0!important;text-shadow:none!important}
.nc226-photo::after{content:''!important;position:absolute!important;inset:0!important;z-index:50!important;display:block!important;border-radius:inherit!important;background-image:var(--nc226-avatar)!important;background-repeat:no-repeat!important;background-size:cover!important;background-position:center!important;pointer-events:none!important}
.nc226-fullshare{position:absolute!important;z-index:60!important;top:12px!important;right:12px!important;height:38px!important;padding:0 13px!important;border:1px solid rgba(173,167,255,.42)!important;border-radius:11px!important;background:rgba(18,20,38,.84)!important;color:#fff!important;backdrop-filter:blur(14px)!important;font-size:10px!important;font-weight:900!important;cursor:pointer!important;transition:.16s ease!important}
.nc226-fullshare:hover{transform:translateY(-2px) scale(1.035)!important;background:rgba(83,72,196,.94)!important}.nc226-fullshare:active{transform:scale(.95)!important}
#app.nc226-leaving{opacity:.72!important;pointer-events:none!important;transition:opacity .14s ease!important}
@media(max-width:900px){#grid.v14-stage{grid-template-columns:1fr!important;grid-template-rows:minmax(280px,1.7fr) minmax(170px,.8fr)!important;overflow:auto!important}#grid.v14-stage>.tile.v14-presenting{grid-column:1!important;grid-row:1!important}#grid.v14-stage .nc181-roster{grid-column:1!important;grid-row:2!important;grid-template-columns:repeat(auto-fit,minmax(160px,1fr))!important;grid-auto-rows:minmax(155px,1fr)!important;overflow:visible!important}}
`;
document.head.appendChild(css226);
let C226=null,profiles226=new Map(),busy226=false,leaveSeq226=0,peopleWrapped226=false;
function setVersion226(){document.title='NovaCall V0.22.6';const a=document.querySelector('.v16-brandname span');if(a)a.textContent='V0.22.6';const b=document.querySelector('.brand .v');if(b)b.textContent='0.22.6'}
function p226(n){return profiles226.get(norm226(n))}
function photo226(el,p){if(!el||!p?.avatar_image)return;el.classList.add('nc226-photo');el.style.setProperty('--nc226-avatar',`url(${JSON.stringify(p.avatar_image)})`)}
function patchAvatars226(){
 document.querySelectorAll('.nc181-card').forEach(c=>photo226(c.querySelector('.nc181-avatar'),p226(c.querySelector('.nc181-name')?.textContent||c.querySelector('.nc181-label')?.textContent)));
 document.querySelectorAll('.person').forEach(r=>photo226(r.querySelector('.avatar'),p226(r.querySelector('.pname')?.textContent)));
 document.querySelectorAll('.nc20-me').forEach(r=>photo226(r.querySelector('.nc20-avatar'),p226(r.querySelector('b')?.textContent)));
 document.querySelectorAll('.nc20-friend').forEach(r=>photo226(r.querySelector('.nc20-avatar'),p226(r.querySelector('.nc20-info b')?.textContent)));
 document.querySelectorAll('.nc201-friend').forEach(r=>photo226(r.querySelector('.nc201-av'),p226(r.querySelector('b')?.textContent)));
 const top=document.querySelector('.nc201-top');if(top)photo226(top.querySelector('.nc201-av'),p226(top.querySelector('.nc201-person b')?.textContent));
 document.querySelectorAll('.s21member').forEach(r=>photo226(r.querySelector('.s21av'),p226(r.querySelector('b')?.textContent)));
 const me=document.querySelector('.s21me');if(me)photo226(me.querySelector('.s21av'),p226(me.querySelector('b')?.textContent));
}
function ensureShare226(){for(const t of document.querySelectorAll('#grid>.tile.v14-presenting')){if(t.querySelector('.nc226-fullshare'))continue;const b=document.createElement('button');b.type='button';b.className='nc226-fullshare';b.textContent='⛶ Plein écran';b.onclick=async e=>{e.stopPropagation();try{if(document.fullscreenElement)await document.exitFullscreen();else await t.requestFullscreen?.()}catch{}};t.appendChild(b)}}
async function refreshProfiles226(){if(!C226||busy226)return;busy226=true;try{const q=await C226.from('novacall_accounts').select('user_id,username,avatar_image');if(!q.error){profiles226=new Map((q.data||[]).map(p=>[norm226(p.username),p]));patchAvatars226()}}finally{busy226=false}}
function wrapPeople226(){if(peopleWrapped226)return;try{if(typeof people!=='function')return;const old=people;people=function(a){const r=old(a);patchAvatars226();return r};peopleWrapped226=true}catch{}}
function cleanupRoom226(){
 try{const s=screen;screen=null;s?.getTracks?.().forEach(t=>{t.onended=null;t.stop()})}catch{}
 try{const s=cam;cam=null;s?.getTracks?.().forEach(t=>t.stop())}catch{}
 try{const s=mic;mic=null;s?.getTracks?.().forEach(t=>t.stop())}catch{}
 try{peers.forEach(pc=>{try{pc.close()}catch{}});peers.clear()}catch{}
 try{remoteNodes.forEach(n=>{try{n.remove()}catch{}});remoteNodes.clear()}catch{}
 try{if(ws){ws.onclose=null;ws.close();ws=null}}catch{}
 try{room='';me='';users=[];focused=null;hand=false}catch{}
 document.querySelectorAll('#grid .tile').forEach(n=>n.remove());const rr=document.querySelector('#nc181Roster');if(rr)rr.innerHTML='';
 document.querySelectorAll('.nc19-call,.nc20-ring,.nc201-ring').forEach(n=>n.remove());
}
async function returnHome226(){
 const app=document.querySelector('#app');if(app?.classList.contains('nc226-leaving'))return;app?.classList.add('nc226-leaving');
 cleanupRoom226();history.replaceState(null,'','/');document.querySelector('#join')?.classList.add('hide');document.querySelector('#nc20home')?.remove();document.querySelector('.n19a')?.remove();
 const q=`nc226=${Date.now()}-${++leaveSeq226}`;
 try{await import(`https://nova-call-v20-ui.vercel.app/v20.mjs?${q}`);await sleep226(40);await import(`https://nova-call-v201-ui.vercel.app/v201.mjs?${q}`);await import(`https://nova-call-v21-ui.vercel.app/v21.mjs?${q}`)}catch(e){console.warn('NovaCall smooth leave',e)}
 for(let i=0;i<40&&!document.querySelector('#nc20home');i++)await sleep226(50);
 app?.classList.remove('nc226-leaving');patchAvatars226();setVersion226();
}
document.addEventListener('click',e=>{const b=e.target?.closest?.('#leave');if(!b)return;e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();returnHome226()},true);
(async()=>{for(let i=0;i<120&&!window.NovaCallAccountClient;i++)await sleep226(250);C226=window.NovaCallAccountClient;setVersion226();wrapPeople226();if(C226)await refreshProfiles226();patchAvatars226();ensureShare226();const mo=new MutationObserver(()=>{patchAvatars226();ensureShare226()});mo.observe(document.documentElement,{childList:true,subtree:true});setInterval(()=>{if(!document.hidden){patchAvatars226();ensureShare226();setVersion226()}},1800);setInterval(()=>{if(!document.hidden)refreshProfiles226()},15000)})();