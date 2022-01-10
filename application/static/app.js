import { Metacom } from './metacom.js';
import { Comment } from './lib/comment.js';
import { Chat } from './lib/chat.js';
import { LowerThird } from './lib/lowers.js';
import { OBS_ROOM, CHAT_ROOM, SYSTEM_ROOM, LOWERS_ROOM } from './consts.js';



class Application {
  constructor() {
    const protocol = location.protocol === 'http:' ? 'ws' : 'wss';
    this.comment = new Comment();
    this.chat = new Chat();
    this.lowerThird = new LowerThird();
    this.metacom = Metacom.create(`${protocol}://${location.host}/api`);
  }

  startBus() {
    this.chat.on('message',
      (comment) => api.bus.send({ room: OBS_ROOM, message: { comment } }));

    api.bus.subscribe({ room: OBS_ROOM });
    api.bus.subscribe({ room: CHAT_ROOM });
    api.bus.subscribe({ room: SYSTEM_ROOM });
    api.bus.subscribe({ room: LOWERS_ROOM });
    api.bus.on('message', (data) => {
      switch (data.room) {
      case OBS_ROOM:
        this.comment.displayComment(data.message.comment);
        break;
      case CHAT_ROOM:
        this.chat.addMessage(data.message.comment);
        break;

      case SYSTEM_ROOM:
        console.log('OBS Ping');
        break;
      case LOWERS_ROOM:
        this.lowerThird.createTemplate(
          data.message.id,
          data.message.title,
          data.message.subtitle);
        break;
      }
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
        message: { comment: 'Система управления OBS' },
      });

    }
  } catch (e) {
    alert('Access forbiden');
    console.error('Access forbiden');
  }

});
