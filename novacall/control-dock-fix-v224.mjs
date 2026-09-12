// NovaCall V0.22.4 — fix call dock duplicates + visible scrollbar
(() => {
  const ICONS={hand:'✋',mic:'🎙',ptt:'⌨',noise:'≈',deaf:'🎧',cam:'◉',screen:'▣',leave:'☎'};
  const LABELS={hand:'Main',mic:'Micro',ptt:'PTT',noise:'Bruit',deaf:'Son',cam:'Caméra',screen:'Partager',leave:'Quitter'};
  const style=document.createElement('style');
  style.id='nc224-dock-fix';
  style.textContent=`
    .controls{scrollbar-width:none!important;-ms-overflow-style:none!important}
    .controls::-webkit-scrollbar{display:none!important;width:0!important;height:0!important}
    .controls .control::before{content:none!important;display:none!important}
    .controls .control{font-size:0!important}
    .controls .control .nc224-icon{display:grid!important;place-items:center!important;min-height:21px!important;font-size:18px!important;line-height:1!important;font-weight:950!important;color:#f8faff!important;text-shadow:0 0 12px rgba(205,216,255,.16)!important;transition:transform .18s ease,filter .18s ease!important}
    .controls .control:hover .nc224-icon{transform:translateY(-1px) scale(1.10)!important;filter:drop-shadow(0 0 7px rgba(132,126,255,.62))!important}
    .controls .control small{display:block!important;margin:1px 0 0!important;font-size:8px!important;line-height:1!important;letter-spacing:.055em!important;font-weight:900!important;text-transform:uppercase!important}
    @media(min-width:901px){.controls{overflow:visible!important}}
    @media(max-width:900px){.controls{overflow-x:auto!important;overflow-y:hidden!important;scrollbar-width:none!important}.controls::-webkit-scrollbar{display:none!important;width:0!important;height:0!important}}
  `;
  document.head.appendChild(style);

  function clean(btn){
    if(!btn)return;
    const state=(btn.querySelector('small')?.textContent||'').trim();
    const icon=ICONS[btn.id]||'•';
    const label=LABELS[btn.id]||'Action';
    const currentIcon=btn.querySelector('.nc224-icon');
    if(!currentIcon || btn.children.length!==2){
      btn.innerHTML=`<span class="nc224-icon" aria-hidden="true">${icon}</span><small>${state}</small>`;
    }
    btn.dataset.nc224='1';
    btn.setAttribute('aria-label',label+(state?' '+state:''));
    btn.title=label;
  }

  function scan(){document.querySelectorAll('.controls .control').forEach(clean)}
  const obs=new MutationObserver(()=>scan());
  obs.observe(document.documentElement,{childList:true,subtree:true});
  scan();
  setInterval(scan,1200);

  document.title='NovaCall V0.22.4';
  const brand=()=>{document.querySelector('.v16-brandname span')?.replaceChildren('V0.22.4');document.querySelector('.brand .v')?.replaceChildren('0.22.4')};
  brand();setInterval(brand,2500);
})();