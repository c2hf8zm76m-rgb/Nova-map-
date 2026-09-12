const BASE='https://nova-call-j5o9h43li-alo12230-6256s-projects.vercel.app';
const FLAG='novacall-call-transition-v0234';
const msg=document.getElementById('bootstrapMsg');
const q=new URL(location.href).searchParams;
let smooth=false;try{smooth=sessionStorage.getItem(FLAG)==='1'&&!!q.get('room')}catch{}
if(smooth&&msg)msg.textContent='Connexion à l’appel NovaCall…';
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
'https://cdn.jsdelivr.net/gh/c2hf8zm76m-rgb/Nova-map-@8fe3c9ec6969f7a06a7ca323bdeddad4128de10e/novacall/create-space-fix-v2263.mjs',
'https://cdn.jsdelivr.net/gh/c2hf8zm76m-rgb/Nova-map-@6bff1122cad19707ad2c6efe75024d9e047cb169/novacall/community-v023.mjs',
'https://cdn.jsdelivr.net/gh/c2hf8zm76m-rgb/Nova-map-@b4a0c06852f7abe36859b55a4a78bdcab083e586/novacall/community-nav-fix-v0231.mjs',
'https://cdn.jsdelivr.net/gh/c2hf8zm76m-rgb/Nova-map-@eac522d7429117caed91fbb9902af5d9e27d6b59/novacall/voice-composer-fix-v0232.mjs',
'https://cdn.jsdelivr.net/gh/c2hf8zm76m-rgb/Nova-map-@515faaf937acf56899e6f1b299329847c91c4d49/novacall/community-nav-both-v0233.mjs',
'https://cdn.jsdelivr.net/gh/c2hf8zm76m-rgb/Nova-map-@aefe1c0ff95e6fafc13300588999d06c7d19388a/novacall/community-visible-v0234.mjs',
'https://cdn.jsdelivr.net/gh/c2hf8zm76m-rgb/Nova-map-@29a6cca4c8bf78aee263373f1950b1e97fa60a6e/novacall/version-lock-v0234.mjs',
'https://cdn.jsdelivr.net/gh/c2hf8zm76m-rgb/Nova-map-@2558377a258ec32a42c190d910f46befb5d5a886/novacall/avatar-final-v0234.mjs',
'https://cdn.jsdelivr.net/gh/c2hf8zm76m-rgb/Nova-map-@557137700210f785a333e940aa9dbaaaea204b6f/novacall/call-transition-mask-v0234b.mjs'];
function inject(h){
 const tags=modules.map(src=>'<script type="module" src="'+src+'"><\/script>').join('');
 h=h.replace('<title>NovaCall V0.19.3.1</title>','<title>NovaCall V0.23.4</title>');
 h=h.replace('</head>','<link rel="manifest" href="/manifest.webmanifest"><link rel="apple-touch-icon" href="/icon.svg"><meta name="apple-mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-title" content="NovaCall"><meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"></head>');
 h=h.replace('</body>',tags+'<script>if(\'serviceWorker\' in navigator){navigator.serviceWorker.register(\'/sw.js\').catch(()=>{})}<\/script></body>');
 if(smooth){const st='<style id="nc234-call-style">html.nc234-call-transitioning body{overflow:hidden!important;background:#070b13!important}#nc234-call-transition{position:fixed;inset:0;z-index:2147483647;display:grid;place-items:center;background:#070b13;color:#fff;font-family:system-ui}#nc234-call-transition .box{text-align:center;padding:28px}#nc234-call-transition .logo{width:64px;height:64px;border-radius:20px;margin:0 auto 16px;display:grid;place-items:center;background:linear-gradient(135deg,#736cf0,#4f62d8);font-size:28px;font-weight:950;box-shadow:0 18px 50px rgba(80,73,215,.28)}#nc234-call-transition b{display:block;font-size:20px}#nc234-call-transition span{display:block;margin-top:7px;color:#8995aa;font-size:11px}#nc234-call-transition i{display:block;width:110px;height:4px;margin:18px auto 0;border-radius:999px;background:linear-gradient(90deg,#625ee2,#8b86ff,#625ee2);background-size:200% 100%;animation:nc234load 1.1s linear infinite}@keyframes nc234load{to{background-position:-200% 0}}</style><script>document.documentElement.classList.add("nc234-call-transitioning")<\/script>';h=h.replace('</head>',st+'</head>');h=h.replace('<body>','<body><div id="nc234-call-transition"><div class="box"><div class="logo">N</div><b>Connexion à l’appel…</b><span>Ouverture directe du vocal NovaCall</span><i></i></div></div>')}
 return h;
}
async function load(){const c=new AbortController();const t=setTimeout(()=>c.abort(),8000);try{const r=await fetch(BASE,{cache:'no-store',signal:c.signal});if(!r.ok)throw new Error('base '+r.status);const h=inject(await r.text());clearTimeout(t);document.open();document.write(h);document.close()}catch(e){clearTimeout(t);if(msg)msg.innerHTML='<div><b>Impossible de charger NovaCall.</b><small>'+(e?.name==='AbortError'?'Le chargement a dépassé 8 secondes.':String(e?.message||e))+'</small><button onclick="location.reload()">Réessayer</button></div>'}}
load();