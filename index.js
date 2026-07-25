const { spawn } = require('child_process');
const http = require('http');

const PUBLIC_PORT = process.env.PORT || 20128;
const OMNI_PORT = 20129;

// 1. Abrimos el puerto público PRIMERO para que Render lo detecte
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
    res.end('OmniRoute se esta iniciando por detras... Recarga la pagina en 10 segundos.');
  });

  req.pipe(proxyReq, { end: true });
});

// 2. SOLO cuando el proxy está firme, encendemos la IA
server.listen(PUBLIC_PORT, '0.0.0.0', () => {
  console.log(>>> Proxy de Render asegurado en el puerto ${PUBLIC_PORT});
  
  spawn('npx', ['omniroute'], {
    shell: true,
    stdio: 'inherit',
    env: { ...process.env, PORT: OMNI_PORT, HOST: '127.0.0.1' }
  });
});
