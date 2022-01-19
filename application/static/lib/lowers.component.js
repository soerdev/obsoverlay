import { Button } from '../templates/button.template.js';
import { Component } from './component.class.js';

export class LowerThirdComponent extends Component {

  constructor() {
    super('lowthirds-list');
    this.initContent();
    this.template.appendTo('side-panel');
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
}
