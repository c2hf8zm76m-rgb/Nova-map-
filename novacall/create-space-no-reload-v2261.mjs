// NovaCall V0.22.6.1 — create space without page reload / intermediate screens
const sleep2261=ms=>new Promise(r=>setTimeout(r,ms));
let creating2261=false;

function setVersion2261(){
  document.title='NovaCall V0.22.6.1';
  const a=document.querySelector('.v16-brandname span');
  if(a)a.textContent='V0.22.6.1';
  const b=document.querySelector('.brand .v');
  if(b)b.textContent='0.22.6.1';
  const h=document.querySelector('.nc20-brand small');
  if(h)h.textContent='V0.22.6.1';
}

function toast2261(text){
  try{if(typeof window.toast==='function'){window.toast(text);return}}catch{}
  const old=document.querySelector('.nc2261-toast');old?.remove();
  const e=document.createElement('div');e.className='nc2261-toast';e.textContent=text;
  Object.assign(e.style,{position:'fixed',left:'50%',bottom:'20px',transform:'translateX(-50%)',zIndex:'2500',padding:'10px 14px',borderRadius:'12px',background:'#151d2b',border:'1px solid rgba(132,146,185,.22)',color:'#fff',fontSize:'10px',fontWeight:'850',boxShadow:'0 16px 55px rgba(0,0,0,.4)'});
  document.body.appendChild(e);setTimeout(()=>e.remove(),2400);
}

async function createSpace2261(btn){
  if(creating2261)return;
  creating2261=true;
  const original=btn?.textContent||'Créer un espace';
  if(btn){btn.disabled=true;btn.textContent='Création…'}
  try{
    const quick=document.getElementById('quick');
    const app=document.getElementById('app');
    const home=document.getElementById('nc20home');
    const roomInput=document.getElementById('room');
    const nameInput=document.getElementById('name');
    if(!quick||!app||!roomInput)throw new Error('Moteur de room indisponible');
    if(nameInput&&!nameInput.value.trim())nameInput.value=localStorage.getItem('novacall-name')||'Invité';

    // Use NovaCall's existing in-page room creation instead of location.href.
    quick.click();

    const start=Date.now();
    while(Date.now()-start<10000){
      await sleep2261(60);
      const entered=!app.classList.contains('hide');
      if(entered){
        home?.remove();
        setVersion2261();
        creating2261=false;
        return;
      }
      const err=document.getElementById('err')?.textContent?.trim();
      if(err&&err!=='Connexion…')throw new Error(err);
    }
    throw new Error('Connexion à l’espace trop longue');
  }catch(e){
    console.warn('NovaCall create space V0.22.6.1',e);
    creating2261=false;
    if(btn){btn.disabled=false;btn.textContent=original}
    toast2261(String(e?.message||'Impossible de créer l’espace'));
  }
}

// Capture the click before V0.20's old handler, which performs location.href.
document.addEventListener('click',e=>{
  const btn=e.target?.closest?.('#nc20new');
  if(!btn)return;
  e.preventDefault();
  e.stopPropagation();
  e.stopImmediatePropagation();
  createSpace2261(btn);
},true);

// Keep the visible version in sync when the home is rendered later.
const mo2261=new MutationObserver(()=>setVersion2261());
mo2261.observe(document.documentElement,{childList:true,subtree:true});
setVersion2261();
