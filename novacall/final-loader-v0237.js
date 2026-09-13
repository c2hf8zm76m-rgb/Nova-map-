// NovaCall final loader: charge les anciennes couches hors écran puis révèle seulement l'état final.
(async()=>{
  const modules=[
    'https://nova-call-v1932-ui.vercel.app/v1932.mjs',
    'https://nova-call-v1933-ui.vercel.app/v1933.mjs',
    'https://nova-call-v1934-ui.vercel.app/v1934.mjs',
    'https://nova-call-v20-ui.vercel.app/v20.mjs',
    'https://nova-call-v201-ui.vercel.app/v201.mjs',
    'https://nova-call-v202-ui.vercel.app/v202.mjs',
    'https://nova-call-v21-kk0jl6wgc-alo12230-6256s-projects.vercel.app/v21.mjs',
    'https://nova-call-kz82hz321-alo12230-6256s-projects.vercel.app/v22.mjs',
    'https://nova-call-m0xsart8a-alo12230-6256s-projects.vercel.app/v221.mjs',
    'https://cdn.jsdelivr.net/gh/c2hf8zm76m-rgb/Nova-map-@3bd4d73f00d54f844810a20543c51ececdc57bcc/novacall/member-kick.mjs',
    'https://cdn.jsdelivr.net/gh/c2hf8zm76m-rgb/Nova-map-@70d82d5cae886a0f568fb6b4c746cdf23e1201ed/novacall/control-dock-fix-v224.mjs',
    'https://cdn.jsdelivr.net/gh/c2hf8zm76m-rgb/Nova-map-@f28fa003267af6e2dfa881ee3bcb713291e30958/novacall/stable-avatar-smooth-leave-v226.mjs',
    'https://cdn.jsdelivr.net/gh/c2hf8zm76m-rgb/Nova-map-@6bff1122cad19707ad2c6efe75024d9e047cb169/novacall/community-v023.mjs',
    'https://cdn.jsdelivr.net/gh/c2hf8zm76m-rgb/Nova-map-@b4a0c06852f7abe36859b55a4a78bdcab083e586/novacall/community-nav-fix-v0231.mjs',
    'https://cdn.jsdelivr.net/gh/c2hf8zm76m-rgb/Nova-map-@eac522d7429117caed91fbb9902af5d9e27d6b59/novacall/voice-composer-fix-v0232.mjs',
    'https://cdn.jsdelivr.net/gh/c2hf8zm76m-rgb/Nova-map-@515faaf937acf56899e6f1b299329847c91c4d49/novacall/community-nav-both-v0233.mjs',
    'https://cdn.jsdelivr.net/gh/c2hf8zm76m-rgb/Nova-map-@aefe1c0ff95e6fafc13300588999d06c7d19388a/novacall/community-visible-v0234.mjs',
    'https://cdn.jsdelivr.net/gh/c2hf8zm76m-rgb/Nova-map-@29a6cca4c8bf78aee263373f1950b1e97fa60a6e/novacall/version-lock-v0234.mjs',
    'https://cdn.jsdelivr.net/gh/c2hf8zm76m-rgb/Nova-map-@2558377a258ec32a42c190d910f46befb5d5a886/novacall/avatar-final-v0234.mjs'
  ];

  const reveal=()=>{
    document.documentElement.classList.remove('nc-final-loading');
    document.getElementById('nc-final-gate')?.remove();
    document.getElementById('nc-final-gate-style')?.remove();
    document.title='NovaCall V0.23.4';
  };
  const hard=setTimeout(reveal,12000);

  for(const src of modules){
    try{ await import(src); }
    catch(e){ console.warn('[NovaCall] module ignoré',src,e); }
  }

  // Créer un espace sans enchaîner les anciens écrans.
  const R=()=>Math.random().toString(36).slice(2,8);
  document.addEventListener('click',e=>{
    const b=e.target?.closest?.('#nc20new'); if(!b)return;
    e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
    const home=document.getElementById('nc20home'),join=document.getElementById('join'),app=document.getElementById('app'),room=document.getElementById('room'),name=document.getElementById('name');
    if(!join)return;
    if(room)room.value='nova-'+R();
    if(name&&!name.value.trim())name.value=localStorage.getItem('novacall-name')||'';
    home?.remove();join.classList.remove('hide');app?.classList.add('hide');
    try{history.replaceState(null,'',location.pathname)}catch{}
    requestAnimationFrame(()=>room?.focus());
  },true);

  // Redesign final des contrôles. S'exécute APRES toutes les anciennes couches.
  if(!window.__NC237_CONTROLS){
    window.__NC237_CONTROLS=1;
    const S=b=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${b}</svg>`;
    const I={
      hand:S('<path d="M18 11V6a2 2 0 0 0-4 0v4M14 10V4a2 2 0 0 0-4 0v6M10 10V5a2 2 0 0 0-4 0v7M6 12V8a2 2 0 0 0-4 0v7c0 4 3 7 7 7h3c5 0 8-3 8-8v-3a2 2 0 0 0-4 0v1"/>'),
      mic:S('<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><path d="M12 19v3"/>'),
      ptt:S('<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M7 10h.01M11 10h.01M15 10h.01M19 10h.01M7 14h.01M11 14h.01M15 14h4"/>'),
      noise:S('<path d="M4 12v.01M8 9v6M12 6v12M16 9v6M20 12v.01"/>'),
      deaf:S('<path d="M4 14a8 8 0 0 1 16 0"/><path d="M18 19c0 1.1-.9 2-2 2h-1v-7h3a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2Z"/><path d="M6 19c0 1.1.9 2 2 2h1v-7H6a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2Z"/>'),
      cam:S('<path d="m16 13 5 3V8l-5 3"/><rect x="3" y="6" width="13" height="12" rx="2"/>'),
      screen:S('<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/><path d="m9 9 3-3 3 3M12 6v7"/>'),
      leave:S('<path d="M6.6 10.8a15.5 15.5 0 0 1 10.8 0"/><path d="M5.3 17.7 3 15.4a2 2 0 0 1 0-2.8l1.2-1.2a2 2 0 0 1 2.3-.38l2.1 1.05a2 2 0 0 1 1.1 1.79v1.53"/><path d="m18.7 17.7 2.3-2.3a2 2 0 0 0 0-2.8l-1.2-1.2a2 2 0 0 0-2.3-.38l-2.1 1.05a2 2 0 0 0-1.1 1.79v1.53"/>')
    };
    const meta={hand:['Main',I.hand],mic:['Micro',I.mic],ptt:['PTT',I.ptt],noise:['Réduction',I.noise],deaf:['Audio',I.deaf],cam:['Caméra',I.cam],screen:['Partager',I.screen],leave:['Quitter',I.leave]};
    const css=document.createElement('style');
    css.id='nc237-controls-style';
    css.textContent=`
      .controls.nc237{display:flex!important;align-items:center!important;justify-content:center!important;gap:10px!important;width:max-content!important;max-width:calc(100% - 24px)!important;padding:10px!important;margin:0 auto 10px!important;border:1px solid rgba(126,139,180,.18)!important;border-radius:22px!important;background:rgba(8,13,23,.86)!important;box-shadow:0 18px 50px rgba(0,0,0,.32)!important;backdrop-filter:blur(18px)!important;overflow-x:auto!important;overflow-y:hidden!important;scrollbar-width:none!important}
      .controls.nc237::-webkit-scrollbar{display:none!important}
      .controls.nc237 .control{width:78px!important;min-width:78px!important;height:68px!important;min-height:68px!important;padding:7px 5px!important;border-radius:18px!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;gap:3px!important;border:1px solid rgba(139,151,190,.18)!important;background:linear-gradient(180deg,#182235,#101725)!important;color:#cbd3e3!important;box-shadow:inset 0 1px rgba(255,255,255,.03),0 8px 22px rgba(0,0,0,.18)!important;transition:transform .17s ease,border-color .17s ease,box-shadow .17s ease,background .17s ease,color .17s ease!important;cursor:pointer!important}
      .controls.nc237 .control:hover{transform:translateY(-4px) scale(1.035)!important;border-color:rgba(139,132,255,.58)!important;background:linear-gradient(180deg,#263450,#172238)!important;color:#fff!important;box-shadow:0 14px 30px rgba(0,0,0,.28),0 0 0 1px rgba(119,111,238,.13)!important}
      .controls.nc237 .control:active{transform:translateY(-1px) scale(.97)!important}
      .controls.nc237 .control.on{background:linear-gradient(145deg,#6b63f0,#4e56d8)!important;border-color:rgba(185,180,255,.62)!important;color:#fff!important;box-shadow:0 10px 30px rgba(90,82,226,.32),inset 0 1px rgba(255,255,255,.15)!important}
      .controls.nc237 #leave{background:linear-gradient(145deg,#84243a,#5c1b2d)!important;border-color:rgba(255,108,136,.36)!important;color:#ffdbe2!important}
      .controls.nc237 #leave:hover{background:linear-gradient(145deg,#a92e4c,#761f37)!important;border-color:rgba(255,130,151,.62)!important;box-shadow:0 13px 32px rgba(150,33,60,.32)!important}
      .nc237-icon{width:25px!important;height:25px!important;display:grid!important;place-items:center!important}.nc237-icon svg{width:24px!important;height:24px!important;display:block!important}.nc237-label{font-size:8.5px!important;font-weight:900!important;line-height:1!important;white-space:nowrap!important}.controls.nc237 .control small{font-size:6.5px!important;line-height:1!important;margin:0!important;opacity:.66!important;font-weight:900!important;letter-spacing:.08em!important}
      @media(max-width:700px){.controls.nc237{width:calc(100% - 16px)!important;max-width:none!important;display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:7px!important;padding:8px!important;margin:0 8px 8px!important;overflow:visible!important}.controls.nc237 .control{width:100%!important;min-width:0!important;height:56px!important;min-height:56px!important}}
    `;
    document.head.appendChild(css);

    function paint(){
      const d=document.querySelector('.controls');if(!d)return;
      d.classList.add('nc237');
      Object.entries(meta).forEach(([id,v])=>{
        const b=document.getElementById(id);if(!b)return;
        const old=b.querySelector('small')?.textContent||'';
        const desired=`<span class="nc237-icon">${v[1]}</span><span class="nc237-label">${v[0]}</span><small>${old}</small>`;
        if(!b.querySelector('.nc237-icon')) b.innerHTML=desired;
        b.title=v[0];
      });
    }
    paint();
    new MutationObserver(()=>requestAnimationFrame(paint)).observe(document.documentElement,{childList:true,subtree:true});
    setInterval(paint,1200);
  }

  clearTimeout(hard);
  requestAnimationFrame(()=>requestAnimationFrame(reveal));
})();
