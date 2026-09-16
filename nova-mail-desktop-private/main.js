const { app, BrowserWindow, shell } = require('electron');
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const WEB_DIR = path.join(__dirname, 'web');
const API_ORIGIN = 'https://mail.nova-corps.de';
let server = null;
let mainWindow = null;

function mimeType(file) {
  const ext = path.extname(file).toLowerCase();
  return ({
    '.html': 'text/html; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.webmanifest': 'application/manifest+json; charset=utf-8',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.ico': 'image/x-icon',
    '.webp': 'image/webp'
  })[ext] || 'application/octet-stream';
}

function safeStaticPath(urlPath) {
  let clean = decodeURIComponent(String(urlPath || '/').split('?')[0]);
  if (clean === '/') clean = '/index.html';
  clean = path.normalize(clean).replace(/^([/\\])+/, '');
  const full = path.join(WEB_DIR, clean);
  if (!full.startsWith(WEB_DIR)) return null;
  return full;
}

function proxyApi(req, res) {
  const target = new URL(req.url, API_ORIGIN);
  const headers = {};
  for (const key of ['content-type', 'authorization', 'x-nova-enrollment', 'accept']) {
    const value = req.headers[key];
    if (value) headers[key] = value;
  }
  headers['user-agent'] = 'Nova-Mail-Desktop/0.10.8.8';

  const proxy = https.request({
    protocol: target.protocol,
    hostname: target.hostname,
    port: 443,
    method: req.method,
    path: target.pathname + target.search,
    headers
  }, upstream => {
    res.statusCode = upstream.statusCode || 502;
    for (const [key, value] of Object.entries(upstream.headers)) {
      if (value == null) continue;
      if (['content-length', 'transfer-encoding', 'connection', 'content-encoding'].includes(key.toLowerCase())) continue;
      try { res.setHeader(key, value); } catch {}
    }
    res.setHeader('Cache-Control', 'no-store');
    upstream.pipe(res);
  });

  proxy.on('error', err => {
    if (res.headersSent) return res.end();
    res.statusCode = 502;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify({ error: 'desktop_proxy_failed', message: String(err.message || err) }));
  });
  req.pipe(proxy);
}

function startLocalServer() {
  return new Promise((resolve, reject) => {
    server = http.createServer((req, res) => {
      try {
        if (String(req.url || '').startsWith('/api/')) return proxyApi(req, res);
        const file = safeStaticPath(req.url);
        if (!file) {
          res.statusCode = 400;
          return res.end('Bad request');
        }
        fs.stat(file, (err, stat) => {
          if (err || !stat.isFile()) {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain; charset=utf-8');
            return res.end('Not found');
          }
          res.statusCode = 200;
          res.setHeader('Content-Type', mimeType(file));
          res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
          if (path.basename(file) === 'sw.js') res.setHeader('Service-Worker-Allowed', '/');
          fs.createReadStream(file).pipe(res);
        });
      } catch (err) {
        res.statusCode = 500;
        res.end(String(err.message || err));
      }
    });
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => resolve(server.address().port));
  });
}

async function createWindow() {
  const port = await startLocalServer();
  mainWindow = new BrowserWindow({
    width: 1500,
    height: 940,
    minWidth: 1000,
    minHeight: 650,
    show: false,
    autoHideMenuBar: true,
    backgroundColor: '#050713',
    title: 'Nova Mail',
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      spellcheck: true
    }
  });

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https?:/i.test(url)) shell.openExternal(url);
    return { action: 'deny' };
  });
  mainWindow.webContents.on('will-navigate', (event, url) => {
    const allowed = `http://127.0.0.1:${port}/`;
    if (!url.startsWith(allowed)) {
      event.preventDefault();
      if (/^https?:/i.test(url)) shell.openExternal(url);
    }
  });

  mainWindow.once('ready-to-show', () => mainWindow.show());
  await mainWindow.loadURL(`http://127.0.0.1:${port}/?novaDesktop=1`);
}

const gotLock = app.requestSingleInstanceLock();
if (!gotLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (!mainWindow) return;
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.show();
    mainWindow.focus();
  });
  app.whenReady().then(createWindow).catch(err => {
    console.error(err);
    app.quit();
  });
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
app.on('before-quit', () => {
  try { server?.close(); } catch {}
});
