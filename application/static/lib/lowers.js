import { Button } from '../templates/button.template.js';
import { LowerThird1,
  LowerThird2,
  LowerThird3,
  LowerThird4,
  LowerThird5 } from '../templates/lower-thirds.template.js';
import { Component } from './component.class.js';

const CLEAR_TIMEOUT_MS = 6000;

export class LowerThird extends Component {

  constructor() {
    super('lowthirds-list');
    this.initContent();
    this.template.appendTo('side-panel');
  }

  createTemplate(index, title, subtitle) {
    this.screenTemplate.html('');
    switch (index) {
    case '1':
      (new LowerThird1(title, subtitle)).appendTo(this.screenTemplate.tpl);
      break;
    case '2':
      (new LowerThird2(title, subtitle)).appendTo(this.screenTemplate.tpl);
      break;

    case '3':
      (new LowerThird3(title, subtitle)).appendTo(this.screenTemplate.tpl);
      break;
    case '4':
      (new LowerThird4(title)).appendTo(this.screenTemplate.tpl);
      break;

    default:
      (new LowerThird5(title, subtitle)).appendTo(this.screenTemplate.tpl);
      break;
    }
    this.delayClear();
  }


  initContent() {
    const in1 = document.createElement('input');
    const in2 = document.createElement('input');
    this.template.tpl.append(in1);
    this.template.tpl.append(in2);

    [ 'Вариант 1',
      'Вариант 2',
      'Вариант 3',
      'Вариант 4',
      'Вариант 5'].forEach((v, k) => {
      (new Button(v, () => {
        application.send({
          room: 'lowers',
          message: { title: in1.value, subtitle: in2.value, id: (k + 1) + '' }
        });
      })).appendTo(this.template);
    });
  }

  delayClear()  {
    if (this.timeoutId) {
      clearInterval(this.timeoutId);
    }
    this.timeoutId = setTimeout(
      () => (this.screenTemplate.tpl.innerHTML = ''),
      CLEAR_TIMEOUT_MS
    );
  }


}
