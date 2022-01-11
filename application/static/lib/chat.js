import { EventEmitter } from '/events.js';

export class Chat extends EventEmitter {

  constructor() {
    super();
    this.template = document.createElement('div');
    this.template.className = 'chat';
    document.body.append(this.template);
  }

  addMessage(data) {
    const messageTpl = document.createElement('div');
    messageTpl.className = 'message';
    messageTpl.innerHTML = data.message.comment;
    messageTpl.onclick = () => this.emit('message', data.message.comment);
    this.template.append(messageTpl);
  }
}
