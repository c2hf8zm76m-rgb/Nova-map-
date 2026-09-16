const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const root = __dirname;
const dl = path.join(root, 'downloads');
const web = path.join(root, 'web');
fs.mkdirSync(web, { recursive: true });

global.window = {};
for (const name of ['s1.js','s2.js','s3.js','s4.js','p1.js','p2.js']) {
  const code = fs.readFileSync(path.join(dl, name), 'utf8');
  Function(code)();
}
if (!global.window.__NMS || !global.window.__NMP) throw new Error('Patch chunks missing');
const stablePatch = zlib.gunzipSync(Buffer.from(global.window.__NMS, 'base64')).toString('utf8');
const privatePatch = zlib.gunzipSync(Buffer.from(global.window.__NMP, 'base64')).toString('utf8');

const patchers = Function(
  stablePatch + '\n' + privatePatch + '\nreturn {' +
  'patchFolderMove,patchFolderDragDrop,patchBulkMessageManagement,patchScheduledReprogram,patchAuthProgress,patchAutoCloudConnection,patchPrivateMessages' +
  '};'
)();

let html = fs.readFileSync(path.join(dl, 'base-index.html'), 'utf8');
let app = fs.readFileSync(path.join(dl, 'base-app.js'), 'utf8');

app = patchers.patchFolderMove(app);
app = patchers.patchFolderDragDrop(app);
app = patchers.patchBulkMessageManagement(app);
app = patchers.patchScheduledReprogram(app);
app = patchers.patchAuthProgress(app);
app = patchers.patchAutoCloudConnection(app);
app = patchers.patchPrivateMessages(app);

app = app.split('nova-mail.pp.ua').join('nova-corps.de');
app = app.split('nova-mail\\.pp\\.ua').join('nova-corps\\.de');
app = app.split('0.10.3').join('0.10.8.8');

html = html.split('nova-mail.pp.ua').join('nova-corps.de');
html = html.split('0.10.3').join('0.10.8.8');
html = html.split('010030').join('010088');

// Keep every static asset local in the Windows app.
html = html.replace(/https:\/\/nova-mail-[^\"']+\.vercel\.app\//g, '/');
html = html.replace(/<script\s+src=[\"'][^\"']*\/app\.js(?:\?[^\"']*)?[\"']\s*><\/script>/i, '<script src="/app.js?v=010088"></script>');

const css = [
  'smart-links-010072.css',
  'folder-drag-drop.css',
  'bulk-message-actions.css',
  'auth-progress.css',
  'cloud-auto-connect.css'
];
const js = ['auth-progress.js','smart-links-010072.js','badge-system-010060.js'];
const cssTags = css.map(x => `<link rel="stylesheet" href="/${x}?v=010088">`).join('');
const jsTags = js.map(x => `<script src="/${x}?v=010088"></script>`).join('');
if (!html.includes('folder-drag-drop.css')) html = html.replace('</head>', cssTags + '</head>');
if (!html.includes('auth-progress.js')) html = html.replace('</body>', jsTags + '</body>');

fs.writeFileSync(path.join(web, 'index.html'), html);
fs.writeFileSync(path.join(web, 'app.js'), app);

const assets = [
  'styles.css','icon.svg','manifest.webmanifest','sw.js','nova-favicon.svg','favicon.ico','apple-touch-icon-desktop.png',
  'smart-links-010072.css','folder-drag-drop.css','bulk-message-actions.css','auth-progress.css','cloud-auto-connect.css',
  'auth-progress.js','smart-links-010072.js','badge-system-010060.js'
];
for (const name of assets) {
  const src = path.join(dl, name);
  if (fs.existsSync(src) && fs.statSync(src).size > 0) fs.copyFileSync(src, path.join(web, name));
}
const iconsSrc = path.join(dl, 'icons');
const iconsDst = path.join(web, 'icons');
if (fs.existsSync(iconsSrc)) {
  fs.mkdirSync(iconsDst, { recursive: true });
  for (const name of fs.readdirSync(iconsSrc)) fs.copyFileSync(path.join(iconsSrc, name), path.join(iconsDst, name));
}

console.log('Nova Mail Desktop web bundle built:', {
  html: fs.statSync(path.join(web,'index.html')).size,
  app: fs.statSync(path.join(web,'app.js')).size,
  assets: fs.readdirSync(web).length
});
