import { Button } from '../templates/button.template.js';
import { Component } from './component.class.js';


export class ToolbarComponent extends Component {

  constructor(buttonsInfo) {
    super('toolbar-container');
    this.initContent(buttonsInfo);
    this.template.activate();
  }

  initContent(buttonsInfo) {
    buttonsInfo.forEach((buttonInfo) => {
      const button = new Button(buttonInfo.title);
      button.action(() => this.emit('message', buttonInfo.id));
      button.appendTo(this.template);
    });
  }
}
