const socket = new WebSocket('ws://localhost:8080');
const chatWindow = document.getElementById('chat-window');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');

socket.addEventListener('open', () => {
  socket.send('New user joined the chat');
});

// socket.addEventListener('close', () => {
//   console.log("hi");
//   socket.send('User left the chat');
// });

socket.addEventListener('message', (event) => {
  if (event.data instanceof Blob) {
    event.data.text().then(txt => 
      chatWindow.innerHTML += `<p>${txt}</p>`
    );
  }
  else {
    chatWindow.innerHTML += `<p>${event.data}</p>` ;
  }
});

messageForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const message = messageInput.value;
  socket.send(message);
  messageInput.value = '';
});
