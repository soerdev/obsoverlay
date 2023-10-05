import { Button } from '../templates/button.template.js';
import { ChatMessageTemplate } from '../templates/chat-message.template.js';
import { Component } from './component.class.js';

export class ChatComponent extends Component {

  constructor() {
    super('chat');

    this.initContent();
    this.loadParams();
    this.initAutoUpdate();

    this.template.appendTo('side-panel');
  }

  initContent() {
    this.liveChatInfo = document.createElement('div');
    this.template.tpl.appendChild(this.liveChatInfo);
    /*    const in1 = document.createElement('input');
    const in2 = document.createElement('input');
    this.in1 = in1;
    this.in2 = in2;

    this.template.tpl.append(in1);
    this.template.tpl.append(in2);
    (new Button('Сохранить', () => {
          this.saveParams(in1.value, in2.value);
    })).appendTo(this.template);*/
  }

  initAutoUpdate() {
    setInterval(() => this.syncMessages(), 5000);
  }

  addMessage(data) {
    const message = new ChatMessageTemplate(data.comment, data.author);
    message.action(() => this.emit('message', data));
    message.appendTo(this.template.tpl);
  }

  loadParams() {
    const liveChatId = localStorage.getItem('liveChatId') ?? '';
    const key = localStorage.getItem('key') ?? '';
    if( !liveChatId || !key) {
      this.liveChatInfo.innerHTML = 'Чат не подключен. <a href="/streams.html">Подключить</a>';
    } else {
      this.liveChatInfo.innerHTML = 'LiveChat <span style="color:orange">wait</span>';
    }

  }

  saveParams(liveChatId, key) {
    localStorage.setItem('liveChatId', liveChatId);
    localStorage.setItem('key', key);
  }
  async syncMessages() {
    const liveChatId = localStorage.getItem('liveChatId');
    const key = localStorage.getItem('key');

    if (key && liveChatId) {
      try {
        const messages = await application.chatService.loadChatInfo(liveChatId, key);

        this.liveChatInfo.innerHTML = 'LiveChat <span style="color: green;">Ok</span>';
        messages.forEach((data) => this.addMessage(data));
        return messages;
      } catch(e) {
        console.error(e);
        localStorage.removeItem('liveChatId');
      }
    }
    this.liveChatInfo.innerHTML = 'Чат не подключен. <a href="/streams.html">Подключить</a>';
    return [];
  }

}
