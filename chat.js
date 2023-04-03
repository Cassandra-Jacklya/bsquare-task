const socket = new WebSocket('ws://localhost:8080');
const chatWindow = document.getElementById('chat-window');

socket.addEventListener('open', () => {
  socket.send('New user joined the chat');
});

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

socket.addEventListener('close', () => {
  console.log("here");
  socket.send('User has left the chat');
});


const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');

messageForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const message = messageInput.value;
  socket.send(message);
  messageInput.value = '';
});
