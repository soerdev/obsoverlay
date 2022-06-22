import { LoginTemplate } from '../templates/login.template.js';
import { UserSettingsTemplate } from '../templates/user.settings.template.js';
import { Component } from './component.class.js';

const MEDIUM_TIMEOUT_INTERVAL = 1000;

export class LoginComponent extends Component {

  constructor(user) {
    super('login');
    this.user = user;
    this.jwt = '';
    this.template.appendTo('side-panel');
    this.init();
  }

  init() {
    const login = this.user ? new UserSettingsTemplate(this.user) :
      new LoginTemplate();
    login.appendTo(this.template.tpl);
    login.action(() => {
      this.emit('oauth');
    });
  }
  oAuthLogin(url) {
    this.externalWindow = this.popupCenter({
      url,
      title: '',
      w: 500,
      h: 500
    });

    const uid = setInterval(() => {
      try {
        const href = this.externalWindow?.['location']?.['href'] + '';
        console.log(href);
        if (href) {
          this.jwt = href.split('jwt=')[1];
          if (this.jwt) {
            localStorage.setItem('token', this.jwt);
            if (this.externalWindow) {
              this.externalWindow.close();
            }
            clearInterval(uid);
            this.redirectToHome();
          }
        }
      } catch (e) {
        console.log('Something goes wrong.');
      }
    }, MEDIUM_TIMEOUT_INTERVAL);
  }

  popupCenter(params) {
    const { url, title, w, h } = params;

    const dualScreenLeft =
    window.screenLeft !==  undefined ?
      window.screenLeft : window.screenX;
    const dualScreenTop =
    window.screenTop !==  undefined   ?
      window.screenTop  : window.screenY;

    const width = window.innerWidth ?
      window.innerWidth :
      document.documentElement.clientWidth ?
        document.documentElement.clientWidth : screen.width;
    const height = window.innerHeight ?
      window.innerHeight :
      document.documentElement.clientHeight ?
        document.documentElement.clientHeight : screen.height;

    const systemZoom = width / window.screen.availWidth;
    const left = (width - w) / 2 / systemZoom + dualScreenLeft;
    const top = (height - h) / 2 / systemZoom + dualScreenTop;
    const newWindow = window.open(url, title,
      `
      scrollbars=yes,
      width=${w / systemZoom},
      height=${h / systemZoom},
      top=${top},
      left=${left}
      `
    );


    newWindow?.focus();

    return newWindow;
  }

  redirectToHome() {
    document.location.href = '/';
  }
}
