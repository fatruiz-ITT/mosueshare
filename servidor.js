// Archivo: servidor.js (Servidor WebSocket en Node.js)
const WebSocket = require('ws');
const robot = require('robotjs');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('Cliente conectado');
    
    ws.on('message', (message) => {
        console.log(`Mensaje recibido: ${message}`);
        
        if (message.startsWith('Mouse:')) {
            const coords = message.match(/\d+/g);
            if (coords && coords.length === 2) {
                const x = parseInt(coords[0], 10);
                const y = parseInt(coords[1], 10);
                robot.moveMouse(x, y);
            }
        } else if (message.startsWith('Tecla presionada:')) {
            const key = message.split(': ')[1];
            robot.keyTap(key);
        }
    });

    ws.on('close', () => console.log('Cliente desconectado'));
});
