import { Button } from '../templates/button.template.js';
import { SidebarPanel } from './sidebar-panel.class.js';

const CLEAR_TIMEOUT_MS = 6000;


export class LowerThird extends SidebarPanel {

  constructor() {
    super({ screenClassName: 'animation', sidebarClassName: 'lowthirds-list' });
    this.timeoutId = null;
    this.initSidebarContent();
  }

  createTemplate(index, title, subtitle) {
    switch (index) {
    case '1':
      this.screenTemplate.tpl.innerHTML = `
            <div class="red">/</div>
                <div class="white light mask">
                    <div>${title}</div>
                </div>
                <div class="white light mask">
                    <div>${subtitle}</div>
                </div>
        `;
      this.screenTemplate.tpl.id = 'animation-1';
      break;
    case '2':
      this.screenTemplate.tpl.innerHTML = `
            <div class="red bold arimo mask">
                <div>${title}</div>
            </div>
            <div class="white light mask">
                <div>${subtitle}</div>
            </div>
        `;
      this.screenTemplate.tpl.id = 'animation-2';
      break;

    case '3':
      this.screenTemplate.tpl.innerHTML = `
            <div class="white light mask">
            <div>${title}</div>
            </div><div class="red bold arimo mask">
            <div>${subtitle}</div>
            </div>
            `;
      this.screenTemplate.tpl.id = 'animation-3';
      break;
    case '4':
      this.screenTemplate.tpl.innerHTML = `
      <div class="white bold arimo mask">
      <div>${title}</div>
    </div>
    <div class="mask"><div></div></div>
      `;
      this.screenTemplate.tpl.id = 'animation-4';
      break;

    default:
      this.screenTemplate.tpl.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <clipPath id="mask-bottom-right">
          <rect class="clip-path" x="70%" y="0" width="30%" height="100%"/>
        </clipPath>
        <clipPath id="mask-top">
          <rect class="clip-path" x="0" y="0" width="100%" height="100%"/>
        </clipPath>
        <clipPath id="mask-bottom-left">
          <rect class="clip-path" x="0" y="0" width="30%" height="100%"/>
        </clipPath>
      </defs>
      
      <line class="bottom-right" x1="70%" y1="100%" x2="100%" y2="100%"/>
      <line class="right" x1="100%" y1="0" x2="100%" y2="100%"/>
      <line class="top" x1="0" y1="0" x2="100%" y2="0"/>
      <line class="left" x1="0" y1="0" x2="0" y2="100%"/>
      <line class="bottom-left" x1="0" y1="100%" x2="30%" y2="100%"/>
    </svg>
    <div class="white bold arimo mask">
      <div>${title}</div>
    </div>
    <div class="white mask">
      <div>${subtitle}</div>
    </div>   
      `;
      this.screenTemplate.tpl.id = 'animation-5';
      break;
    }
    this.delayClear();
  }


  initSidebarContent() {
    const in1 = document.createElement('input');
    const in2 = document.createElement('input');
    this.sidebarTemplate.tpl.append(in1);
    this.sidebarTemplate.tpl.append(in2);

    ['1', '2', '3', '4', '5'].forEach((v) => {
      (new Button(`Вариант ${v}`, () => {
        application.send({
          room: 'lowers',
          message: { title: in1.value, subtitle: in2.value, id: v }
        });
      })).appendTo(this.sidebarTemplate.tpl);
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
