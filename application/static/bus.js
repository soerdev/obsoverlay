import { Metacom } from './metacom.js';

const OBS_ROOM = 'obs';
const CLEAR_TIMEOUT_MS = 10000;
class Application {
  constructor() {
    const protocol = location.protocol === 'http:' ? 'ws' : 'wss';
    this.metacom = Metacom.create(`${protocol}://${location.host}/api`);
  }

  startBus() {
    let timeoutId = null;

    api.bus.subscribe({ room: OBS_ROOM });
    api.bus.on('message', (data) => {
      document.body.innerHTML = `
        <div class="message-body">
          <p>
            ${data.message.comment}
          </p>
        </div>
      `;
      if (timeoutId) {
        clearInterval(timeoutId);
      }
      timeoutId = setTimeout(
        () => (document.body.innerHTML = ''),
        CLEAR_TIMEOUT_MS
      );
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
        room: OBS_ROOM,
        message: { comment: 'Welcome to Overlay' },
      });

    }
  } catch (e) {
    console.error('Access forbiden');
  }

});
