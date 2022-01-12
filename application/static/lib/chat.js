import { EventEmitter } from '/events.js';

export class Chat extends EventEmitter {

  constructor() {
    super();
    this.container =
      document.getElementsByClassName('side-panel')[0] || document.body;

    this.template = document.createElement('div');
    this.template.className = 'chat';
    this.container.append(this.template);
  }

  addMessage(data) {
    const messageTpl = document.createElement('div');
    messageTpl.className = 'message-container';
    messageTpl.innerHTML = `<div class="message">
                              <div class="comment">${data.message.comment}</div>
                            </div>`;
    messageTpl.onclick = () => this.emit('message', data.message.comment);
    this.template.append(messageTpl);
  }
}
