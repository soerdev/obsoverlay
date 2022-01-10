import { Metacom } from './metacom.js';

class Application {
  constructor() {
    const protocol = location.protocol === 'http:' ? 'ws' : 'wss';
    this.metacom = Metacom.create(`${protocol}://${location.host}/api`);
  }

  startBus() {
    let timeoutId = null;

    api.bus.subscribe({ room: 'obs' });
    api.bus.on('message', (data) => {
      document.body.innerHTML = `<div class="message-body"><p>${data.message.comment}</p></div>`;
      if (timeoutId) {
        clearInterval(timeoutId);
      }
      timeoutId = setTimeout(() => (document.body.innerHTML = ''), 10000);
    });
  }
}

window.addEventListener('load', async () => {
  window.application = new Application();
  window.api = window.application.metacom.api;
  await application.metacom.load('auth', 'bus');

  try {
    const token = localStorage.getItem('token');
    const result = await api.auth.signin({ token });

    if (result.status === 'logged') {
      console.log('User logged in ', result.user);
      application.startBus();
      api.bus.send({
        room: 'obs',
        message: { comment: 'Welcome to Overlay' },
      });

    }
  } catch (e) {
    console.error('Access forbiden');
  }

});
