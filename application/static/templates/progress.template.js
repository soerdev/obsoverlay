import { Template } from '../lib/template.class.js';



function colorByPercent(percent = 0) {
  switch (true) {
  case percent <= 5:
    return '#f63a0f';
  case percent <= 25:
    return '#f27011';
  case percent <= 50:
    return '#f2b01e';
  case percent <= 75:
    return '#f2d31b';
  default:
    return '#86e01e';
  }
}



export class ProgressBar extends Template {
  constructor(amount, min = 0, max = 10000) {
    let percent = 0;
    if (amount < min) {
      percent = 0;
    } else if (amount > max) {
      percent = 100;
    } else {
      percent = amount / ((max - min) / 100);
    }

    super('progress');
    this.html(`
        <div class="progress-bar" 
            style="width: ${percent}%;
            background-color: ${colorByPercent(percent)}">
        </div>
`);
  }
}
