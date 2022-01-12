const CLEAR_TIMEOUT_MS = 10000;

export class Comment {

  constructor() {
    this.timeoutId = null;

    this.container = document.getElementsByClassName('main-content')[0] ||
                     document.body;
    this.template = document.createElement('div');
    this.template.className = 'comments';
    this.container.append(this.template);
  }

  displayComment(data) {
    this.template.innerHTML = `
    <div class="message-body">
      <p>
        ${data.message.comment}
      </p>
    </div>
    `;
    this.delayClear();
  }

  delayClear()  {
    if (this.timeoutId) {
      clearInterval(this.timeoutId);
    }
    this.timeoutId = setTimeout(
      () => (this.template.innerHTML = ''),
      CLEAR_TIMEOUT_MS
    );
  }
}
