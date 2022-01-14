import { Button } from '../templates/button.template.js';
import { Component } from './component.class.js';


export class ToolbarComponent extends Component {

  constructor(buttonsInfo) {
    super('toolbar-container');
    this.initContent(buttonsInfo);
  }

  initContent(buttonsInfo) {
    this.buttons = {};
    buttonsInfo.forEach((buttonInfo) => {
      const button = new Button(buttonInfo.title);
      this.buttons[buttonInfo.id] = button;
      button.action(() => {
        this.emit('message', buttonInfo.id);
      });
      button.appendTo(this.template);
    });
  }


  activateButton(id) {
    Object.keys(this.buttons).forEach(
      (buttonId) => {
        if (id !== buttonId) {
          this.buttons[buttonId].removeClass(['checked']);
        }
      }
    );
    this.buttons[id].setClass('checked');
  }
}
