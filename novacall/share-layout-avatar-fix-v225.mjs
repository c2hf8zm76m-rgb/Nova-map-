const sleep225=ms=>new Promise(r=>setTimeout(r,ms));
const norm225=s=>String(s||'').replace(/\s*·\s*toi\s*$/i,'').replace(/\s*\(toi[^)]*\)\s*$/i,'').trim().toLowerCase();
const css225=document.createElement('style');
css225.textContent=`
#grid.v14-stage{display:grid!important;grid-template-columns:minmax(0,1fr) minmax(230px,28%)!important;grid-template-rows:minmax(0,1fr)!important;gap:12px!important;align-items:stretch!important;overflow:hidden!important}
#grid.v14-stage>.tile.v14-presenting{position:relative!important;inset:auto!important;left:auto!important;right:auto!important;top:auto!important;bottom:auto!important;width:100%!important;height:100%!important;min-height:260px!important;margin:0!important;grid-column:1!important;grid-row:1!important;z-index:5!important;border:1px solid rgba(124,104,255,.72)!important;border-radius:18px!important;box-shadow:0 0 0 1px rgba(125,105,255,.12),0 18px 50px rgba(0,0,0,.34)!important;background:#05070b!important}
#grid.v14-stage>.tile.v14-presenting video{width:100%!important;height:100%!important;object-fit:contain!important;background:#03050a!important}
#grid.v14-stage .nc181-roster{grid-column:2!important;grid-row:1!important;width:100%!important;height:100%!important;min-height:0!important;max-width:none!important;margin:0!important;opacity:1!important;pointer-events:auto!important;transform:none!important;display:grid!important;grid-template-columns:1fr!important;grid-auto-rows:minmax(145px,1fr)!important;gap:10px!important;overflow:auto!important;align-content:start!important;padding-right:2px!important;scrollbar-width:thin!important}
#grid.v14-stage .nc181-card{min-height:145px!important;height:auto!important}
#grid.v14-stage .nc181-avatar{width:58px!important;height:58px!important;border-radius:18px!important}
#grid.v14-stage .nc181-name{font-size:12px!important}
.nc225-fullshare{position:absolute!important;z-index:50!important;top:12px!important;right:12px!important;height:38px!important;padding:0 13px!important;border:1px solid rgba(173,167,255,.42)!important;border-radius:11px!important;background:rgba(18,20,38,.82)!important;color:#fff!important;backdrop-filter:blur(14px)!important;-webkit-backdrop-filter:blur(14px)!important;font-size:10px!important;font-weight:900!important;cursor:pointer!important;box-shadow:0 10px 26px rgba(0,0,0,.3)!important;transition:transform .16s ease,background .16s ease,border-color .16s ease,box-shadow .16s ease!important}
.nc225-fullshare:hover{transform:translateY(-2px) scale(1.035)!important;background:rgba(83,72,196,.9)!important;border-color:rgba(190,184,255,.75)!important;box-shadow:0 12px 30px rgba(55,47,160,.34)!important}
.nc225-fullshare:active{transform:scale(.95)!important}
.nc225-photo{font-size:0!important;color:transparent!important;text-shadow:none!important;background-repeat:no-repeat!important;background-size:cover!important;background-position:center!important}
@media(max-width:900px){#grid.v14-stage{grid-template-columns:1fr!important;grid-template-rows:minmax(280px,1.7fr) minmax(170px,.8fr)!important;overflow:auto!important}#grid.v14-stage>.tile.v14-presenting{grid-column:1!important;grid-row:1!important}#grid.v14-stage .nc181-roster{grid-column:1!important;grid-row:2!important;grid-template-columns:repeat(auto-fit,minmax(160px,1fr))!important;grid-auto-rows:minmax(155px,1fr)!important;overflow:visible!important}}
@media(max-width:600px){#grid.v14-stage{grid-template-rows:minmax(230px,1.4fr) auto!important}#grid.v14-stage .nc181-roster{grid-template-columns:1fr 1fr!important;grid-auto-rows:minmax(135px,1fr)!important}.nc225-fullshare{height:34px!important;top:8px!important;right:8px!important;padding:0 10px!important}}
`;
document.head.appendChild(css225);
let C225=null,profiles225=new Map(),busy225=false;
function setVersion225(){document.title='NovaCall V0.22.5';document.querySelector('.v16-brandname span')?.replaceChildren('V0.22.5');document.querySelector('.brand .v')?.replaceChildren('0.22.5')}
function profile225(name){return profiles225.get(norm225(name));}
function lockAvatar225(el,p){if(!el||!p?.avatar_image)return;el.classList.add('nc225-photo');el.style.setProperty('background-image',`url(${JSON.stringify(p.avatar_image)})`,'important');el.style.setProperty('background-size','cover','important');el.style.setProperty('background-position','center','important');el.style.setProperty('background-repeat','no-repeat','important');}
function patchAvatars225(){
 document.querySelectorAll('.nc181-card').forEach(card=>{const n=card.querySelector('.nc181-name')?.textContent||card.querySelector('.nc181-label')?.textContent;lockAvatar225(card.querySelector('.nc181-avatar'),profile225(n));});
 document.querySelectorAll('.person').forEach(row=>lockAvatar225(row.querySelector('.avatar'),profile225(row.querySelector('.pname')?.textContent)));
 document.querySelectorAll('.nc20-friend').forEach(row=>lockAvatar225(row.querySelector('.nc20-avatar'),profile225(row.querySelector('.nc20-info b')?.textContent)));
 document.querySelectorAll('.nc201-friend').forEach(row=>lockAvatar225(row.querySelector('.nc201-av'),profile225(row.querySelector('b')?.textContent)));
 const top=document.querySelector('.nc201-top');if(top)lockAvatar225(top.querySelector('.nc201-av'),profile225(top.querySelector('.nc201-person b')?.textContent));
}
function ensureShare225(){
 const tiles=[...document.querySelectorAll('#grid>.tile.v14-presenting')];
 for(const t of tiles){if(t.querySelector('.nc225-fullshare'))continue;const b=document.createElement('button');b.type='button';b.className='nc225-fullshare';b.textContent='⛶ Plein écran';b.title='Afficher le partage en plein écran';b.onclick=async e=>{e.stopPropagation();try{if(document.fullscreenElement)await document.exitFullscreen();else await t.requestFullscreen?.()}catch{}};t.appendChild(b)}
}
function patch225(){setVersion225();ensureShare225();patchAvatars225()}
async function refreshProfiles225(){if(!C225||busy225)return;busy225=true;try{const q=await C225.from('novacall_accounts').select('user_id,username,avatar_image');if(!q.error){profiles225=new Map((q.data||[]).map(p=>[norm225(p.username),p]));patchAvatars225()}}finally{busy225=false}}
(async()=>{for(let i=0;i<120&&!window.NovaCallAccountClient;i++)await sleep225(250);C225=window.NovaCallAccountClient;setVersion225();if(C225)await refreshProfiles225();patch225();const mo=new MutationObserver(()=>queueMicrotask(patch225));mo.observe(document.documentElement,{childList:true,subtree:true,characterData:true});setInterval(()=>{if(!document.hidden)patch225()},350);setInterval(()=>{if(!document.hidden)refreshProfiles225()},10000)})();
