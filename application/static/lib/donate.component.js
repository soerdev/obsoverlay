import { ChatMessageTemplate } from '../templates/chat-message.template.js';
import { Component } from './component.class.js';
import { Button } from '../templates/button.template.js';

export class DonateMessageComponent extends Component {

  constructor() {
    super('chat');
    this.initContent();
    this.template.appendTo('side-panel');
  }
  initContent() {
    const in1 = document.createElement('input');
    this.template.tpl.append(in1);


    (new Button('Установить', () => {
      application.send({
        room: 'donate',
        message: { command: 'reset', value: in1.value }
      });
    })).appendTo(this.template);
  }

  addMessage(donate) {
    if (donate.comment) {
      const messageText = [
        `${donate.donater}`,
        `${donate.amount} ₽`,
        donate.comment].join(' ');

      const message = new ChatMessageTemplate(
        messageText
      );
      message.action(() => this.emit('message', messageText));
      message.appendTo(this.template.tpl);
    }
  }

  async syncMessages() {
    const donates = await application.donateService.loadDonateInfo();
    donates.forEach((donate) => this.addMessage(donate));
    application.donateService.resetByDonatesList();
    return donates;
  }

}
