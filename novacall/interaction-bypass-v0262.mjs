(()=>{
  if(window.__NovaCallInteractionBypass0262)return;
  window.__NovaCallInteractionBypass0262=1;
  const VERSION='0.26.2';
  const inside=(el,x,y)=>{if(!el)return false;const r=el.getBoundingClientRect();return x>=r.left&&x<=r.right&&y>=r.top&&y<=r.bottom};
  const fix=()=>{document.title='NovaCall V'+VERSION;const j=document.querySelector('.v16-brandname span');if(j)j.textContent='V'+VERSION;const s=document.querySelector('.brand .v');if(s)s.textContent=VERSION;for(const id of ['name','room']){const el=document.getElementById(id);if(el){el.disabled=false;el.readOnly=false;el.tabIndex=0;el.style.pointerEvents='auto'}}};
  const runConnect=()=>{let n=0;const go=()=>{try{if(typeof connect==='function'){connect();return true}}catch{}return false};if(go())return;const t=setInterval(()=>{if(go()||++n>50){clearInterval(t);if(n>50){const e=document.getElementById('err');if(e)e.textContent='Le moteur NovaCall ne répond pas — recharge la page.'}}},100)};
  let last=0;
  const bypass=e=>{const join=document.getElementById('join');if(!join||join.classList.contains('hide'))return;const room=document.getElementById('room'),quick=document.getElementById('quick'),enter=document.getElementById('enter');const x=e.clientX??e.touches?.[0]?.clientX,y=e.clientY??e.touches?.[0]?.clientY;if(x==null||y==null)return;if(inside(room,x,y)){room.disabled=false;room.readOnly=false;e.preventDefault?.();e.stopImmediatePropagation?.();setTimeout(()=>room.focus({preventScroll:true}),0);last=Date.now();return}if(inside(quick,x,y)){e.preventDefault?.();e.stopImmediatePropagation?.();room.value='nova-'+Math.random().toString(36).slice(2,8);room.dispatchEvent(new Event('input',{bubbles:true}));room.dispatchEvent(new Event('change',{bubbles:true}));last=Date.now();setTimeout(runConnect,0);return}if(inside(enter,x,y)){e.preventDefault?.();e.stopImmediatePropagation?.();last=Date.now();setTimeout(runConnect,0)}};
  document.addEventListener('pointerdown',bypass,true);
  document.addEventListener('mousedown',e=>{if(Date.now()-last<350)return;bypass(e)},true);
  document.addEventListener('touchstart',e=>{if(Date.now()-last<350)return;bypass(e)},{capture:true,passive:false});
  document.addEventListener('click',e=>{if(Date.now()-last<700){const r=document.getElementById('room'),q=document.getElementById('quick'),en=document.getElementById('enter');if(inside(r,e.clientX,e.clientY)||inside(q,e.clientX,e.clientY)||inside(en,e.clientX,e.clientY)){e.preventDefault();e.stopImmediatePropagation()}}},true);
  fix();document.addEventListener('DOMContentLoaded',fix,{once:true});setTimeout(fix,50);setTimeout(fix,400);setInterval(fix,1800);
})();
