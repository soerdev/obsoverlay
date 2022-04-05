import { Template } from '../lib/template.class.js';


export class LowerThird1 extends Template {
  constructor(title, subtitle) {
    super('animation');
    this.html(`
    <div class="red">/</div>
        <div class="white light mask">
            <div>${title}</div>
        </div>
        <div class="white light mask">
            <div>${subtitle}</div>
        </div>
`);
    this.tpl.id = 'animation-1';
  }
}

export class LowerThird2 extends Template {
  constructor(title, subtitle) {
    super('animation');
    this.html(`
    <div class="red bold mask">
        <div>${title}</div>
    </div>
    <div class="white light mask">
        <div>${subtitle}</div>
    </div>
`);
    this.tpl.id = 'animation-2';
  }
}

export class LowerThird3 extends Template {
  constructor(title, subtitle) {
    super('animation');
    this.html(`
    <div class="white light mask">
    <div>${title}</div>
    </div><div class="red bold mask">
    <div>${subtitle}</div>
    </div>
    `);
    this.tpl.id = 'animation-3';
  }
}

export class LowerThird4 extends Template {
  constructor(title) {
    super('animation');
    this.html(`
    <div class="white bold mask">
    <div>${title}</div>
  </div>
  <div class="mask"><div></div></div>
    `);
    this.tpl.id = 'animation-4';
  }
}

export class LowerThird5 extends Template {
  constructor(title, subtitle) {
    super('animation');
    this.html(`
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
        <div class="white bold mask">
            <div>${title}</div>
        </div>
        <div class="white mask">
            <div>${subtitle}</div>
        </div>   
    `);
    this.tpl.id = 'animation-5';
  }

}
