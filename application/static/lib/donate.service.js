const getJSON = function(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'json';
  xhr.onload = function() {
    const status = xhr.status;
    if (status === 200) {
      callback(200, xhr.response);
    } else {
      callback(status, xhr.response);
    }
  };
  xhr.send();
};

export class DonateService {


  constructor() {
    this.totalAmount = 0;
    this.donatesList = [];
  }


  loadDonateInfo() {
    return new Promise((resolve, reject) => {
    getJSON('https://donate.s0er.ru/donate', (status, data) => {
//  getJSON('http://localhost:3000/donate', (status, data) => {
       if (status === 200 && data.donates) {
          this.donatesList = [];
          data.donates.forEach((d) => this.donatesList.push(d));
          resolve(this.donatesList);
        } else {
          reject([]);
        }
      });
    });
  }

  resetByDonatesList() {
    const n = this
      .donatesList.map((o) => o.amount)
      .reduce((s, n) => s + parseInt(n, 10), 0);

    application
      .send({ room: 'donate', message: { command: 'reset', value: n } });
  }



  reciveDonate(donate) {
    if (donate.command) {
      this.execCommand(donate.command, donate);
    }

    if (donate.amount) {
      this.addTotalAmount(donate.amount);
      this.donatesList.push(donate);
    }
  }

  execCommand(command, params) {
    switch (command) {
    case 'reset':
      this.setTotalAmount(params.value || 0);
    }
  }

  setTotalAmount(amount) {
    this.totalAmount = parseInt(amount, 10);
  }

  getTotalDonates() {
    return this.totalAmount;
  }

  addTotalAmount(amount) {
    this.totalAmount += parseInt(amount, 10);
    return this.totalAmount;
  }
}
