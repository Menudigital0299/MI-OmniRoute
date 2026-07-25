const { spawn } = require('child_process');
const http = require('http');

// 1. Iniciar OmniRoute en segundo plano
const omni = spawn('npx', ['omniroute'], { shell: true, stdio: 'inherit' });

// 2. Crear un proxy HTTP para abrir la puerta a Render en 0.0.0.0
const PORT = process.env.PORT || 20128;
const HOST = '0.0.0.0';

const server = http.createServer((req, res) => {
  const options = {
    hostname: '127.0.0.1',
    port: 20128,
    path: req.url,
    method: req.method,
    headers: req.headers,
  };

  const proxyReq = http.request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res, { end: true });
  });

  proxyReq.on('error', () => {
    res.writeHead(502, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Servidor iniciando... Recarga en 10 segundos.');
  });

  req.pipe(proxyReq, { end: true });
});

server.listen(PORT, HOST, () => {
  console.log(>>> Proxy de Render activo en puerto ${PORT});
});
