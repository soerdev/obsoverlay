export class DonateService {

  constructor() {
  }
  reciveDonate(donate) {
    if (donate.command) {
      this.execCommand(donate.command, donate);
    }

    if (donate.amount) {
      this.addTotalDonates(donate.amount);
    }
  }

  execCommand(command, params) {
    switch (command) {
    case 'reset':
      this.setTotalDonates(params.value || 0);
    }
  }

  getTotalDonates() {
    return parseInt(localStorage.getItem('donate-amount'), 10) || 0;
  }

  addTotalDonates(amount) {
    let donateSum = this.getTotalDonates();
    donateSum += parseInt(amount, 10);
    this.setTotalDonates(donateSum);
    return donateSum;
  }

  setTotalDonates(amount) {
    localStorage.setItem('donate-amount', amount);
  }


}
