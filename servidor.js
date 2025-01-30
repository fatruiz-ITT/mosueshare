// Archivo: servidor.js (Servidor WebSocket en Node.js)
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('Cliente conectado');
    
    ws.on('message', (message) => {
        console.log(`Mensaje recibido: ${message}`);
        // Reenvía los datos a todos los clientes conectados
        wss.clients.forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on('close', () => console.log('Cliente desconectado'));
});

console.log('Servidor WebSocket corriendo en ws://localhost:8080');
