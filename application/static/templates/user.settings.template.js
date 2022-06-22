import { Template } from '../lib/template.class.js';


export class UserSettingsTemplate extends Template {
  constructor(user) {
    super('message-container');
    this.html(`
        Вы вошли в систему ${user.email} , теперь вы можете отправлять сообщения
        <input value="${user.token}" />
    `);
  }
}
