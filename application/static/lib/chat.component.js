import { ChatMessageTemplate } from '../templates/chat-message.template.js';
import { Component } from './component.class.js';

export class ChatComponent extends Component {

  constructor() {
    super('chat');
    this.template.appendTo('side-panel');
  }

  addMessage(data) {
    const message = new ChatMessageTemplate(data.message.comment);
    message.action(() => this.emit('message', data.message.comment));
    message.appendTo(this.template.tpl);
  }
}
