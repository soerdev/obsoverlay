export const ACTIVE_CLASS = 'active';
export const INACTIVE_CLASS = 'inactive';

export class Template {
  constructor(srcClassName) {
    this.tpl = this.initTemplate(srcClassName);
  }

  initTemplate(srcClassName) {
    const tmpTpl = document.createElement('div');
    tmpTpl.className = srcClassName;
    tmpTpl.innerHTML = '';
    return tmpTpl;
  }

  html(content) {
    this.tpl.innerHTML = content;
  }

  appendTo(target) {
    target.append(this.tpl);
  }

  removeClass(listClassNames) {
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
    this.removeClass([INACTIVE_CLASS]);
    this.tpl.className += ` ${INACTIVE_CLASS}`;
  }
}
