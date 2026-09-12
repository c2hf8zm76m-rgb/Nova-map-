/* NovaCall media safety + controls patch */
(function(){
  const PATCH='nc-media-safe-0235';
  if(document.documentElement.dataset[PATCH]) return;
  document.documentElement.dataset[PATCH]='1';

  const svg=(body)=>`<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`;
  const ICONS={
    hand:svg('<path d="M18 11V6a2 2 0 0 0-4 0v4"/><path d="M14 10V4a2 2 0 0 0-4 0v6"/><path d="M10 10V5a2 2 0 0 0-4 0v7"/><path d="M6 12V8a2 2 0 0 0-4 0v7c0 4 3 7 7 7h3c5 0 8-3 8-8v-3a2 2 0 0 0-4 0v1"/>'),
    mic:svg('<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><path d="M12 19v3"/>'),
    keyboard:svg('<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M7 10h.01M11 10h.01M15 10h.01M19 10h.01M7 14h.01M11 14h.01M15 14h4"/>'),
    waves:svg('<path d="M4 12v.01M8 9v6M12 6v12M16 9v6M20 12v.01"/>'),
    headphones:svg('<path d="M4 14a8 8 0 0 1 16 0"/><path d="M18 19c0 1.1-.9 2-2 2h-1v-7h3a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2Z"/><path d="M6 19c0 1.1.9 2 2 2h1v-7H6a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2Z"/>'),
    video:svg('<path d="m16 13 5 3V8l-5 3"/><rect x="3" y="6" width="13" height="12" rx="2"/>'),
    switchCam:svg('<path d="M14.5 4h-5l-1.4 2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-3.1Z"/><path d="M9 11a4 4 0 0 1 6.5-1.2L17 11"/><path d="M17 8v3h-3"/><path d="M15 13a4 4 0 0 1-6.5 1.2L7 13"/><path d="M7 16v-3h3"/>'),
    share:svg('<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/><path d="m9 9 3-3 3 3M12 6v7"/>'),
    phoneOff:svg('<path d="m16 2 6 6"/><path d="m22 2-6 6"/><path d="M8.5 11.5a15 15 0 0 0 4 4l2-2a2 2 0 0 1 2-.5l3 1a2 2 0 0 1 1.5 2v3a2 2 0 0 1-2 2A18 18 0 0 1 3 5a2 2 0 0 1 2-2h3a2 2 0 0 1 2 1.5l1 3a2 2 0 0 1-.5 2Z"/>'),
    monitor:svg('<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>'),
    eye:svg('<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="2.5"/>'),
    eyeOff:svg('<path d="m3 3 18 18"/><path d="M10.6 10.6a2 2 0 0 0 2.8 2.8"/><path d="M9.9 4.2A10.8 10.8 0 0 1 12 4c6.5 0 10 8 10 8a18 18 0 0 1-2.2 3.2"/><path d="M6.6 6.6C3.5 8.5 2 12 2 12s3.5 8 10 8a10.8 10.8 0 0 0 4.1-.8"/>')
  };

  function addStyles(){
    if(document.getElementById('nc235-style'))return;
    const s=document.createElement('style');
    s.id='nc235-style';
    s.textContent=`
      .controls.nc235-dock{display:grid!important;grid-auto-flow:column!important;grid-auto-columns:76px!important;gap:8px!important;align-items:stretch!important;width:max-content!important;max-width:calc(100% - 20px)!important;padding:8px!important;margin:0 auto 10px!important;border-radius:20px!important;background:rgba(8,13,23,.82)!important;border:1px solid rgba(145,159,200,.16)!important;box-shadow:0 18px 48px rgba(0,0,0,.32)!important;backdrop-filter:blur(18px)!important;overflow-x:auto!important;overflow-y:hidden!important;scrollbar-width:none!important}
      .controls.nc235-dock::-webkit-scrollbar{display:none!important}
      .controls.nc235-dock .control{width:76px!important;min-width:76px!important;max-width:76px!important;height:62px!important;min-height:62px!important;padding:7px 5px!important;border-radius:16px!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;gap:2px!important;border:1px solid rgba(145,159,200,.16)!important;background:linear-gradient(180deg,rgba(25,34,52,.96),rgba(16,23,36,.96))!important;color:#cbd3e3!important;box-shadow:inset 0 1px rgba(255,255,255,.025),0 8px 22px rgba(0,0,0,.16)!important;transition:transform .16s ease,border-color .16s ease,background .16s ease,box-shadow .16s ease,color .16s ease!important;cursor:pointer!important;overflow:hidden!important}
      .controls.nc235-dock .control:hover{transform:translateY(-3px) scale(1.02)!important;border-color:rgba(139,132,255,.50)!important;background:linear-gradient(180deg,rgba(38,48,72,.98),rgba(22,30,47,.98))!important;color:#fff!important;box-shadow:0 14px 30px rgba(0,0,0,.26),0 0 0 1px rgba(119,111,238,.12)!important}
      .controls.nc235-dock .control:active{transform:translateY(-1px) scale(.98)!important}
      .controls.nc235-dock .control.on{background:linear-gradient(145deg,#675ff0,#4e55d7)!important;border-color:rgba(177,171,255,.56)!important;color:#fff!important;box-shadow:0 10px 30px rgba(92,83,224,.30),inset 0 1px rgba(255,255,255,.14)!important}
      .controls.nc235-dock #leave{background:linear-gradient(145deg,rgba(121,29,48,.98),rgba(84,23,38,.98))!important;border-color:rgba(255,104,132,.34)!important;color:#ffd8df!important;margin-left:0!important}
      .controls.nc235-dock #leave:hover{background:linear-gradient(145deg,#a32845,#781f36)!important;border-color:rgba(255,126,148,.58)!important;box-shadow:0 12px 30px rgba(145,30,55,.28)!important}
      .nc235-icon{display:grid!important;place-items:center!important;width:24px!important;height:24px!important;flex:none!important}
      .nc235-icon svg{display:block!important;width:22px!important;height:22px!important}
      .nc235-label{display:block!important;max-width:100%!important;overflow:hidden!important;text-overflow:ellipsis!important;white-space:nowrap!important;font-size:8px!important;font-weight:850!important;line-height:1.05!important;letter-spacing:.01em!important}
      .controls.nc235-dock .control small{display:block!important;margin:1px 0 0!important;font-size:6.5px!important;line-height:1!important;color:rgba(205,214,232,.62)!important;font-weight:900!important;letter-spacing:.08em!important}
      .controls.nc235-dock .control.on small{color:rgba(255,255,255,.82)!important}
      #flipCam{display:none!important}
      #flipCam.nc235-show{display:flex!important}
      .nc235-share-card{min-height:180px!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;gap:9px!important;padding:24px!important;text-align:center!important;background:linear-gradient(180deg,#151b28,#0f1521)!important;border:1px solid rgba(145,159,200,.22)!important;border-radius:22px!important;color:#edf1f8!important;box-shadow:0 18px 50px rgba(0,0,0,.25)!important}
      .nc235-share-card .nc235-share-icon{width:50px;height:50px;display:grid;place-items:center;border-radius:16px;background:#202a3c;color:#aeb8cb}
      .nc235-share-card .nc235-share-icon svg{width:26px;height:26px}
      .nc235-share-card b{font-size:15px!important}
      .nc235-share-card span{font-size:10px!important;color:#8995a9!important;max-width:300px}
      .nc235-share-card button{margin-top:5px;height:38px;padding:0 16px;border:1px solid rgba(170,165,255,.35);border-radius:12px;background:linear-gradient(135deg,#6862e8,#535cda);color:#fff;font-weight:850;font-size:10px;cursor:pointer;transition:.16s ease}
      .nc235-share-card button:hover{transform:translateY(-2px);box-shadow:0 10px 24px rgba(91,83,219,.28)}
      .nc235-screen-tile{position:relative!important}
      .nc235-stop-watch{position:absolute!important;z-index:8!important;right:10px!important;top:10px!important;height:34px!important;padding:0 11px!important;display:flex!important;align-items:center!important;gap:7px!important;border:1px solid rgba(255,255,255,.15)!important;border-radius:11px!important;background:rgba(8,12,20,.82)!important;backdrop-filter:blur(14px)!important;color:#fff!important;font-size:9px!important;font-weight:850!important;cursor:pointer!important}
      .nc235-stop-watch svg{width:16px;height:16px}
      @media(max-width:900px){
        .controls.nc235-dock{grid-auto-flow:row!important;grid-template-columns:repeat(4,minmax(0,1fr))!important;grid-auto-columns:auto!important;width:calc(100% - 16px)!important;max-width:none!important;gap:6px!important;padding:7px!important;margin:0 8px 8px!important;overflow:visible!important}
        .controls.nc235-dock .control{width:100%!important;min-width:0!important;max-width:none!important;height:54px!important;min-height:54px!important;border-radius:14px!important}
        .nc235-icon{width:21px!important;height:21px!important}.nc235-icon svg{width:20px!important;height:20px!important}.nc235-label{font-size:7px!important}.controls.nc235-dock .control small{font-size:6px!important}
      }
      @media(max-width:430px){.controls.nc235-dock{gap:5px!important;padding:6px!important}.controls.nc235-dock .control{height:50px!important;min-height:50px!important}.nc235-label{font-size:6.5px!important}}
    `;
    document.head.appendChild(s);
  }

  const controlMeta={
    hand:['Main',ICONS.hand],mic:['Micro',ICONS.mic],ptt:['PTT',ICONS.keyboard],noise:['Bruit',ICONS.waves],deaf:['Audio',ICONS.headphones],cam:['Caméra',ICONS.video],screen:['Partager',ICONS.share],leave:['Quitter',ICONS.phoneOff]
  };
  function paintControls(){
    const dock=document.querySelector('.controls');
    if(!dock)return;
    dock.classList.add('nc235-dock');
    Object.entries(controlMeta).forEach(([id,[label,icon]])=>{
      const b=document.getElementById(id);if(!b)return;
      const state=b.querySelector('small')?.textContent||'';
      if(!b.querySelector('.nc235-icon')) b.innerHTML=`<span class="nc235-icon">${icon}</span><span class="nc235-label">${label}</span><small>${state}</small>`;
      b.title=label;b.setAttribute('aria-label',label);
      dock.appendChild(b);
    });
    let flip=document.getElementById('flipCam');
    if(!flip){
      flip=document.createElement('button');flip.id='flipCam';flip.type='button';flip.className='control';
      flip.innerHTML=`<span class="nc235-icon">${ICONS.switchCam}</span><span class="nc235-label">Retourner</span><small>CAM</small>`;
      flip.title='Changer de caméra';flip.setAttribute('aria-label','Changer de caméra');
      const camBtn=document.getElementById('cam');camBtn?.after(flip);
      flip.addEventListener('click',switchCamera);
    }
  }

  async function cameraCount(){try{return (await navigator.mediaDevices.enumerateDevices()).filter(d=>d.kind==='videoinput').length}catch{return 0}}
  async function updateFlip(){
    const b=document.getElementById('flipCam');if(!b)return;
    let active=false;try{active=!!cam&&cam.active&&cam.getVideoTracks().some(t=>t.readyState==='live')}catch{}
    if(!active){b.classList.remove('nc235-show');return}
    const mobile=/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent||'');
    b.classList.toggle('nc235-show',mobile||(await cameraCount())>1);
  }
  async function switchCamera(){
    const b=document.getElementById('flipCam');
    try{
      if(!cam||!cam.getVideoTracks().length){toast?.('Active d’abord la caméra.');return}
      b.disabled=true;
      const oldStream=cam,oldTrack=oldStream.getVideoTracks()[0],settings=oldTrack.getSettings?.()||{};
      const vids=(await navigator.mediaDevices.enumerateDevices()).filter(d=>d.kind==='videoinput');
      let videoConstraints={width:{ideal:1920},height:{ideal:1080},frameRate:{ideal:30,max:60}};
      let chosen='';
      if(vids.length>1){
        let i=vids.findIndex(d=>d.deviceId===settings.deviceId);if(i<0)i=0;const next=vids[(i+1)%vids.length];chosen=next.deviceId;videoConstraints={...videoConstraints,deviceId:{exact:next.deviceId}};
      }else{
        const nextFacing=settings.facingMode==='environment'?'user':'environment';
        videoConstraints={...videoConstraints,facingMode:{ideal:nextFacing}};
      }
      const nextStream=await navigator.mediaDevices.getUserMedia({video:videoConstraints,audio:false});
      const nextTrack=nextStream.getVideoTracks()[0];
      let replaced=false;
      try{
        const oldId=oldTrack.id;
        const jobs=[];peers.forEach(pc=>pc.getSenders().forEach(sender=>{if(sender.track?.id===oldId){jobs.push(sender.replaceTrack(nextTrack));replaced=true}}));
        await Promise.allSettled(jobs);
      }catch{}
      cam=nextStream;
      try{oldStream.getTracks().forEach(t=>t.stop())}catch{}
      document.getElementById('local-cam')?.remove();local(cam,'cam');setCtl('cam',true,'ON');
      if(chosen&&document.getElementById('camDevice')){const sel=document.getElementById('camDevice');if([...sel.options].some(o=>o.value===chosen))sel.value=chosen}
      if(!replaced)await reneg();
      send('media',{media:{microphone:!!mic,camera:true,screen:!!screen}});
      toast?.('Caméra changée ✓');
    }catch(e){msg?.({name:'NovaCall',text:'Caméra : '+(e?.message||e)})}finally{if(b)b.disabled=false;updateFlip()}
  }

  const kindByKey=new Map();
  const pendingShares=new Map();
  const coreRemote=typeof remote==='function'?remote:null;
  const corePeople=typeof people==='function'?people:null;
  function userFor(id){try{return (users||[]).find(u=>String(u.id)===String(id))||null}catch{return null}}
  function screenish(track){return /screen|display|window|monitor|share/i.test(String(track?.label||''))}
  function classify(id,s){
    const key=id+':'+s.id;if(kindByKey.has(key))return kindByKey.get(key);
    const tr=s.getVideoTracks?.()[0];let kind='camera';const u=userFor(id);
    if(screenish(tr))kind='screen';
    else if(u?.media?.screen&&!u?.media?.camera)kind='screen';
    else if(u?.media?.camera&&!u?.media?.screen)kind='camera';
    else if(u?.media?.camera&&u?.media?.screen){
      let hasCamera=false,hasScreen=false;for(const[k,v]of kindByKey){if(k.startsWith(id+':')){if(v==='camera')hasCamera=true;if(v==='screen')hasScreen=true}}
      kind=!hasCamera?'camera':(!hasScreen?'screen':'camera');
    }
    kindByKey.set(key,kind);return kind;
  }
  function participantName(id){return names?.get?.(id)||userFor(id)?.name||'Un participant'}
  function removeCard(key){const x=pendingShares.get(key);x?.card?.remove();pendingShares.delete(key)}
  function cleanupKey(key){
    removeCard(key);const n=remoteNodes?.get?.(key);if(n){try{n.remove()}catch{};remoteNodes.delete(key)}kindByKey.delete(key);try{empty()}catch{}
  }
  function showShareCard(id,s){
    const key=id+':'+s.id;if(pendingShares.has(key))return;
    const card=document.createElement('div');card.className='tile nc235-share-card';card.dataset.streamKey=key;
    card.innerHTML=`<div class="nc235-share-icon">${ICONS.monitor}</div><b></b><span>Ce partage ne s’affiche pas automatiquement. Veux-tu le regarder ?</span><button type="button">${ICONS.eye}<span>Regarder</span></button>`;
    card.querySelector('b').textContent=participantName(id)+' partage son écran';
    const btn=card.querySelector('button');btn.querySelector('svg').style.width='16px';btn.querySelector('svg').style.height='16px';
    btn.addEventListener('click',()=>watchShare(id,s,key));
    document.getElementById('grid')?.appendChild(card);pendingShares.set(key,{id,s,card});try{empty()}catch{}
  }
  function watchShare(id,s,key){
    removeCard(key);if(!coreRemote)return;coreRemote(id,s);const node=remoteNodes.get(key);if(!node||node.tagName==='AUDIO')return;
    node.classList.add('nc235-screen-tile');const tag=node.querySelector('.tag');if(tag)tag.textContent=participantName(id)+' · Partage d’écran';
    let stop=node.querySelector('.nc235-stop-watch');if(!stop){stop=document.createElement('button');stop.type='button';stop.className='nc235-stop-watch';stop.innerHTML=ICONS.eyeOff+'<span>Arrêter de regarder</span>';stop.addEventListener('click',e=>{e.stopPropagation();try{node.remove()}catch{};remoteNodes.delete(key);showShareCard(id,s);try{empty()}catch{}});node.appendChild(stop)}
  }
  if(coreRemote){
    remote=function(id,s){
      if(!s||!s.getVideoTracks?.().length)return coreRemote(id,s);
      const key=id+':'+s.id,kind=classify(id,s);
      if(kind==='screen'){
        showShareCard(id,s);
        s.getTracks().forEach(t=>t.addEventListener('ended',()=>cleanupKey(key),{once:true}));
        return;
      }
      return coreRemote(id,s);
    };
  }
  function cleanupKinds(id,kind){for(const[k,v]of [...kindByKey])if(k.startsWith(id+':')&&(!kind||v===kind))cleanupKey(k)}
  function cleanupAbsent(list){
    const present=new Set((list||[]).map(u=>String(u.id)));if(me)present.add(String(me));
    for(const[k]of [...kindByKey]){const id=String(k).split(':')[0];if(!present.has(id))cleanupKey(k)}
    try{for(const[id,pc]of [...peers])if(!present.has(String(id))){try{pc.close()}catch{};peers.delete(id)}}catch{}
    for(const u of list||[]){if(u.id===me)continue;if(u.media&&u.media.camera===false)cleanupKinds(String(u.id),'camera');if(u.media&&u.media.screen===false)cleanupKinds(String(u.id),'screen')}
  }
  if(corePeople){people=function(list){const r=corePeople(list);cleanupAbsent(list);return r}}

  let leaving=false;
  function hardMediaCleanup(){
    try{[mic,cam,screen].filter(Boolean).forEach(s=>s.getTracks().forEach(t=>{try{t.stop()}catch{}}))}catch{}
    try{mic=null;cam=null;screen=null}catch{}
    try{for(const[,n]of remoteNodes){try{n.remove()}catch{}}remoteNodes.clear()}catch{}
    try{for(const[,pc]of peers){try{pc.close()}catch{}}peers.clear()}catch{}
    try{if(ws&&ws.readyState<=1)ws.close(1000,'leave')}catch{}
  }
  document.addEventListener('click',e=>{
    const btn=e.target?.closest?.('#leave');if(!btn||leaving)return;
    leaving=true;e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();btn.disabled=true;
    try{send('media',{media:{microphone:false,camera:false,screen:false}})}catch{}
    hardMediaCleanup();
    try{history.replaceState(null,'',location.origin+'/')}catch{}
    setTimeout(()=>location.replace(location.origin+'/'),60);
  },true);
  window.addEventListener('pagehide',hardMediaCleanup,{capture:true});

  addStyles();paintControls();updateFlip();
  const mo=new MutationObserver(()=>{paintControls();updateFlip()});
  mo.observe(document.documentElement,{subtree:true,childList:true});
  setInterval(updateFlip,900);
})();
