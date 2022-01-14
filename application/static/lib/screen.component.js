import { LowerThird1,
  LowerThird2,
  LowerThird3,
  LowerThird4,
  LowerThird5 } from '../templates/lower-thirds.template.js';
import { Component } from './component.class.js';

const CLEAR_TIMEOUT_MS = 6000;
export class ScreenComponent extends Component {

  constructor() {
    super('chat');
    this.timeoutId = null;

    this.template.appendTo('main-content');
    this.template.activate();
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

  obsComment(data) {
    this.template.html(`
    <div class="message-body">
      <p>
        ${data.message.comment}
      </p>
    </div>
    `);
    this.delayClear();
  }

  delayClear()  {
    if (this.timeoutId) {
      clearInterval(this.timeoutId);
    }
    this.timeoutId = setTimeout(
      () => (this.template.innerHTML = ''),
      CLEAR_TIMEOUT_MS
    );
  }
}
