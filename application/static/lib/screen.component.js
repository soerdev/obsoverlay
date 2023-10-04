import { ChatMessageTemplate } from '../templates/chat-message.template.js';
import { DonateMessageTemplate, ReciveDonate1, TotalDonate1 } from '../templates/donate.template.js';
import { LowerThird1,
  LowerThird2,
  LowerThird3,
  LowerThird4,
  LowerThird5 } from '../templates/lower-thirds.template.js';
import { Component } from './component.class.js';
import { Template } from './template.class.js';

const CLEAR_TIMEOUT_MS = 14000;
export class ScreenComponent extends Component {

  constructor() {
    super('fullscreen');
    this.reciveDonateTemplate = new Template('donate-recive');
    this.donateProgress = new Template('donate-progress');
    this.timeoutId = null;

    this.template.appendTo('main-content');
    this.reciveDonateTemplate.appendTo('main-content');
    this.donateProgress.appendTo('main-content');
    this.donate({}, 0);
  }

  lowerThird(index, title, subtitle) {
    this.template.html('');
    switch (index) {
    case '1':
      (new LowerThird1(title, subtitle)).appendTo(this.template);
      break;
    case '2':
      (new LowerThird2(title, subtitle)).appendTo(this.template);
      break;

    case '3':
      (new LowerThird3(title, subtitle)).appendTo(this.template);
      break;
    case '4':
      (new LowerThird4(title)).appendTo(this.template);
      break;

    default:
      (new LowerThird5(title, subtitle)).appendTo(this.template);
      break;
    }
    this.delayClear();
  }

  donate(amount, totalDonates) {
    this.reciveDonateTemplate.html('');
    this.donateProgress.html('');

    if (amount > 0) {
      (new ReciveDonate1(
        amount,
        '')).appendTo(this.reciveDonateTemplate);
    }

    if (totalDonates >= 0) {
      (new TotalDonate1(
        totalDonates,
      )).appendTo(this.donateProgress);
    }
  }

  obsComment(data) {
    this.template.html(``);
    const wrapper = new Template('message-body')
    const comment =  new ChatMessageTemplate(data.message.comment, data.message.author);
    comment.appendTo(wrapper);
    wrapper.appendTo(this.template);
    this.delayClear();
  }


  obsDonate(data) {
    this.template.html(``);
    const wrapper = new Template('message-body')
    const donate =  new DonateMessageTemplate(data.message.comment, data.message.donater, data.message.amount);
    donate.appendTo(wrapper);
    wrapper.appendTo(this.template);
    this.delayClear();
  }


  delayClear()  {
    if (this.timeoutId) {
      clearInterval(this.timeoutId);
    }
    this.timeoutId = setTimeout(
      () => (this.template.html('')),
      CLEAR_TIMEOUT_MS
    );
  }
}
