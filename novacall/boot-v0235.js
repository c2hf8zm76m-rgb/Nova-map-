(async()=>{
  try{sessionStorage.removeItem('novacall-call-transition-v0234')}catch{}
  const BASE='https://nova-call-j5o9h43li-alo12230-6256s-projects.vercel.app';
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
    '/v2263.mjs',
    'https://cdn.jsdelivr.net/gh/c2hf8zm76m-rgb/Nova-map-@6bff1122cad19707ad2c6efe75024d9e047cb169/novacall/community-v023.mjs',
    'https://cdn.jsdelivr.net/gh/c2hf8zm76m-rgb/Nova-map-@b4a0c06852f7abe36859b55a4a78bdcab083e586/novacall/community-nav-fix-v0231.mjs',
    'https://cdn.jsdelivr.net/gh/c2hf8zm76m-rgb/Nova-map-@eac522d7429117caed91fbb9902af5d9e27d6b59/novacall/voice-composer-fix-v0232.mjs',
    'https://cdn.jsdelivr.net/gh/c2hf8zm76m-rgb/Nova-map-@515faaf937acf56899e6f1b299329847c91c4d49/novacall/community-nav-both-v0233.mjs',
    'https://cdn.jsdelivr.net/gh/c2hf8zm76m-rgb/Nova-map-@aefe1c0ff95e6fafc13300588999d06c7d19388a/novacall/community-visible-v0234.mjs',
    'https://cdn.jsdelivr.net/gh/c2hf8zm76m-rgb/Nova-map-@29a6cca4c8bf78aee263373f1950b1e97fa60a6e/novacall/version-lock-v0234.mjs',
    'https://cdn.jsdelivr.net/gh/c2hf8zm76m-rgb/Nova-map-@2558377a258ec32a42c190d910f46befb5d5a886/novacall/avatar-final-v0234.mjs'
  ];
  const shieldStyle='<style id="nc-startup-style">#nc-startup-shield{position:fixed;inset:0;z-index:2147483647;display:grid;place-items:center;background:#070b13;color:#fff;font-family:system-ui;opacity:1;transition:opacity .22s ease}#nc-startup-shield.nc-out{opacity:0;pointer-events:none}#nc-startup-shield .box{text-align:center;padding:28px}#nc-startup-shield .logo{width:68px;height:68px;border-radius:21px;margin:0 auto 16px;display:grid;place-items:center;background:linear-gradient(135deg,#736cf0,#4f62d8);font-size:29px;font-weight:950;box-shadow:0 18px 55px rgba(80,73,215,.30)}#nc-startup-shield b{display:block;font-size:21px}#nc-startup-shield span{display:block;margin-top:7px;color:#8995aa;font-size:11px}#nc-startup-shield i{display:block;width:112px;height:4px;margin:18px auto 0;border-radius:999px;background:linear-gradient(90deg,#625ee2,#9691ff,#625ee2);background-size:200% 100%;animation:ncstart 1.1s linear infinite}@keyframes ncstart{to{background-position:-200% 0}}</style>';
  const shield='<div id="nc-startup-shield"><div class="box"><div class="logo">N</div><b>NovaCall</b><span>Préparation de ton espace…</span><i></i></div></div>';
  const finalizer='<scr'+'ipt>(function(){const started=Date.now();let loginSince=0,joinSince=0;function visible(e){return !!e&&!e.classList.contains("hide")&&getComputedStyle(e).display!=="none"&&getComputedStyle(e).visibility!=="hidden"}function reveal(){const s=document.getElementById("nc-startup-shield");if(!s)return;s.classList.add("nc-out");setTimeout(()=>{s.remove();document.getElementById("nc-startup-style")?.remove()},240)}async function tick(){const s=document.getElementById("nc-startup-shield");if(!s)return;const u=new URL(location.href),wantsRoom=!!u.searchParams.get("room");const app=document.getElementById("app"),home=document.getElementById("nc20home"),login=document.querySelector(".n19a"),join=document.getElementById("join");if(wantsRoom&&visible(app)){reveal();return}if(!wantsRoom&&home){reveal();return}let hasSession=null;try{if(window.NovaCallAccountClient){const r=await window.NovaCallAccountClient.auth.getSession();hasSession=!!(r?.data?.session||r?.data?.user)}}catch{}if(login&&visible(login)){if(hasSession===false){if(!loginSince)loginSince=Date.now();if(Date.now()-loginSince>350){reveal();return}}else loginSince=0}else loginSince=0;if(!wantsRoom&&visible(join)&&!login&&!home){if(hasSession===false||Date.now()-started>3500){if(!joinSince)joinSince=Date.now();if(Date.now()-joinSince>350){reveal();return}}else joinSince=0}else joinSince=0;if(Date.now()-started>7000){if(login&&visible(login)||home||visible(app)||visible(join)){reveal();return}}setTimeout(tick,100)}setTimeout(tick,80)})();</scr'+'ipt>';
  const controller=new AbortController();
  const timer=setTimeout(()=>controller.abort(),10000);
  try{
    const r=await fetch(BASE+'/?stable=0234&startup=1',{cache:'no-store',signal:controller.signal});
    if(!r.ok)throw new Error('base '+r.status);
    let h=await r.text();clearTimeout(timer);
    h=h.replace('<title>NovaCall V0.19.3.1</title>','<title>NovaCall V0.23.4</title>');
    h=h.replace('</head>',shieldStyle+'</head>');h=h.replace('<body>','<body>'+shield);
    const tags=modules.map(src=>'<script type="module" src="'+src+'"></scr'+'ipt>').join('');
    const sw='<scr'+'ipt>if(\'serviceWorker\' in navigator){navigator.serviceWorker.register(\'/sw.js\').catch(()=>{})}</scr'+'ipt>';
    const safety='<scr'+'ipt src="https://cdn.jsdelivr.net/gh/c2hf8zm76m-rgb/Nova-map-@272ec7bc6a673636ac65d6038b5a70521820c92d/novacall/media-controls-safety-v0235-loader.js"></scr'+'ipt>';
    const stageGuard='<scr'+'ipt src="https://cdn.jsdelivr.net/gh/c2hf8zm76m-rgb/Nova-map-@1382d8fa9723073a9987c33419815c015df4c383/novacall/screen-consent-stage-guard-v0235.js"></scr'+'ipt>';
    h=h.replace('</body>',tags+safety+stageGuard+finalizer+sw+'</body>');document.open();document.write(h);document.close();
  }catch(e){clearTimeout(timer);document.getElementById('boot').innerHTML='<div class="ncboot"><div class="logo">N</div><b>NovaCall n\'a pas pu charger.</b><small>'+String(e?.message||e)+'</small></div>'}
})();
