const $=id=>document.getElementById(id);
let currentFile=null;
let currentSystem=null;
let frameReady=false;
let transferReceiveMode=false;
const TRANSFER_HANDOFF_CHANNEL='nova-transfer-handoff-v1';
function uid(){return (crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`)}
async function stageTransferFile(file){
  if(!file || typeof BroadcastChannel==='undefined') return null;
  try{await chrome.runtime.sendMessage({type:'NOVA_WAKE_TRANSFER'})}catch{}
  const id=uid();
  return await new Promise(resolve=>{
    const ch=new BroadcastChannel(TRANSFER_HANDOFF_CHANNEL);
    let done=false;
    const finish=value=>{if(done)return;done=true;clearTimeout(timer);ch.close();resolve(value)};
    const timer=setTimeout(()=>finish(null),900);
    ch.addEventListener('message',e=>{const d=e.data||{};if(d.type==='NOVA_TRANSFER_FILE_STORED'&&d.id===id)finish(id)});
    try{ch.postMessage({type:'NOVA_STORE_TRANSFER_FILE',id,file})}catch{finish(null)}
  });
}
async function openPersistentTransfer(receiveMode=false){
  let handoff=null;
  if(!receiveMode && currentFile) handoff=await stageTransferFile(currentFile);
  const params=new URLSearchParams();
  params.set('mode',receiveMode?'receive':'send');
  if(handoff) params.set('handoff',handoff);
  const url=chrome.runtime.getURL(`transfer.html?${params.toString()}`);
  try{
    await chrome.windows.create({url,type:'popup',focused:true,width:1120,height:860});
  }catch{
    await chrome.tabs.create({url,active:true});
  }
  window.close();
}
function extOf(name){const n=(name||'').toLowerCase();if(n.endsWith('.tar.gz'))return'TAR.GZ';if(n.endsWith('.tar.bz2'))return'TAR.BZ2';if(n.endsWith('.tar.xz'))return'TAR.XZ';const p=n.split('.');return (p.length>1?p.pop():'FILE').toUpperCase().slice(0,6)}
function size(bytes){const u=['B','KB','MB','GB','TB'];let i=0,n=bytes||0;while(n>=1024&&i<u.length-1){n/=1024;i++}return `${n.toFixed(i?2:0)} ${u[i]}`}
function describe(file){return `${size(file.size)} · ${file.type||'type détecté par extension'}`}
function setChoiceMode(on){document.body.classList.toggle('choice-mode',!!on);document.documentElement.classList.toggle('choice-mode',!!on)}
function isZipFile(file){return !!file && /\.zip$/i.test(file.name||'')}
function loadHubFile(file){
  if(!file)return;
  currentFile=file;
  $('fileBadge').textContent=extOf(file.name);
  $('fileName').textContent=file.name;
  $('fileInfo').textContent=describe(file);
  $('drop').classList.add('hidden');
  $('choiceScreen').classList.remove('hidden');

  // V1.1.49: a ZIP has its own decision flow.
  // Do not let the generic 3-engine hub override the two ZIP choices.
  if(isZipFile(file)){
    setChoiceMode(false);
    openSystem('convert');
    return;
  }

  setChoiceMode(true);
}
function resetHub(){currentFile=null;currentSystem=null;frameReady=false;transferReceiveMode=false;setChoiceMode(false);$('fileInput').value='';$('choiceScreen').classList.add('hidden');$('drop').classList.remove('hidden');$('systemScreen').classList.add('hidden');$('homeScreen').classList.remove('hidden');$('systemFrame').removeAttribute('src')}
function sendFileToSystem(){if(!$('systemFrame').contentWindow)return;try{if(currentSystem==='transfer'&&transferReceiveMode&&!currentFile){$('systemFrame').contentWindow.postMessage({type:'NOVA_TRANSFER_MODE',mode:'receive'},'*');return}if(!currentFile)return;$('systemFrame').contentWindow.postMessage({type:'NOVA_FILE_LOAD',file:currentFile},'*')}catch(err){console.error('NOVA File bridge',err)}}
function openSystem(system,receiveMode=false){if(system!=='transfer'&&!currentFile)return;if(system==='transfer'&&!receiveMode&&!currentFile)return;currentSystem=system;transferReceiveMode=!!receiveMode;frameReady=false;setChoiceMode(false);$('homeScreen').classList.add('hidden');$('systemScreen').classList.remove('hidden');if(system==='convert'){$('systemKicker').textContent='MODULE CONVERSION';$('systemTitle').textContent='NOVA File · Convertir';$('systemFrame').src='converter.html'}else if(system==='compress'){$('systemKicker').textContent='MODULE COMPRESSION';$('systemTitle').textContent='NOVA File · Compresser';$('systemFrame').src='compressor.html'}else{$('systemKicker').textContent='MODULE TRANSFERT DIRECT';$('systemTitle').textContent=receiveMode?'NOVA File · Recevoir':'NOVA File · Transférer';$('systemFrame').src='transfer.html'}}
$('chooseFile').addEventListener('click',e=>{e.stopPropagation();$('fileInput').click()});$('drop').addEventListener('click',e=>{if(!e.target.closest('button'))$('fileInput').click()});$('drop').addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();$('fileInput').click()}});$('fileInput').addEventListener('change',()=>loadHubFile($('fileInput').files[0]));['dragenter','dragover'].forEach(ev=>$('drop').addEventListener(ev,e=>{e.preventDefault();$('drop').classList.add('over')}));['dragleave','drop'].forEach(ev=>$('drop').addEventListener(ev,e=>{e.preventDefault();$('drop').classList.remove('over')}));$('drop').addEventListener('drop',e=>loadHubFile(e.dataTransfer.files[0]));$('changeFile').addEventListener('click',()=>{$('fileInput').click()});$('openConvert').addEventListener('click',()=>openSystem('convert'));$('openCompress').addEventListener('click',()=>openSystem('compress'));$('openTransfer').addEventListener('click',()=>openPersistentTransfer(false));$('openReceive').addEventListener('click',e=>{e.stopPropagation();openPersistentTransfer(true)});$('backHome').addEventListener('click',()=>{
  $('systemScreen').classList.add('hidden');
  $('homeScreen').classList.remove('hidden');
  $('systemFrame').removeAttribute('src');
  currentSystem=null;
  transferReceiveMode=false;
  frameReady=false;
  if(currentFile){
    $('drop').classList.add('hidden');
    $('choiceScreen').classList.remove('hidden');
  }
  setChoiceMode(!!currentFile);
});$('sendAgain').addEventListener('click',sendFileToSystem);
window.addEventListener('message',e=>{if(e.source!==$('systemFrame').contentWindow)return;const d=e.data||{};if(d.type==='NOVA_SYSTEM_READY'){frameReady=true;sendFileToSystem()}if(d.type==='NOVA_SYSTEM_FILE_LOADED'){console.log('NOVA File:',d.system,'a reçu',d.name)}});
let globalDragDepth=0;function hasFiles(e){return !!(e.dataTransfer&&Array.from(e.dataTransfer.types||[]).includes('Files'))}function hideGlobal(){document.body.classList.remove('global-drag-active');globalDragDepth=0}document.addEventListener('dragenter',e=>{if(!hasFiles(e))return;e.preventDefault();globalDragDepth++;document.body.classList.add('global-drag-active')});document.addEventListener('dragover',e=>{if(!hasFiles(e))return;e.preventDefault();if(e.dataTransfer)e.dataTransfer.dropEffect='copy';document.body.classList.add('global-drag-active')});document.addEventListener('dragleave',e=>{if(!hasFiles(e))return;globalDragDepth=Math.max(0,globalDragDepth-1);if(!globalDragDepth)hideGlobal()});document.addEventListener('drop',e=>{if(!hasFiles(e))return;e.preventDefault();e.stopPropagation();hideGlobal();const f=e.dataTransfer?.files?.[0];if(!f)return;if(currentSystem){currentFile=f;sendFileToSystem()}else loadHubFile(f)},{capture:true});window.addEventListener('blur',()=>setTimeout(hideGlobal,60));
