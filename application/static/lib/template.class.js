export const ACTIVE_CLASS = 'active';
export const INACTIVE_CLASS = 'inactive';

export class Template {
  constructor(srcClassName, container = 'div') {
    this.tpl = this.initTemplate(srcClassName, container);
  }

  initTemplate(srcClassName, container = 'div') {
    const tmpTpl = document.createElement(container);
    tmpTpl.className = srcClassName;
    tmpTpl.innerHTML = '';
    return tmpTpl;
  }

  html(content) {
    this.tpl.innerHTML = content;
  }

  appendTo(target, defaultTarget = document.body) {
    if (typeof target === 'string') {
      this.getTarget(target, defaultTarget).append(this.tpl);
    }  else if (target.tpl) {
      target.tpl.append(this.tpl);
    } else if (target.append) {
      target.append(this.tpl);
    }
  }

  getTarget(targetClassName, defaultTarget = document.body) {
    return document.getElementsByClassName(targetClassName)[0] ||
      defaultTarget;

  }

  setClass(className) {
    this.removeClass([className]);
    this.tpl.className += ` ${className}`;
  }

  removeClass(listClassNames) {
    if (typeof listClassNames === 'string') {
      listClassNames = [listClassNames];
    }
    if (!listClassNames.length) {
      console.error('class names should be not empty array');
      return;
    }

    this.tpl.className = this.tpl.className
      .split(' ')
      .filter((c) => !listClassNames.includes(c))
      .join(' ');
  }

  activate() {
    this.removeClass([INACTIVE_CLASS]);
  }

  deactivate() {
    this.setClass(INACTIVE_CLASS);
  }

  action(callback) {
    this.tpl.onclick = callback;
  }
}
