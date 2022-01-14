import { Metacom } from './metacom.js';
import { ChatComponent } from './lib/chat.component.js';
import { LowerThirdComponent } from './lib/lowers.component.js';
import { ToolbarComponent } from './lib/toolbar.component.js';
import { OBS_ROOM, CHAT_ROOM, SYSTEM_ROOM, LOWERS_ROOM } from './consts.js';
import { ScreenComponent } from './lib/screen.component.js';

class Application {
  constructor() {
    const protocol = location.protocol === 'http:' ? 'ws' : 'wss';
    this.tabs = {};
    this.screen = new ScreenComponent();
    this.initTabs();
    this.metacom = Metacom.create(`${protocol}://${location.host}/api`);
  }

  startBus() {
    this.chat.on('message',
      (comment) => {
        const token = localStorage.getItem('token');
        api.bus.send({ room: OBS_ROOM, message: { comment }, token });
      });

    api.bus.subscribe({ room: OBS_ROOM });
    api.bus.subscribe({ room: CHAT_ROOM });
    api.bus.subscribe({ room: SYSTEM_ROOM });
    api.bus.subscribe({ room: LOWERS_ROOM });
    api.bus.on('message', (data) => {
      switch (data.room) {

      case OBS_ROOM:
        this.screen.obsComment(data);
        break;

      case CHAT_ROOM:
        this.chat.addMessage(data);
        break;

      case SYSTEM_ROOM:
        console.log('OBS Ping');
        break;
      case LOWERS_ROOM:
        this.screen.lowerThird(
          data.message.id,
          data.message.title,
          data.message.subtitle);
        break;
      }
    });
  }

  activateTab(activeTabName) {
    for (const tabName in this.tabs) {
      if (tabName !== activeTabName) {
        this.tabs[tabName].template.deactivate();
      }
    }
    this.tabs[activeTabName].template.activate();
    this.toolbar.activateButton(activeTabName);
  }

  initTabs() {
    this.tabs.chat = this.chat = new ChatComponent();
    this.tabs.lowerThird = this.lowerThird = new LowerThirdComponent();

    const toolbar = this.toolbar = new ToolbarComponent([
      { id: 'chat', 'title': 'Chat' },
      { id: 'lowerThird', 'title': 'Lower Thirds' },
    ]);

    toolbar.template.appendTo('toolbar');
    toolbar.on('message', (id) => {
      this.activateTab(id);
    });

    this.activateTab('chat');
  }

  send(data) {
    const token = localStorage.getItem('token');
    data.token = token;
    api.bus.send(data);
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
        token
      });

    }
  } catch (e) {
    alert('Access forbiden');
    console.error('Access forbiden', e.message);
  }

});
