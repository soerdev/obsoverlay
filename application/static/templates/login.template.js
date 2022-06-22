import { Template } from '../lib/template.class.js';


export class LoginTemplate extends Template {
  constructor() {
    super('message-container');
    this.html(`
        <a href="#">Login</a>
    `);
  }
}
