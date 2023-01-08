import { Template } from '../lib/template.class.js';
import { ProgressBar } from './progress.template.js';


export class ReciveDonate1 extends Template {
  constructor(amount) {
    super('donate_message');
    this.html(`
           
            <h1 class="jt">
  <span class="jt__row">
    <span class="jt__text">+${amount} ₽</span>
  </span>
  <span class="jt__row jt__row--sibling" aria-hidden="true">
    <span class="jt__text">+${amount} ₽</span>
  </span>
  <span class="jt__row jt__row--sibling" aria-hidden="true">
    <span class="jt__text">+${amount} ₽</span>
  </span>
  <span class="jt__row jt__row--sibling" aria-hidden="true">
    <span class="jt__text">+${amount} ₽</span>
  </span>
</h1>
    `);
  }
}


export class TotalDonate1 extends Template {
  constructor(donateSum) {
    super('container');
    const progressBar = new ProgressBar(donateSum, 0, 10000);
    this.html(`
              <span>${donateSum} ₽ из 10 000 ₽</span>
      `);
    progressBar.appendTo(this.tpl);
  }
}

export class DonateMessageTemplate extends Template {
  constructor(comment, donater, amount) {
    super('message-container');
    this.html(`<div class="message">
    		    <div>${donater} (${amount}₽)</div>
                    <div class="comment">${comment}</div>
                </div>
    `);
  }
}
