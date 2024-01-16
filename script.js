const currentUsername = localStorage.getItem('utenteCorrente');

const container = document.createElement('div');
container.id = 'contenitore';

const loginSection = document.createElement('div');
loginSection.id = 'sezioneAccesso';

const usernameLabel = document.createElement('label');
usernameLabel.textContent = 'Username:';
usernameLabel.for = 'username';

const usernameInput = document.createElement('input');
usernameInput.type = 'text';
usernameInput.id = 'username';

const loginButton = document.createElement('button');
loginButton.textContent = 'Accedi';
loginButton.onclick = accedi;

loginSection.appendChild(usernameLabel);
loginSection.appendChild(usernameInput);
loginSection.appendChild(loginButton);

const chatSection = document.createElement('div');
chatSection.id = 'sezioneChat';
chatSection.style.display = 'none';

const chatTitle = document.createElement('h1');
chatTitle.textContent = 'Chat Room';

const logoutButton = document.createElement('button');
logoutButton.textContent = 'Esci';
logoutButton.onclick = logout;

const messageLabel = document.createElement('label');
messageLabel.textContent = 'Messaggio:';
messageLabel.for = 'messaggio';

const messageInput = document.createElement('input');
messageInput.type = 'text';
messageInput.id = 'messaggio';

const sendButton = document.createElement('button');
sendButton.textContent = 'Invia';
sendButton.onclick = inviaMessaggio;

const showAllLabel = document.createElement('label');
showAllLabel.textContent = 'Mostra tutti i messaggi';

const showAllCheckbox = document.createElement('input');
showAllCheckbox.type = 'checkbox';
showAllCheckbox.id = 'mostraTutti';
showAllCheckbox.onchange = toggleMostraTutti;

const chatList = document.createElement('ul');
chatList.id = 'listaChat';

chatSection.appendChild(chatTitle);
chatSection.appendChild(logoutButton);
chatSection.appendChild(messageLabel);
chatSection.appendChild(messageInput);
chatSection.appendChild(sendButton);
chatSection.appendChild(showAllLabel);
chatSection.appendChild(showAllCheckbox);
chatSection.appendChild(chatList);

container.appendChild(loginSection);
container.appendChild(chatSection);

document.body.appendChild(container);

function accedi() {
  const username = document.getElementById('username').value;
  localStorage.setItem('utenteCorrente', username);

  loginSection.style.display = 'none';
  chatSection.style.display = 'block';

  aggiornaListaChat();
}

function inviaMessaggio() {
  const messaggio = document.getElementById('messaggio').value;
  const timestamp = new Date().toLocaleTimeString();

  const elementoChat = {
    username: currentUsername,
    messaggio: messaggio,
    timestamp: timestamp
  };

  let cronologiaChat = JSON.parse(localStorage.getItem('cronologiaChat')) || [];
  cronologiaChat.push(elementoChat);
  localStorage.setItem('cronologiaChat', JSON.stringify(cronologiaChat));

  aggiornaListaChat();
}

function aggiornaListaChat() {
  const cronologiaChat = JSON.parse(localStorage.getItem('cronologiaChat')) || [];
  const mostraTutti = document.getElementById('mostraTutti').checked;

  const listaChat = document.getElementById('listaChat');
  listaChat.innerHTML = '';

  for (const elemento of cronologiaChat) {
    if (mostraTutti || elemento.username === currentUsername) {
      const li = document.createElement('li');
      li.textContent = `${elemento.timestamp} - ${elemento.username}: ${elemento.messaggio}`;
      listaChat.appendChild(li);
    }
  }
}

function toggleMostraTutti() {
  aggiornaListaChat();
}

function logout() {
  localStorage.removeItem('utenteCorrente');
  loginSection.style.display = 'block';
  chatSection.style.display = 'none';
}

if (currentUsername) {
  accedi();
}
