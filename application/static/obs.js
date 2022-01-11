import { Metacom } from './metacom.js';
import { Comment } from './lib/comment.js';
import { OBS_ROOM, SYSTEM_ROOM, LOWERS_ROOM } from './consts.js';
import { LowerThird } from './lib/lowers.js';

class Application {

  constructor() {
    const protocol = location.protocol === 'http:' ? 'ws' : 'wss';
    this.metacom = Metacom.create(`${protocol}://${location.host}/api`);

    this.comment = new Comment();
    this.lowerThird = new LowerThird();
  }

  startBus() {
    api.bus.subscribe({ room: OBS_ROOM });
    api.bus.subscribe({ room: LOWERS_ROOM });
    api.bus.on('message', (data) => {
      switch (data.room) {
      case OBS_ROOM:
        this.comment.displayComment(data);
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

  await application.metacom.load('bus');
  application.startBus();

  if (window.obsstudio) {
    application.comment.displayComment('OBS is Running');
  } else {
    alert('This is page should be running under OBS');
    window.location.href = '/';
  }

});
