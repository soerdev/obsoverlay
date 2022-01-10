const CLEAR_TIMEOUT_MS = 10000;

export class Comment {

  constructor() {
    this.timeoutId = null;
    this.template = document.createElement('div');
    this.template.className = 'comments';
    document.body.append(this.template);
  }

  displayComment(comment) {
    this.template.innerHTML = `
    <div class="message-body">
      <p>
        ${comment}
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
