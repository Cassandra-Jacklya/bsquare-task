const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (socket) => {
  console.log('New client connected Server');

  socket.on('message', (message) => {
    console.log(`Received message: ${message}`);
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  socket.on('close', () => {
    wss.clients.forEach((client) => {
      client.readyState = WebSocket.CLOSED;
      client.send("User has left the chat");
    });
    console.log('Client disconnected');
    
  });
});
