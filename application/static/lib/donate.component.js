import { ChatMessageTemplate } from '../templates/chat-message.template.js';
import { Component } from './component.class.js';
import { Button } from '../templates/button.template.js';

export class DonateComponent extends Component {

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
  reciveDonate(donate) {
    if (donate.command) {
      this.execCommand(donate.command, donate);
    }

    if (donate.comment) {
      const message = new ChatMessageTemplate(donate.comment);
      message.action(() => this.emit('message', donate.comment));
      message.appendTo(this.template.tpl);
    }

    if (donate.amount) {
      this.addTotalDonates(donate.amount);
    }
  }

  execCommand(command, params) {
    switch (command) {
    case 'reset':
      this.setTotalDonates(params.value || 0);
    }
  }

  getTotalDonates() {
    return parseInt(localStorage.getItem('donate-amount'), 10) || 0;
  }

  addTotalDonates(amount) {
    let donateSum = this.getTotalDonates();
    donateSum += parseInt(amount, 10);
    this.setTotalDonates(donateSum);
    return donateSum;
  }

  setTotalDonates(amount) {
    localStorage.setItem('donate-amount', amount);
  }


}
