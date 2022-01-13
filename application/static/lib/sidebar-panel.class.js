import { EventEmitter } from '/events.js';
import { Template } from './template.class.js';

export class SidebarPanel extends EventEmitter {


  constructor({ screenClassName, sidebarClassName }) {
    super();
    this.timeoutId = null;

    this.screenTemplate = new Template(screenClassName);
    this.sidebarTemplate = new Template(sidebarClassName);


    this.screenTemplate.appendTo(this.getTarget('main-content'));
    this.sidebarTemplate.appendTo(this.getTarget('side-panel'));
    this.deactivate();
  }

  getTarget(targetClassName) {
    return document.getElementsByClassName(targetClassName)[0] ||
           document.body;

  }

  activate() {
    this.sidebarTemplate.activate();
  }
  deactivate() {
    this.sidebarTemplate.deactivate();
  }
}
