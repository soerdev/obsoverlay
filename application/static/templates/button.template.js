import { Template } from '../lib/template.class.js';

export class Button extends Template {
  constructor(title, callback) {
    super('button');
    this.html(title);
    if (callback) {
      this.action(callback);
    }
  }
}
