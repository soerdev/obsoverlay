
export class DonateService {



  constructor() {
    this.totalAmount = 0;
    this.donatesList = [];
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
