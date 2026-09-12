const LOCK='0.23.4';
const TITLE='NovaCall V'+LOCK;
const versionSelectors=[
  '.v16-brandname span',
  '.brand .v',
  '.nc23-brand small',
  '.nc20-version',
  '.nc20-ver',
  '.nc20brand .v',
  '.nc20-brand .v'
];
function syncVersion(){
  if(document.title!==TITLE) document.title=TITLE;
  for(const sel of versionSelectors){
    document.querySelectorAll(sel).forEach(el=>{
      const raw=(el.textContent||'').trim();
      const target=/^v/i.test(raw)?'V'+LOCK:LOCK;
      if(raw!==target) el.textContent=target;
    });
  }
}
let queued=false;
function queueSync(){
  if(queued) return;
  queued=true;
  requestAnimationFrame(()=>{queued=false;syncVersion();});
}
syncVersion();
const mo=new MutationObserver(queueSync);
mo.observe(document.documentElement,{subtree:true,childList:true,characterData:true});
window.addEventListener('pageshow',queueSync);
document.addEventListener('visibilitychange',()=>{if(!document.hidden)queueSync()});
