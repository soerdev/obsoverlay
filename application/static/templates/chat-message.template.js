import { Template } from '../lib/template.class.js';


export class ChatMessageTemplate extends Template {
  constructor(comment, author) {
    super('message-container');
    const authorTemplate = author ? `<div>${author}</div>` : '';
    this.html(`<div class="message">
                    ${authorTemplate}
                    <div class="comment">${comment}</div>
            </div>
    `);
  }
}
