import { Template } from '../lib/template.class.js';


export class ChatMessageTemplate extends Template {
  constructor(comment) {
    super('message-container');
    this.html(`<div class="message">
                    <div class="comment">${comment}</div>
                </div>
    `);
  }
}
