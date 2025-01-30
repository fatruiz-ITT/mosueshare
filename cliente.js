// Archivo: cliente.js
const ws = new WebSocket('ws://192.168.0.1:8080');

document.addEventListener('mousemove', (event) => {
    const data = `Mouse: (${event.clientX}, ${event.clientY})`;
    ws.send(data);
});

document.addEventListener('keydown', (event) => {
    const data = `Tecla presionada: ${event.key}`;
    ws.send(data);
});

ws.onmessage = (event) => {
    const log = document.getElementById('log');
    if (log) {
        const li = document.createElement('li');
        li.textContent = event.data;
        log.appendChild(li);
    }
};
