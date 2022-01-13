import { EventEmitter } from '/events.js';

const ACTIVE_CLASS = 'active';
const INACTIVE_CLASS = 'inactive';
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

  changeActiveClass(newClassName) {
    this.template.className = [
      ...this.template.className
        .split(' ')
        .filter((c) => c !== ACTIVE_CLASS && c !== INACTIVE_CLASS),
      newClassName]
      .join(' ');

  }
  activate() {
    this.changeActiveClass(ACTIVE_CLASS);
  }
  deactivate() {
    this.changeActiveClass(INACTIVE_CLASS);
  }
}
