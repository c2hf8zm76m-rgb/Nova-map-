(()=>{
'use strict';
const VERSION='0.27.0';
const API='https://nova-call-signal.vercel.app/api/signal';
const $=id=>document.getElementById(id);
const state={room:'',name:'',me:'',lastId:0,joined:false,pollToken:0,pollDelay:800,users:[],mic:null,cam:null,screen:null,deaf:false,ptt:false,pttDown:false};
const peers=new Map(),pendingIce=new Map(),remoteNodes=new Map();
const rtc={iceServers:[{urls:'stun:stun.cloudflare.com:3478'},{urls:'stun:stun.l.google.com:19302'}]};
let toastTimer=0;

function toast(text){const e=$('toast');e.textContent=text;e.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>e.classList.remove('show'),1800)}
function setJoinStatus(text,type=''){const e=$('joinStatus');e.textContent=text;e.className='join-status'+(type?' '+type:'')}
function setJoinBusy(on){$('enter').disabled=on;$('quick').disabled=on;$('enter').textContent=on?'Connexion…':'Rejoindre l’espace'}
function normRoom(s){return String(s||'').trim().toLowerCase().replace(/[^a-z0-9-_]+/g,'-').replace(/^-+|-+$/g,'').slice(0,64)}
function clientId(){const k='novacall-client-id-v027';let id=localStorage.getItem(k);if(!id){id=(crypto.randomUUID?.()||('nc-'+Date.now().toString(36)+Math.random().toString(36).slice(2))).replace(/[^a-zA-Z0-9_-]/g,'');localStorage.setItem(k,id)}return id}
function initials(n){return String(n||'?').trim().split(/\s+/).map(x=>x[0]||'').join('').slice(0,2).toUpperCase()||'?'}
function withTimeout(url,init={},ms=8000){const ctrl=new AbortController();const timer=setTimeout(()=>ctrl.abort(),ms);return fetch(url,{...init,cache:'no-store',signal:ctrl.signal}).finally(()=>clearTimeout(timer))}
async function api(url,init={}){const r=await withTimeout(url,init,8000);const j=await r.json().catch(()=>({}));if(!r.ok||!j.ok)throw new Error(j.error||('HTTP '+r.status));return j}
async function post(body){return api(API,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(body)})}

function showApp(){
  $('join').classList.add('hidden');$('app').classList.remove('hidden');
  $('roomLabel').textContent=state.room;$('title').textContent='# '+state.room;
  history.replaceState(null,'','/?room='+encodeURIComponent(state.room));
}
function showJoin(){
  $('app').classList.add('hidden');$('join').classList.remove('hidden');
  history.replaceState(null,'','/');
}

function message(name,text,time=Date.now()){
  const d=document.createElement('div');d.className='msg';
  d.innerHTML='<div class="msg-head"><b></b><time></time></div><div class="msg-text"></div>';
  d.querySelector('b').textContent=name||'NovaCall';
  d.querySelector('time').textContent=new Date(time).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});
  d.querySelector('.msg-text').textContent=text||'';
  $('messages').appendChild(d);$('messages').scrollTop=$('messages').scrollHeight;
}

function userMediaText(u){const m=u.media||{};const parts=[];if(m.microphone)parts.push('🎙');if(m.camera)parts.push('◉');if(m.screen)parts.push('▣');return parts.join(' ')||'En ligne'}
function renderPeople(){
  $('count').textContent=state.users.length;$('people').innerHTML='';
  for(const u of state.users){const row=document.createElement('div');row.className='person';row.innerHTML='<div class="person-avatar"></div><div class="person-main"><b></b><small></small></div><div class="person-state"></div>';row.querySelector('.person-avatar').textContent=initials(u.name);row.querySelector('b').textContent=(u.name||'Invité')+(u.id===state.me?' · toi':'');row.querySelector('small').textContent=u.status||'NovaCall';row.querySelector('.person-state').textContent=userMediaText(u);$('people').appendChild(row)}
}

function syncUsers(list,initial=false){
  const prev=new Set(state.users.map(u=>u.id));state.users=Array.isArray(list)?list:[];renderPeople();
  if(initial){for(const u of state.users){if(u.id!==state.me&&String(state.me)<String(u.id))offer(u.id).catch(()=>{})}}
  else{for(const u of state.users){if(u.id!==state.me&&!prev.has(u.id)&&String(state.me)<String(u.id))offer(u.id).catch(()=>{})}}
}

async function join(quick=false){
  if(state.joined)return;
  const name=$('name').value.trim()||'Invité';
  let room=normRoom($('room').value);
  if(quick){room='nova-'+Math.random().toString(36).slice(2,8);$('room').value=room}
  if(!room){setJoinStatus('Choisis un espace NovaCall.','error');$('room').focus();return}
  state.name=name;state.room=room;state.me=clientId();localStorage.setItem('novacall-name-v027',name);
  setJoinBusy(true);setJoinStatus('Connexion Nova Cloud…');
  try{
    const r=await post({action:'join',room,clientId:state.me,name});
    state.lastId=Number(r.lastId)||0;state.joined=true;showApp();
    for(const h of r.history||[])message(h.sender_name,h.payload?.text||'',h.created_at||Date.now());
    syncUsers(r.users||[],true);
    setJoinStatus('Connecté.','ok');setJoinBusy(false);await enumerateDevices();startPoll();
  }catch(e){console.error('join',e);state.joined=false;setJoinBusy(false);setJoinStatus(e?.name==='AbortError'?'Nova Cloud ne répond pas après 8 secondes. Réessaie.':'Connexion impossible — '+(e?.message||'erreur inconnue'),'error')}
}

function startPoll(){const token=++state.pollToken;const tick=async()=>{if(token!==state.pollToken||!state.joined)return;try{const q='?room='+encodeURIComponent(state.room)+'&clientId='+encodeURIComponent(state.me)+'&after='+encodeURIComponent(state.lastId);const r=await api(API+q);syncUsers(r.users||[],false);for(const e of r.events||[])handleEvent(e);state.lastId=Math.max(state.lastId,Number(r.lastId)||0);state.pollDelay=800;$('net').textContent='● Nova Cloud'}catch(e){state.pollDelay=Math.min(5000,Math.round(state.pollDelay*1.5));$('net').textContent='● Reconnexion…'}setTimeout(tick,state.pollDelay)};tick()}
function handleEvent(e){if(e.event_type==='chat')message(e.sender_name,e.payload?.text||'',e.payload?.time||e.created_at);if(e.event_type==='signal')handleSignal(e.sender_id,e.payload?.signalType,e.payload?.data).catch(console.warn)}
async function sendChat(text){if(!state.joined)return;await post({action:'event',eventType:'chat',room:state.room,clientId:state.me,name:state.name,payload:{text:String(text).slice(0,1500),time:Date.now()}})}
async function sendPresence(kind,data){if(!state.joined)return;try{await post({action:'presence',kind,room:state.room,clientId:state.me,name:state.name,data})}catch{}}
async function sendSignal(target,signalType,data){if(!state.joined)return;try{await post({action:'event',eventType:'signal',room:state.room,clientId:state.me,name:state.name,recipientId:target,payload:{signalType,data}})}catch(e){console.warn('signal send',e)}}

function streams(){return[state.mic,state.cam,state.screen].filter(Boolean)}
function addTracks(pc){const ids=new Set(pc.getSenders().map(s=>s.track?.id).filter(Boolean));for(const stream of streams())for(const track of stream.getTracks())if(!ids.has(track.id))pc.addTrack(track,stream)}
function removeStreamFromPeers(stream){if(!stream)return;const ids=new Set(stream.getTracks().map(t=>t.id));for(const pc of peers.values())for(const s of pc.getSenders())if(s.track&&ids.has(s.track.id))try{pc.removeTrack(s)}catch{}}
function peer(id){if(peers.has(id))return peers.get(id);const pc=new RTCPeerConnection(rtc);peers.set(id,pc);addTracks(pc);pc.onicecandidate=e=>e.candidate&&sendSignal(id,'ice',e.candidate);pc.ontrack=e=>attachRemote(id,e.streams[0]);pc.onconnectionstatechange=()=>{if(['failed','closed'].includes(pc.connectionState)){try{pc.close()}catch{}peers.delete(id)}};return pc}
async function offer(id){const pc=peer(id);if(pc.signalingState!=='stable')return;addTracks(pc);const o=await pc.createOffer({offerToReceiveAudio:true,offerToReceiveVideo:true});await pc.setLocalDescription(o);await sendSignal(id,'offer',pc.localDescription)}
async function renegotiate(){for(const id of peers.keys())try{await offer(id)}catch{}}
async function flushIce(id,pc){for(const c of pendingIce.get(id)||[])try{await pc.addIceCandidate(c)}catch{}pendingIce.delete(id)}
async function handleSignal(from,type,data){const pc=peer(from);if(type==='offer'){if(pc.signalingState!=='stable')try{await pc.setLocalDescription({type:'rollback'})}catch{}await pc.setRemoteDescription(data);await flushIce(from,pc);addTracks(pc);const a=await pc.createAnswer();await pc.setLocalDescription(a);await sendSignal(from,'answer',pc.localDescription)}else if(type==='answer'){if(pc.signalingState==='have-local-offer'){await pc.setRemoteDescription(data);await flushIce(from,pc)}}else if(type==='ice'){if(pc.remoteDescription)await pc.addIceCandidate(data);else{const arr=pendingIce.get(from)||[];arr.push(data);pendingIce.set(from,arr)}}}

function mediaCard(id,label,stream,local=false){let card=$(id);if(!card){card=document.createElement('div');card.id=id;card.className='media-card';card.innerHTML='<video autoplay playsinline></video><div class="media-tag"></div>';$('mediaGrid').appendChild(card)}const v=card.querySelector('video');v.srcObject=stream;v.muted=local||state.deaf;card.querySelector('.media-tag').textContent=label;updateEmpty();return card}
function attachRemote(userId,stream){if(!stream)return;const key=userId+':'+stream.id;if(remoteNodes.has(key))return;if(stream.getVideoTracks().length){const safeId=('remote-'+String(userId)+'-'+String(stream.id)).replace(/[^a-zA-Z0-9_-]/g,'_');const card=mediaCard(safeId,(state.users.find(u=>u.id===userId)?.name||'Participant'),stream,false);remoteNodes.set(key,card);stream.getTracks().forEach(t=>t.onended=()=>{card.remove();remoteNodes.delete(key);updateEmpty()})}else{const a=document.createElement('audio');a.autoplay=true;a.muted=state.deaf;a.srcObject=stream;document.body.appendChild(a);remoteNodes.set(key,a);stream.getTracks().forEach(t=>t.onended=()=>{a.remove();remoteNodes.delete(key)})}}
function updateEmpty(){$('emptyState').classList.toggle('hidden',!!$('mediaGrid').querySelector('.media-card'))}

async function enumerateDevices(){if(!navigator.mediaDevices?.enumerateDevices)return;try{const ds=await navigator.mediaDevices.enumerateDevices();fillDevice($('micDevice'),ds.filter(d=>d.kind==='audioinput'),'Micro');fillDevice($('camDevice'),ds.filter(d=>d.kind==='videoinput'),'Caméra')}catch{}}
function fillDevice(el,items,label){const old=el.value;el.innerHTML='<option value="">Par défaut</option>';items.forEach((d,i)=>{const o=document.createElement('option');o.value=d.deviceId;o.textContent=d.label||label+' '+(i+1);el.appendChild(o)});if([...el.options].some(o=>o.value===old))el.value=old}
function setControl(id,on){const b=$(id);b.classList.toggle('on',on);const s=b.querySelector('small');if(s)s.textContent=on?'ON':'OFF'}
async function toggleMic(){try{if(!state.mic){const id=$('micDevice').value;state.mic=await navigator.mediaDevices.getUserMedia({audio:id?{deviceId:{exact:id},echoCancellation:true,noiseSuppression:true}:{echoCancellation:true,noiseSuppression:true},video:false});setControl('micBtn',true);await enumerateDevices()}else{const old=state.mic;state.mic=null;removeStreamFromPeers(old);old.getTracks().forEach(t=>t.stop());setControl('micBtn',false)}applyPTT();await renegotiate();sendPresence('media',{media:{microphone:!!state.mic,camera:!!state.cam,screen:!!state.screen}})}catch(e){toast('Micro : '+(e?.message||e))}}
async function toggleCam(){try{if(!state.cam){const id=$('camDevice').value;state.cam=await navigator.mediaDevices.getUserMedia({video:id?{deviceId:{exact:id},width:{ideal:1920},height:{ideal:1080},frameRate:{ideal:30,max:60}}:{width:{ideal:1920},height:{ideal:1080},frameRate:{ideal:30,max:60}},audio:false});mediaCard('local-cam',state.name+' · Caméra',state.cam,true);setControl('camBtn',true);await enumerateDevices()}else{const old=state.cam;state.cam=null;removeStreamFromPeers(old);old.getTracks().forEach(t=>t.stop());$('local-cam')?.remove();setControl('camBtn',false);updateEmpty()}await renegotiate();sendPresence('media',{media:{microphone:!!state.mic,camera:!!state.cam,screen:!!state.screen}})}catch(e){toast('Caméra : '+(e?.message||e))}}
async function toggleScreen(){if(state.screen){const old=state.screen;state.screen=null;removeStreamFromPeers(old);old.getTracks().forEach(t=>t.stop());$('local-screen')?.remove();setControl('screenBtn',false);updateEmpty();await renegotiate();sendPresence('media',{media:{microphone:!!state.mic,camera:!!state.cam,screen:false}});return}try{const [h,f]=$('shareQuality').value.split(',').map(Number),w=h===720?1280:h===1080?1920:2560;state.screen=await navigator.mediaDevices.getDisplayMedia({video:{width:{ideal:w},height:{ideal:h},frameRate:{ideal:f,max:f}},audio:true});const t=state.screen.getVideoTracks()[0];t.onended=()=>state.screen&&toggleScreen();mediaCard('local-screen',state.name+' · Écran',state.screen,true);setControl('screenBtn',true);await renegotiate();sendPresence('media',{media:{microphone:!!state.mic,camera:!!state.cam,screen:true}})}catch(e){state.screen=null;if(!['AbortError','NotAllowedError'].includes(e?.name))toast('Partage : '+(e?.message||e))}}
function applyPTT(){const t=state.mic?.getAudioTracks?.()[0];if(t)t.enabled=!state.ptt||state.pttDown;$('pttBtn').classList.toggle('on',state.ptt);$('pttBtn').querySelector('small').textContent=state.ptt?(state.pttDown?'PARLE':'ESPACE'):'OFF'}
async function togglePTT(){if(!state.ptt&&!state.mic){await toggleMic();if(!state.mic)return}state.ptt=!state.ptt;state.pttDown=false;applyPTT()}
function toggleDeaf(){state.deaf=!state.deaf;for(const n of remoteNodes.values()){if(n.tagName==='AUDIO')n.muted=state.deaf;else n.querySelector('video')&&(n.querySelector('video').muted=state.deaf)}setControl('deafBtn',!state.deaf);$('deafBtn').querySelector('small').textContent=state.deaf?'OFF':'ON'}

function leave(){state.pollToken++;state.joined=false;try{navigator.sendBeacon(API,new Blob([JSON.stringify({action:'leave',room:state.room,clientId:state.me,name:state.name})],{type:'application/json'}))}catch{}for(const s of [state.mic,state.cam,state.screen])s?.getTracks?.().forEach(t=>t.stop());state.mic=state.cam=state.screen=null;for(const pc of peers.values())try{pc.close()}catch{}peers.clear();for(const n of remoteNodes.values())try{n.remove()}catch{}remoteNodes.clear();$('mediaGrid').querySelectorAll('.media-card').forEach(n=>n.remove());$('messages').innerHTML='';state.users=[];renderPeople();updateEmpty();showJoin();setJoinStatus('');}

function applyTheme(theme){if(!['aurora','arctic','ember','mint'].includes(theme))theme='aurora';document.documentElement.dataset.theme=theme;localStorage.setItem('novacall-theme-v027',theme);$('themeModal').classList.add('hidden')}
function openTheme(){$('themeModal').classList.remove('hidden')}
function invite(){const link=location.origin+'/?room='+encodeURIComponent(state.room);navigator.clipboard?.writeText(link).then(()=>toast('Lien copié ✓')).catch(()=>prompt('Copie ce lien :',link))}

function bind(){
  document.title='NovaCall V'+VERSION;
  $('name').value=localStorage.getItem('novacall-name-v027')||'';
  const q=new URLSearchParams(location.search).get('room');if(q)$('room').value=q;
  applyTheme(localStorage.getItem('novacall-theme-v027')||'aurora');
  $('enter').addEventListener('click',()=>join(false));$('quick').addEventListener('click',()=>join(true));$('room').addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();join(false)}});
  $('messageForm').addEventListener('submit',async e=>{e.preventDefault();const t=$('messageInput').value.trim();if(!t)return;$('messageInput').value='';try{await sendChat(t)}catch{toast('Message non envoyé')}});
  $('messageInput').addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();$('messageForm').requestSubmit()}});
  $('micBtn').addEventListener('click',toggleMic);$('camBtn').addEventListener('click',toggleCam);$('screenBtn').addEventListener('click',toggleScreen);$('pttBtn').addEventListener('click',togglePTT);$('deafBtn').addEventListener('click',toggleDeaf);$('leaveBtn').addEventListener('click',leave);$('inviteBtn').addEventListener('click',invite);$('themeBtn').addEventListener('click',openTheme);$('closeTheme').addEventListener('click',()=>$('themeModal').classList.add('hidden'));$('themeModal').addEventListener('click',e=>{if(e.target===$('themeModal'))$('themeModal').classList.add('hidden')});document.querySelectorAll('[data-theme]').forEach(b=>b.addEventListener('click',()=>applyTheme(b.dataset.theme)));
  $('micDevice').addEventListener('change',async()=>{if(state.mic){await toggleMic();await toggleMic()}});$('camDevice').addEventListener('change',async()=>{if(state.cam){await toggleCam();await toggleCam()}});
  window.addEventListener('keydown',e=>{if(!state.ptt||e.repeat||['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName))return;if(e.code==='Space'){e.preventDefault();state.pttDown=true;applyPTT()}});window.addEventListener('keyup',e=>{if(state.ptt&&e.code==='Space'){e.preventDefault();state.pttDown=false;applyPTT()}});
  window.addEventListener('pagehide',()=>{if(state.joined)try{navigator.sendBeacon(API,new Blob([JSON.stringify({action:'leave',room:state.room,clientId:state.me,name:state.name})],{type:'application/json'}))}catch{}});
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bind,{once:true});else bind();
})();
