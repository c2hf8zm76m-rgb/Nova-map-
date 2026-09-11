// V1.1.49 ZIP priority flow: popup routes ZIP files directly here so the dual choice remains visible.
const ENGINE='http://127.0.0.1:62675';
const IMAGE=['png','jpg','jpeg','webp','gif','bmp','tiff','tif','tga','ppm','pgm','pbm','pam','pcx','xbm','xwd','dpx','exr','qoi','apng','j2k','jp2','ico','ras','sun','sgi','fits','pfm'];
const AUDIO=['mp3','wav','flac','ogg','opus','aac','m4a','ac3','eac3','aiff','aif','au','caf','wma','mp2','mka','oga','m4b','wv','tta','voc','adts','spx','gsm'];
const VIDEO=['mp4','webm','mkv','mov','avi','mpeg','mpg','m4v','ts','mts','m2ts','flv','3gp','wmv','ogv','asf','vob','m2v','f4v','nut','y4m','dv','mjpeg','mjpg'];
const MODEL=['3d','3ds','3mf','ac','ac3d','acc','ase','b3d','bvh','cob','dae','dxf','fbx','gltf','glb','ifc','iqm','irr','irrmesh','lwo','lws','lxo','m3d','md2','md3','md5','mdl','ms3d','obj','off','ogex','ply','pmx','raw','scn','smd','stp','stl','usd','x','x3d','xgl','zgl'];
const MODEL_OUT=['dae','stl','obj','ply','x','3ds','gltf','glb','x3d','fbx','3mf','stp','m3d'];
const ARCHIVES=['zip','rar','7z','tar','targz','tgz','tarbz2','tbz2','tarxz','txz'];
const $=id=>document.getElementById(id);
let currentFile=null, engineReady=false, archiveMode=false, archiveKind='', archiveAction='', archiveCandidates=[], selectedCandidate=null, resultUrl=null, resultName=''; let fakeTimer=null, previewUrl=null;

$('imageFormats').textContent=IMAGE.slice(0,13).map(x=>x.toUpperCase()).join(' · ')+'…';
$('audioFormats').textContent=AUDIO.slice(0,12).map(x=>x.toUpperCase()).join(' · ')+'…';
$('videoFormats').textContent=VIDEO.slice(0,12).map(x=>x.toUpperCase()).join(' · ')+'…';

function extOf(name){const b=name.toLowerCase();if(b.endsWith('.tar.gz'))return'targz';if(b.endsWith('.tar.bz2'))return'tarbz2';if(b.endsWith('.tar.xz'))return'tarxz';if(b.endsWith('.tgz'))return'tgz';if(b.endsWith('.tbz2'))return'tbz2';if(b.endsWith('.txz'))return'txz';const p=b.split('.');return p.length>1?p.pop():''}
function archiveLabel(k){return ({targz:'TAR.GZ',tarbz2:'TAR.BZ2',tarxz:'TAR.XZ'}[k]||k.toUpperCase())}
function family(e){if(IMAGE.includes(e))return'image';if(AUDIO.includes(e))return'audio';if(VIDEO.includes(e))return'video';if(MODEL.includes(e))return'3d';return'other'}
function known(e){return family(e)!=='other'}
function bytes(n){const u=['B','KB','MB','GB'];let i=0;while(n>=1024&&i<u.length-1){n/=1024;i++}return `${n.toFixed(i?2:0)} ${u[i]}`}
function targetsFor(e){const f=family(e);let a=[];if(f==='image')a=[...IMAGE];if(f==='audio')a=[...AUDIO];if(f==='video')a=[...VIDEO,...AUDIO,'gif'];if(f==='3d')a=[...MODEL_OUT];return [...new Set(a)].filter(x=>x!==e)}
function setNote(text,type=''){ $('note').className='note '+type; $('note').textContent=text }
function refreshButton(){ $('convert').disabled=!currentFile||!engineReady||!selectedInputExt()||!$('target').value }
function selectedInputExt(){if(!archiveMode)return extOf(currentFile?.name||'');if(archiveAction==='self')return archiveKind;if(archiveAction==='inner')return selectedCandidate?.ext||'';return''}

function clearImagePreview(){const box=$('imagePreviewBox');const img=$('imagePreview');if(box)box.classList.add('hidden');if(img)img.removeAttribute('src');if(previewUrl){URL.revokeObjectURL(previewUrl);previewUrl=null}}
function showImagePreview(file){const box=$('imagePreviewBox');const img=$('imagePreview');if(!box||!img){return}clearImagePreview();previewUrl=URL.createObjectURL(file);img.src=previewUrl;box.classList.remove('hidden')}

async function checkEngine(){
  try{
    const c=new AbortController();const t=setTimeout(()=>c.abort(),1800);
    const r=await fetch(ENGINE+'/api/status',{signal:c.signal,cache:'no-store'});clearTimeout(t);
    if(!r.ok)throw new Error('offline');const j=await r.json();engineReady=true;
    $('enginePill').className='pill ready';$('engineText').textContent='Nova Engine connecté';$('launchEngine').classList.add('hidden');
  }catch(e){engineReady=false;$('enginePill').className='pill error';$('engineText').textContent='Nova Engine arrêté';$('launchEngine').classList.remove('hidden');if(currentFile)setNote('Nova Engine n’est pas démarré. Clique sur « Démarrer le moteur » puis réessaie.','warn')}
  refreshButton();
}
checkEngine();setInterval(checkEngine,5000);

function configureSource(ext,message){
  $('source').value=ext.toUpperCase();const outs=targetsFor(ext);$('target').innerHTML=outs.map(x=>`<option value="${x}">${x.toUpperCase()} (.${x})</option>`).join('');
  if(!outs.length)setNote('Aucune sortie compatible pour ce format.','warn');else setNote(message||`${outs.length} formats de sortie compatibles.`,'ok');refreshButton();
}

async function loadFile(f){
  resetResult();clearImagePreview();currentFile=f;archiveMode=false;archiveKind='';archiveAction='';archiveCandidates=[];selectedCandidate=null;
  const e=extOf(f.name);$('drop').classList.add('hidden');$('panel').classList.remove('hidden');$('fileName').textContent=f.name;$('fileInfo').textContent=`${bytes(f.size)} • ${f.type||'détecté par extension'}`;$('extBadge').textContent=(ARCHIVES.includes(e)?archiveLabel(e):e.toUpperCase()).slice(0,6);
  $('archiveChoice').classList.add('hidden');$('archiveInternalControls').classList.add('hidden');$('archiveInsideBtn').classList.remove('active');$('archiveSelfBtn').classList.remove('active');
  if(ARCHIVES.includes(e)){
    archiveMode=true;archiveKind=e;$('archiveBox').classList.remove('hidden');clearImagePreview();
    if(e==='zip'){
      $('archiveTitleText').textContent='Archive ZIP détectée';$('archiveChoice').classList.remove('hidden');$('source').value='ZIP';$('target').innerHTML='';
      setNote('ZIP détecté • choisis : convertir un fichier à l’intérieur ou convertir le ZIP lui-même.','ok');refreshButton();return;
    }
    await inspectArchive(f,e);return;
  }
  $('archiveBox').classList.add('hidden');if(!known(e)){setNote('Extension non prise en charge : .'+e,'warn');$('source').value=e.toUpperCase();$('target').innerHTML='';refreshButton();return}if(family(e)==='image'){showImagePreview(f)}configureSource(e,family(e)==='image'?'Image détectée • aperçu affiché • prêt à convertir.':'Fichier détecté • prêt à convertir.');
}

async function inspectArchive(f,kind){
  clearImagePreview();
  archiveMode=true;archiveKind=kind;archiveAction='inner';$('archiveBox').classList.remove('hidden');$('archiveTitleText').textContent=archiveLabel(kind)+' ouvert';$('archiveInternalControls').classList.remove('hidden');$('archiveSelect').innerHTML='<option>Analyse en cours…</option>';$('archiveSelect').disabled=true;$('source').value=archiveLabel(kind)+' → analyse…';$('target').innerHTML='';setNote('NOVA ouvre '+archiveLabel(kind)+' et cherche le fichier principal…','ok');refreshButton();
  try{
    const r=await fetch(ENGINE+'/api/archive-inspect?type='+encodeURIComponent(kind)+'&name='+encodeURIComponent(f.name),{method:'POST',body:f});const j=await r.json().catch(()=>({}));if(!r.ok)throw new Error(j.error||'Archive illisible');
    archiveCandidates=j.candidates||[];if(!archiveCandidates.length)throw new Error('Aucun fichier convertible trouvé dans cette archive.');$('archiveSelect').innerHTML=archiveCandidates.map((c,i)=>`<option value="${i}">${c.path} • ${c.ext.toUpperCase()} • ${bytes(c.size)}</option>`).join('');$('archiveSelect').disabled=false;
    const rec=j.recommended||archiveCandidates[0];let idx=archiveCandidates.findIndex(c=>c.path===rec.path);if(idx<0)idx=0;$('archiveSelect').value=String(idx);chooseCandidate(idx,true);$('fileInfo').textContent=`${bytes(f.size)} • ${archiveLabel(kind)} • ${j.count||archiveCandidates.length} fichier(s) convertible(s)`;
  }catch(e){selectedCandidate=null;$('source').value=archiveLabel(kind);$('target').innerHTML='';setNote(e.message,'warn');refreshButton()}
}
function chooseCandidate(i,auto=false){selectedCandidate=archiveCandidates[Number(i)]||null;if(!selectedCandidate)return;$('archiveHint').textContent=(auto?'Racine choisie automatiquement : ':'Fichier choisi : ')+selectedCandidate.path+'. Les fichiers annexes restent disponibles pendant la conversion.';configureSource(selectedCandidate.ext,`${archiveLabel(archiveKind)} ouvert automatiquement • ${selectedCandidate.path}`)}
$('archiveSelect').addEventListener('change',e=>chooseCandidate(e.target.value,false));

$('archiveInsideBtn').addEventListener('click',async()=>{
  if(!currentFile||archiveKind!=='zip')return;
  archiveAction='inner';selectedCandidate=null;$('archiveInsideBtn').classList.add('active');$('archiveSelfBtn').classList.remove('active');
  $('archiveInternalControls').classList.remove('hidden');resetResult();await inspectArchive(currentFile,archiveKind);
});

$('archiveSelfBtn').addEventListener('click',()=>{
  if(!currentFile||archiveKind!=='zip')return;
  archiveAction='self';selectedCandidate=null;archiveCandidates=[];$('archiveSelfBtn').classList.add('active');$('archiveInsideBtn').classList.remove('active');
  $('archiveInternalControls').classList.add('hidden');$('archiveTitleText').textContent='Conversion de l’archive ZIP';$('source').value='ZIP';
  $('target').innerHTML='<option value="tar">TAR (.tar)</option>';
  setNote('Mode archive sélectionné • le ZIP complet sera converti en TAR, sans convertir les fichiers un par un.','ok');refreshButton();
});

function setProgress(n,text){$('progress').classList.remove('hidden');$('bar').style.width=n+'%';$('progressPct').textContent=Math.round(n)+'%';if(text)$('progressText').textContent=text}
function fake(){let p=26;setProgress(p,'Conversion en cours…');fakeTimer=setInterval(()=>{if(p<88){p+=Math.max(.6,(88-p)*.055);setProgress(p,'Conversion en cours…')}},350)}
function stopFake(){if(fakeTimer){clearInterval(fakeTimer);fakeTimer=null}}
function resetResult(){stopFake();$('progress').classList.add('hidden');$('downloadBtn').classList.add('hidden');if(resultUrl){URL.revokeObjectURL(resultUrl);resultUrl=null}resultName=''}

$('convert').addEventListener('click',async()=>{
  if(!currentFile||!engineReady)return;resetResult();$('convert').disabled=true;const actual=selectedInputExt(),out=$('target').value,q=$('quality').value;
  try{
    const selfArchive=archiveMode&&archiveAction==='self';
    setProgress(10,selfArchive?'Préparation de l’archive…':archiveMode?'Ouverture de l’archive…':'Préparation du fichier…');fake();
    const input=archiveMode?archiveKind:actual;
    const internalName=(archiveMode&&archiveAction==='inner'&&selectedCandidate)?selectedCandidate.path.split('/').pop():currentFile.name;
    let endpoint=ENGINE+'/api/convert?input='+encodeURIComponent(input)+'&output='+encodeURIComponent(out)+'&quality='+encodeURIComponent(q)+'&name='+encodeURIComponent(internalName);
    if(archiveMode&&archiveAction==='inner')endpoint+='&inner='+encodeURIComponent(selectedCandidate.path);
    const r=await fetch(endpoint,{method:'POST',body:currentFile});stopFake();if(!r.ok){const j=await r.json().catch(()=>({}));throw new Error(j.error||'Conversion impossible')}
    setProgress(95,'Création du fichier…');const b=await r.blob();resultUrl=URL.createObjectURL(b);
    const stem=internalName.replace(/\.(zip|tar\.gz|tar\.bz2|tar\.xz|tgz|tbz2|txz|tar|rar|7z)$/i,'').replace(/\.[^.]+$/,'');
    resultName=r.headers.get('X-Nova-Filename')||stem+'.'+out;
    setProgress(100,'Conversion terminée');$('downloadBtn').classList.remove('hidden');
    if(selfArchive)setNote(`${archiveLabel(archiveKind)} → ${out.toUpperCase()} • archive complète convertie avec succès`,'ok');
    else setNote(`${archiveMode?archiveLabel(archiveKind)+' → ':''}${actual.toUpperCase()} → ${out.toUpperCase()} • conversion réussie`,'ok');
    await addHistory({from:(selfArchive?archiveLabel(archiveKind):actual.toUpperCase()),to:out.toUpperCase(),name:internalName,time:Date.now()});
  }catch(e){stopFake();setProgress(100,'Erreur de conversion');setNote(e.message,'warn')}
  finally{refreshButton()}
});

$('downloadBtn').addEventListener('click',()=>{if(!resultUrl)return;try{chrome.downloads.download({url:resultUrl,filename:resultName,saveAs:true})}catch(e){const a=document.createElement('a');a.href=resultUrl;a.download=resultName;a.click()}});

function resetAll(){currentFile=null;archiveMode=false;archiveKind='';archiveAction='';archiveCandidates=[];selectedCandidate=null;$('fileInput').value='';$('panel').classList.add('hidden');$('drop').classList.remove('hidden');$('archiveBox').classList.add('hidden');$('archiveChoice').classList.add('hidden');$('archiveInternalControls').classList.add('hidden');$('archiveInsideBtn').classList.remove('active');$('archiveSelfBtn').classList.remove('active');clearImagePreview();resetResult();refreshButton()}
$('remove').addEventListener('click',resetAll);
$('chooseTop').addEventListener('click',()=>$('fileInput').click());
$('chooseInside').addEventListener('click',e=>{e.stopPropagation();$('fileInput').click()});
$('drop').addEventListener('click',()=>$('fileInput').click());
$('drop').addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();$('fileInput').click()}});
$('fileInput').addEventListener('change',()=>{if($('fileInput').files[0])loadFile($('fileInput').files[0])});
['dragenter','dragover'].forEach(ev=>$('drop').addEventListener(ev,e=>{e.preventDefault();$('drop').classList.add('over')}));
['dragleave','drop'].forEach(ev=>$('drop').addEventListener(ev,e=>{e.preventDefault();$('drop').classList.remove('over')}));
$('drop').addEventListener('drop',e=>{if(e.dataTransfer.files[0])loadFile(e.dataTransfer.files[0])});

async function getHistory(){return new Promise(resolve=>chrome.storage.local.get(['history'],x=>resolve(x.history||[])))}
async function addHistory(item){const h=await getHistory();h.unshift(item);await chrome.storage.local.set({history:h.slice(0,10)});renderHistory()}
async function renderHistory(){const h=await getHistory();if(!h.length){$('history').innerHTML='<p class="empty">Aucune conversion récente.</p>';return}$('history').innerHTML=h.map(x=>`<div class="history-item"><strong>${escapeHtml(x.from)} → ${escapeHtml(x.to)}</strong><span>${escapeHtml(x.name)} • ${new Date(x.time).toLocaleString('fr-FR')}</span></div>`).join('')}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
$('clearHistory').addEventListener('click',async()=>{await chrome.storage.local.set({history:[]});renderHistory()});renderHistory();


// V1.6.3 — toute la surface du popup accepte maintenant le Drag & Drop.
// La zone visuelle d'origine reste inchangée : on élargit seulement la cible invisible.
let globalDragDepth=0;
function hasDraggedFiles(e){return !!(e.dataTransfer&&Array.from(e.dataTransfer.types||[]).includes('Files'))}
function showGlobalDrop(){document.body.classList.add('global-drag-active')}
function hideGlobalDrop(){document.body.classList.remove('global-drag-active');globalDragDepth=0}

document.addEventListener('dragenter',e=>{
  if(!hasDraggedFiles(e))return;
  e.preventDefault();
  globalDragDepth++;
  showGlobalDrop();
});

document.addEventListener('dragover',e=>{
  if(!hasDraggedFiles(e))return;
  e.preventDefault();
  if(e.dataTransfer)e.dataTransfer.dropEffect='copy';
  showGlobalDrop();
});

document.addEventListener('dragleave',e=>{
  if(!hasDraggedFiles(e))return;
  globalDragDepth=Math.max(0,globalDragDepth-1);
  if(globalDragDepth===0)hideGlobalDrop();
});

document.addEventListener('drop',e=>{
  if(!hasDraggedFiles(e))return;
  e.preventDefault();
  e.stopPropagation();
  hideGlobalDrop();
  const f=e.dataTransfer&&e.dataTransfer.files&&e.dataTransfer.files[0];
  if(f)loadFile(f);
},{capture:true});

window.addEventListener('blur',()=>{
  // Nettoie le halo si le glisser-déposer quitte complètement la fenêtre.
  setTimeout(()=>hideGlobalDrop(),60);
});


// NOVA File V1.0.0 bridge — reçoit le fichier choisi dans le hub sans nouvelle sélection.
window.addEventListener('message', async (event) => {
  const data=event.data||{};
  if(data.type!=='NOVA_FILE_LOAD' || !data.file) return;
  try{
    await loadFile(data.file);
    window.parent.postMessage({type:'NOVA_SYSTEM_FILE_LOADED',system:'convert',name:data.file.name},'*');
  }catch(err){console.error('NOVA File conversion bridge',err);}
});
window.parent.postMessage({type:'NOVA_SYSTEM_READY',system:'convert'},'*');
