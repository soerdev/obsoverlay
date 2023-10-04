import { ChatComponent } from './lib/chat.component.js';
import { LowerThirdComponent } from './lib/lowers.component.js';
import { ToolbarComponent } from './lib/toolbar.component.js';
import {
  OBS_ROOM,
  CHAT_ROOM, SYSTEM_ROOM, DONATE_ROOM } from './consts.js';
import { LoginComponent } from './lib/login.component.js';
import { DonateMessageComponent } from './lib/donate.component.js';
import { Application } from './core/application.js';

class AdminApplication extends Application  {
  constructor(token) {
    super();
    this.token = token;
    this.tabs = {};
    this.initTabs();
  }

  startBus() {
    super.startBus();
    this.chat.on('message',
      (data) => {
        const token = localStorage.getItem('token');
        api.bus.send({ room: OBS_ROOM, message: data, token });
      });

    this.donateMessages.on('message',
      (data) => {
        this.send({ room: OBS_ROOM, message: data });
      });


    api.bus.subscribe({ room: CHAT_ROOM });
    api.bus.subscribe({ room: SYSTEM_ROOM });

    api.bus.on('message', (data) => {
      switch (data.room) {
      case CHAT_ROOM:
        this.chat.addMessage(data);
        break;

      case DONATE_ROOM:
        this.donateMessages.addMessage(data.message);
        break;

      case SYSTEM_ROOM:
        console.log('OBS Ping');
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

    this.tabs.donateMessages =
    this.donateMessages =  new DonateMessageComponent();

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
      { id: 'donateMessages', 'title': 'Donates' },
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
  window.application = new AdminApplication(token);
  window.api = window.application.metacom.api;
  await application.metacom.load('auth', 'bus');

  try {

    const result = await api.auth.signin({ token });

    if (result.status === 'logged') {
      console.log('User logged in ', result.user);
      application.login = new LoginComponent({ ...result.user, token });
      application.startBus();
      application.donateMessages.syncMessages();
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
