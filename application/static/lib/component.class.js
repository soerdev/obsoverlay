import { EventEmitter } from '../core/events.js';
import { Template } from './template.class.js';

export class Component extends EventEmitter {


  constructor(className) {
    super();
    this.template = new Template(className);
  }
}
