(()=>{
  if(window.__NovaCallThemeLayouts026)return;
  window.__NovaCallThemeLayouts026=1;
  const STYLE_ID='nc-theme-layouts-026';
  const KEY='nc-theme-2413';
  const css=`
/* NovaCall V0.26 — each theme has its own page architecture */
html,body{width:100%;height:100%;overflow:hidden}
.app{transition:grid-template-columns .28s ease,grid-template-rows .28s ease,gap .28s ease,padding .28s ease}
.side,.stage,.chat,.controls,.top{transition:all .28s ease}

/* ========== AURORA — cinematic 3-panel + floating dock ========== */
html[data-nct="aurora"] body{background:radial-gradient(1100px 700px at 52% -12%,#4435a533,transparent 62%),#070914}
html[data-nct="aurora"] .app{grid-template-columns:270px minmax(0,1fr) 360px!important;gap:14px!important;padding:14px!important;background:transparent!important}
html[data-nct="aurora"] .side,html[data-nct="aurora"] .stage,html[data-nct="aurora"] .chat{border:1px solid rgba(145,133,255,.18)!important;background:linear-gradient(145deg,rgba(17,20,38,.84),rgba(8,11,23,.76))!important;backdrop-filter:blur(26px) saturate(135%)!important;box-shadow:0 24px 70px #0006,inset 0 1px 0 #ffffff08!important}
html[data-nct="aurora"] .side{border-radius:28px!important}
html[data-nct="aurora"] .stage{border-radius:32px!important;overflow:hidden!important;position:relative!important;background:radial-gradient(600px 350px at 50% 10%,#6958ff20,transparent 70%),linear-gradient(145deg,#101426d9,#080b16e8)!important}
html[data-nct="aurora"] .chat{border-radius:28px!important}
html[data-nct="aurora"] .grid{padding:20px 20px 112px!important}
html[data-nct="aurora"] .controls{position:absolute!important;left:50%!important;bottom:20px!important;transform:translateX(-50%)!important;z-index:20!important;width:max-content!important;max-width:calc(100% - 32px)!important;margin:0!important;padding:10px!important;border-radius:22px!important;border:1px solid #9c8cff2e!important;background:#0a0e1dcc!important;backdrop-filter:blur(24px)!important;box-shadow:0 18px 55px #0008,0 0 28px #6658ff18!important}
html[data-nct="aurora"] .control{min-width:74px!important;border-radius:16px!important}
html[data-nct="aurora"] .v13-channel.active{border-radius:14px!important;box-shadow:0 10px 30px #685dff35!important}

/* ========== ARCTIC — compact frosted command-center ========== */
html[data-nct="arctic"] body{background:linear-gradient(145deg,#03121c,#071b28 45%,#041018)!important}
html[data-nct="arctic"] .app{grid-template-columns:92px minmax(0,1fr) 330px!important;gap:8px!important;padding:8px!important;background:linear-gradient(180deg,#a9efff08,#0000)!important}
html[data-nct="arctic"] .side{border-radius:18px!important;padding:10px 8px!important;background:#d5f7ff0d!important;border:1px solid #85dbff24!important;align-items:center!important;overflow:auto!important}
html[data-nct="arctic"] .v16-side-head{display:grid!important;place-items:center!important;text-align:center!important}
html[data-nct="arctic"] .v16-side-head>div:last-child,html[data-nct="arctic"] .roomcard .muted,html[data-nct="arctic"] .section>span,html[data-nct="arctic"] .devicebox .muted,html[data-nct="arctic"] .devicebox .v16-actual{display:none!important}
html[data-nct="arctic"] .roomcard{width:58px!important;height:58px!important;padding:8px!important;display:grid!important;place-items:center!important;text-align:center!important;border-radius:16px!important;overflow:hidden!important}
html[data-nct="arctic"] .roomcard b{font-size:8px!important;word-break:break-all!important}
html[data-nct="arctic"] .v13-sectionhead{margin:10px 0 4px!important;justify-content:center!important}
html[data-nct="arctic"] .v13-channel{width:58px!important;height:50px!important;padding:0!important;justify-content:center!important;border-radius:14px!important}
html[data-nct="arctic"] .v13-channel .label{display:none!important}
html[data-nct="arctic"] .v13-channel .hash{font-size:20px!important}
html[data-nct="arctic"] .people{width:100%!important;overflow:visible!important}
html[data-nct="arctic"] .person{padding:6px!important;background:transparent!important;border:0!important}
html[data-nct="arctic"] .personTop{justify-content:center!important}.person .pname,html[data-nct="arctic"] .person .pmeta,html[data-nct="arctic"] .person .pstatus,html[data-nct="arctic"] .person .volrow{display:none!important}
html[data-nct="arctic"] .devicebox{width:64px!important;margin-top:auto!important;padding:6px!important;border-radius:16px!important}
html[data-nct="arctic"] .devicebox select{height:30px!important;font-size:0!important;padding:0!important}
html[data-nct="arctic"] .stage{border-radius:18px!important;border:1px solid #7adfff20!important;background:linear-gradient(180deg,#d7f8ff0b,#05131ee8)!important;overflow:hidden!important}
html[data-nct="arctic"] .top{height:78px!important;padding:0 20px!important;background:#bdefff08!important;border-bottom:1px solid #8ce4ff20!important}
html[data-nct="arctic"] .grid{padding:12px!important;gap:8px!important}
html[data-nct="arctic"] .tile,html[data-nct="arctic"] .nc181-card{border-radius:12px!important;border-color:#87e2ff26!important;background:#071823dd!important;box-shadow:none!important}
html[data-nct="arctic"] .controls{padding:8px!important;gap:6px!important;border-top:1px solid #8ce4ff1c!important;background:#b9efff08!important}
html[data-nct="arctic"] .control{border-radius:10px!important;min-width:66px!important}
html[data-nct="arctic"] .chat{border-radius:18px!important;border:1px solid #7adfff20!important;background:#06131ddd!important}
html[data-nct="arctic"] .chathead{height:58px!important;background:#c6f3ff08!important}
html[data-nct="arctic"] .msg{border-radius:8px!important;background:#a8ebff0b!important;border-left:2px solid #66d6ff55!important}

/* ========== EMBER — reversed layout + vertical call console ========== */
html[data-nct="ember"] body{background:radial-gradient(900px 620px at 50% 0,#8d203533,transparent 62%),#10070a!important}
html[data-nct="ember"] .app{grid-template-columns:350px minmax(0,1fr) 285px!important;gap:12px!important;padding:12px!important;background:transparent!important}
html[data-nct="ember"] .chat{order:1!important;border-radius:8px 28px 28px 8px!important;border:1px solid #ff6c7d24!important;background:linear-gradient(180deg,#271017e8,#12080ce8)!important}
html[data-nct="ember"] .stage{order:2!important;display:grid!important;grid-template-columns:104px minmax(0,1fr)!important;grid-template-rows:76px minmax(0,1fr)!important;border-radius:28px 8px 28px 8px!important;overflow:hidden!important;border:1px solid #ff775f22!important;background:linear-gradient(145deg,#1c0d12,#0d090c)!important}
html[data-nct="ember"] .side{order:3!important;border-radius:28px 8px 8px 28px!important;border:1px solid #ff765c20!important;background:linear-gradient(180deg,#231016e8,#10080be8)!important}
html[data-nct="ember"] .top{grid-column:1/3!important;grid-row:1!important;height:auto!important;padding:0 18px!important;background:linear-gradient(90deg,#ff4f7a12,#ff8a4c08)!important;border-bottom:1px solid #ff7a6320!important}
html[data-nct="ember"] .controls{grid-column:1!important;grid-row:2!important;display:flex!important;flex-direction:column!important;justify-content:flex-start!important;align-items:stretch!important;gap:7px!important;padding:12px 8px!important;border:0!important;border-right:1px solid #ff765c1f!important;background:#210d13aa!important;overflow:auto!important}
html[data-nct="ember"] .control{width:100%!important;min-height:62px!important;border-radius:10px 18px 10px 18px!important;border-color:#ff7b6d20!important;background:#ffffff08!important}
html[data-nct="ember"] .control.on{background:linear-gradient(145deg,#ff3f6e,#ff8a4f)!important;box-shadow:0 10px 28px #ff4d6d28!important}
html[data-nct="ember"] .grid{grid-column:2!important;grid-row:2!important;padding:18px!important;gap:14px!important}
html[data-nct="ember"] .tile,html[data-nct="ember"] .nc181-card{border-radius:8px 24px 8px 24px!important;border:1px solid #ff826b22!important;background:linear-gradient(145deg,#231116,#0f090c)!important;box-shadow:14px 18px 40px #0005!important}
html[data-nct="ember"] .v13-channel.active{border-radius:8px 18px 8px 18px!important;background:linear-gradient(90deg,#ff416f,#ff8c4d)!important}
html[data-nct="ember"] .msg{border-radius:6px 16px 6px 16px!important;background:#ff6e780b!important;border:1px solid #ff7c6820!important}
html[data-nct="ember"] .send textarea{border-radius:6px 16px 6px 16px!important}

/* ========== MINT — workspace: persistent sidebar + stage top + chat bottom ========== */
html[data-nct="mint"] body{background:radial-gradient(900px 620px at 80% -10%,#2dd7ad26,transparent 65%),#04100d!important}
html[data-nct="mint"] .app{grid-template-columns:260px minmax(0,1fr)!important;grid-template-rows:minmax(0,1fr) 300px!important;gap:12px!important;padding:12px!important;background:transparent!important}
html[data-nct="mint"] .side{grid-column:1!important;grid-row:1/3!important;border-radius:24px!important;border:1px solid #54e3b123!important;background:linear-gradient(180deg,#0b231ddc,#06130fe8)!important}
html[data-nct="mint"] .stage{grid-column:2!important;grid-row:1!important;border-radius:24px!important;border:1px solid #54e3b123!important;background:linear-gradient(145deg,#09211bdc,#06130fe8)!important;overflow:hidden!important}
html[data-nct="mint"] .chat{grid-column:2!important;grid-row:2!important;border-radius:24px!important;border:1px solid #54e3b123!important;background:#071813e8!important;display:grid!important;grid-template-columns:190px 1fr!important;grid-template-rows:48px 1fr 58px!important}
html[data-nct="mint"] .chathead{grid-column:1/3!important;grid-row:1!important;height:auto!important;border-bottom:1px solid #57e6b320!important;background:#4de0b10a!important}
html[data-nct="mint"] .msgs{grid-column:1/3!important;grid-row:2!important;padding:10px 16px!important}
html[data-nct="mint"] .send{grid-column:1/3!important;grid-row:3!important;padding:8px 12px!important;background:#06140f!important;border-top:1px solid #57e6b320!important}
html[data-nct="mint"] .v12-note{display:none!important}
html[data-nct="mint"] .top{height:60px!important;background:#55e6b008!important;border-bottom:1px solid #55e6b020!important}
html[data-nct="mint"] .grid{padding:14px!important;gap:10px!important}
html[data-nct="mint"] .controls{margin:0 12px 12px!important;padding:7px!important;border:1px solid #55e6b020!important;border-radius:14px!important;background:#061510cc!important;justify-content:flex-start!important}
html[data-nct="mint"] .control{min-width:72px!important;border-radius:12px!important}
html[data-nct="mint"] .tile,html[data-nct="mint"] .nc181-card{border-radius:18px!important;border:1px solid #55e6b020!important;background:linear-gradient(145deg,#0d2820,#071611)!important;box-shadow:0 14px 38px #0004!important}
html[data-nct="mint"] .v13-channel.active{background:#2fd1a5!important;border-radius:12px!important;color:#04110d!important;box-shadow:none!important}
html[data-nct="mint"] .msg{display:grid!important;grid-template-columns:auto 1fr!important;column-gap:8px!important;border-radius:10px!important;background:#53e1b009!important;border:1px solid #53e1b017!important}

/* Theme picker becomes a real layout chooser */
#tp{width:min(820px,94vw)!important}
#tp::after{content:'Chaque thème change maintenant la disposition complète de NovaCall.';display:block;margin-top:14px;color:#8f9aaa;font-size:11px;text-align:center}
.tg{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:14px!important}
.tc{height:154px!important;position:relative!important;overflow:hidden!important;text-align:left!important;padding:18px!important;font-size:16px!important;display:flex!important;align-items:flex-end!important}
.tc::before{position:absolute;left:16px;top:14px;font-size:9px;letter-spacing:.13em;opacity:.66}
.tc[data-t="aurora"]::before{content:'3 PANELS + DOCK FLOTTANT'}
.tc[data-t="arctic"]::before{content:'RAIL COMPACT + FROSTED UI'}
.tc[data-t="ember"]::before{content:'CHAT À GAUCHE + CONSOLE VERTICALE'}
.tc[data-t="mint"]::before{content:'WORKSPACE + CHAT HORIZONTAL'}
.tc[data-t="aurora"]{background:radial-gradient(circle at 70% 20%,#6f5cff66,transparent 35%),linear-gradient(145deg,#1c183d,#0d1022)!important}
.tc[data-t="arctic"]{background:linear-gradient(145deg,#16485c,#061b27)!important}
.tc[data-t="ember"]{background:linear-gradient(145deg,#5a1628,#23100f)!important}
.tc[data-t="mint"]{background:linear-gradient(145deg,#12523f,#071f18)!important}

@media(max-width:1000px){
  html[data-nct] .app{display:grid!important;grid-template-columns:1fr!important;grid-template-rows:minmax(0,1fr)!important;padding:0!important;gap:0!important}
  html[data-nct] .stage{grid-column:1!important;grid-row:1!important;border-radius:0!important}
  html[data-nct] .side{position:fixed!important;left:0!important;top:0!important;bottom:0!important;width:min(310px,88vw)!important;height:auto!important;z-index:30!important;transform:translateX(-105%)!important;border-radius:0 22px 22px 0!important;display:flex!important;align-items:stretch!important}
  html[data-nct] .side.open{transform:none!important}
  html[data-nct] .chat{position:fixed!important;right:0!important;top:0!important;bottom:0!important;width:min(360px,92vw)!important;height:auto!important;z-index:30!important;transform:translateX(105%)!important;border-radius:22px 0 0 22px!important;display:flex!important}
  html[data-nct] .chat.open{transform:none!important}
  html[data-nct="ember"] .stage{display:flex!important;flex-direction:column!important}
  html[data-nct="ember"] .controls{display:grid!important;grid-template-columns:repeat(4,1fr)!important;flex-direction:unset!important;border-right:0!important}
  html[data-nct="mint"] .chat{display:flex!important}
}
`;
  function ensureStyle(){
    let s=document.getElementById(STYLE_ID);
    if(!s){s=document.createElement('style');s.id=STYLE_ID;s.textContent=css;document.head.appendChild(s)}
  }
  function currentTheme(){try{return localStorage.getItem(KEY)||document.documentElement.dataset.nct||'aurora'}catch{return document.documentElement.dataset.nct||'aurora'}}
  function applyMeta(){
    ensureStyle();
    const t=currentTheme();
    document.documentElement.dataset.nct=t;
    document.documentElement.dataset.ncLayout='v026-'+t;
    const names={aurora:'Aurora Cinema',arctic:'Arctic Command',ember:'Ember Console',mint:'Mint Workspace'};
    const b=document.querySelector('#th span');if(b)b.textContent=names[t]||names.aurora;
    const btn=document.querySelector('#th');if(btn)btn.title='Changer complètement l’interface NovaCall';
    document.title='NovaCall V0.26';
  }
  ensureStyle();applyMeta();
  new MutationObserver(()=>applyMeta()).observe(document.documentElement,{attributes:true,attributeFilter:['data-nct']});
  window.addEventListener('storage',applyMeta);
  document.addEventListener('click',e=>{if(e.target.closest?.('.tc'))setTimeout(applyMeta,0)},true);
  setTimeout(applyMeta,120);setTimeout(applyMeta,900);setInterval(applyMeta,3000);
})();
