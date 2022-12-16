import { Metacom } from './metacom.js';
import { ChatComponent } from './lib/chat.component.js';
import { LowerThirdComponent } from './lib/lowers.component.js';
import { ToolbarComponent } from './lib/toolbar.component.js';
import {
  OBS_ROOM,
  CHAT_ROOM, SYSTEM_ROOM, LOWERS_ROOM, DONATE_ROOM } from './consts.js';
import { ScreenComponent } from './lib/screen.component.js';
import { LoginComponent } from './lib/login.component.js';
import { DonateComponent } from './lib/donate.component.js';

class Application {
  constructor(token) {
    this.token = token;
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

    this.donate.on('message',
      (comment) => {
        const token = localStorage.getItem('token');
        api.bus.send({ room: OBS_ROOM, message: { comment }, token });
      });

    api.bus.subscribe({ room: OBS_ROOM });
    api.bus.subscribe({ room: CHAT_ROOM });
    api.bus.subscribe({ room: SYSTEM_ROOM });
    api.bus.subscribe({ room: DONATE_ROOM });
    api.bus.subscribe({ room: LOWERS_ROOM });
    api.bus.on('message', (data) => {
      switch (data.room) {

      case OBS_ROOM:
        this.screen.obsComment(data);
        break;

      case CHAT_ROOM:
        this.chat.addMessage(data);
        break;

      case DONATE_ROOM:
        this.donate.reciveDonate(data.message);
        this.screen.donate(data, this.donate.getTotalDonates());
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
    this.tabs.donate = this.donate =  new DonateComponent();
    this.tabs.lowerThird = this.lowerThird = new LowerThirdComponent();
    this.tabs.login = this.login = new LoginComponent();

    this.login.on('oauth', async () => {
      const url = await api.auth.google();
      this.login.oAuthLogin(url);
    });

    const toolbar = this.toolbar = new ToolbarComponent([
      { id: 'login', 'title': 'Login' },
      { id: 'chat', 'title': 'Chat' },
      { id: 'lowerThird', 'title': 'Lower Thirds' },
      { id: 'donate', 'title': 'Donates' },
    ]);

    toolbar.template.appendTo('toolbar');
    toolbar.on('message', (id) => {
      this.activateTab(id);
    });

    this.activateTab('login');
  }

  send(data) {
    const token = localStorage.getItem('token');
    data.token = token;
    api.bus.send(data);
  }
}

window.addEventListener('load', async () => {
  const token = localStorage.getItem('token');
  window.application = new Application(token);
  window.api = window.application.metacom.api;
  await application.metacom.load('auth', 'bus');

  try {

    const result = await api.auth.signin({ token });

    if (result.status === 'logged') {
      console.log('User logged in ', result.user);
      application.login = new LoginComponent({ ...result.user, token });
      application.startBus();
      api.bus.send({
        room: OBS_ROOM,
        message: { comment: 'Система управления OBS запущена' },
        token
      });

    }
  } catch (e) {
    //    const url = await api.auth.google();
    //    application.login.oAuthLogin(url);
  }

});
