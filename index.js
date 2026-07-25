const { spawn } = require('child_process');
const http = require('http');

const OMNI_PORT = 20129;
const PUBLIC_PORT = process.env.PORT || 20128;

const omni = spawn('npx', ['omniroute'], {
  shell: true,
  stdio: 'inherit',
  env: { ...process.env, PORT: OMNI_PORT }
});

const server = http.createServer((req, res) => {
  const options = {
    hostname: '127.0.0.1',
    port: OMNI_PORT,
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
    res.end('Iniciando servidor... Vuelve a recargar en 10 segundos.');
  });

  req.pipe(proxyReq, { end: true });
});

server.listen(PUBLIC_PORT, '0.0.0.0', () => {
  console.log('Proxy de Render activo y escuchando perfectamente');
});
