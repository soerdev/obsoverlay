import { EventEmitter } from '/events.js';

export class Chat extends EventEmitter {

  constructor() {
    super();
    this.template = document.createElement('div');
    this.template.className = 'chat';
    document.body.append(this.template);
  }

  addMessage(message) {
    const messageTpl = document.createElement('div');
    messageTpl.className = 'message';
    messageTpl.innerHTML = message;
    messageTpl.onclick = () => this.emit('message', message);
    this.template.append(messageTpl);
  }
}
