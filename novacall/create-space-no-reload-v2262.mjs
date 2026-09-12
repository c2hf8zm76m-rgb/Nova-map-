// NovaCall V0.22.6.2 — stable create-space without reload or MutationObserver loop
const sleep2262=ms=>new Promise(r=>setTimeout(r,ms));
let creating2262=false;

function setVersion2262(){
  document.title='NovaCall V0.22.6.2';
  const a=document.querySelector('.v16-brandname span');
  if(a&&a.textContent!=='V0.22.6.2')a.textContent='V0.22.6.2';
  const b=document.querySelector('.brand .v');
  if(b&&b.textContent!=='0.22.6.2')b.textContent='0.22.6.2';
  const h=document.querySelector('.nc20-brand small');
  if(h&&h.textContent!=='V0.22.6.2')h.textContent='V0.22.6.2';
}

function toast2262(text){
  try{if(typeof window.toast==='function'){window.toast(text);return}}catch{}
  document.querySelector('.nc2262-toast')?.remove();
  const e=document.createElement('div');
  e.className='nc2262-toast';
  e.textContent=text;
  Object.assign(e.style,{position:'fixed',left:'50%',bottom:'20px',transform:'translateX(-50%)',zIndex:'2500',padding:'10px 14px',borderRadius:'12px',background:'#151d2b',border:'1px solid rgba(132,146,185,.22)',color:'#fff',fontSize:'10px',fontWeight:'850',boxShadow:'0 16px 55px rgba(0,0,0,.4)'});
  document.body.appendChild(e);
  setTimeout(()=>e.remove(),2400);
}

async function waitAccountReady2262(){
  // Do not force login or reload. Just let the account module finish restoring an existing session.
  for(let i=0;i<80;i++){
    const auth=document.querySelector('.n19a');
    const home=document.getElementById('nc20home');
    if(home) return true;
    // If the login modal is genuinely visible after startup, stop waiting: user is not authenticated.
    if(auth && i>16) return false;
    await sleep2262(125);
  }
  return !!document.getElementById('nc20home');
}

async function createSpace2262(btn){
  if(creating2262)return;
  creating2262=true;
  const original=btn?.textContent||'Créer un espace';
  if(btn){btn.disabled=true;btn.textContent='Création…'}
  try{
    const ready=await waitAccountReady2262();
    if(!ready && document.querySelector('.n19a')) throw new Error('Connexion NovaCall requise');

    const quick=document.getElementById('quick');
    const app=document.getElementById('app');
    const home=document.getElementById('nc20home');
    const roomInput=document.getElementById('room');
    const nameInput=document.getElementById('name');
    if(!quick||!app||!roomInput)throw new Error('Moteur de room indisponible');

    if(nameInput&&!nameInput.value.trim()){
      const saved=localStorage.getItem('novacall-name')||'';
      if(saved)nameInput.value=saved;
    }

    // Existing NovaCall quick-create works entirely in-page.
    quick.click();

    const start=Date.now();
    while(Date.now()-start<12000){
      await sleep2262(80);
      if(!app.classList.contains('hide')){
        home?.remove();
        setVersion2262();
        history.replaceState(null,'',location.pathname+location.search);
        creating2262=false;
        return;
      }
      const err=document.getElementById('err')?.textContent?.trim();
      if(err&&err!=='Connexion…')throw new Error(err);
    }
    throw new Error('Connexion à l’espace trop longue');
  }catch(e){
    console.warn('NovaCall create space V0.22.6.2',e);
    creating2262=false;
    if(btn){btn.disabled=false;btn.textContent=original}
    toast2262(String(e?.message||'Impossible de créer l’espace'));
  }
}

// Intercept only the homepage Create button before V0.20 can execute its old location.href handler.
document.addEventListener('click',e=>{
  const btn=e.target?.closest?.('#nc20new');
  if(!btn)return;
  e.preventDefault();
  e.stopPropagation();
  e.stopImmediatePropagation();
  createSpace2262(btn);
},true);

// No MutationObserver here: it caused the V0.22.6.1 infinite rendering loop.
setVersion2262();
setInterval(()=>{if(!document.hidden)setVersion2262()},2000);
