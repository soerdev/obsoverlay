import { Metacom } from './metacom.js';
import { OBS_ROOM, LOWERS_ROOM, DONATE_ROOM } from '../consts.js';
import { ScreenComponent } from '../lib/screen.component.js';
import { DonateService } from '../lib/donate.service.js';

export class Application {

  constructor() {
    const protocol = location.protocol === 'http:' ? 'ws' : 'wss';
    this.metacom = Metacom.create(`${protocol}://${location.host}/api`);

    this.donateService = new DonateService();

    this.screen = new ScreenComponent();
  }

  startBus() {
    api.bus.subscribe({ room: OBS_ROOM });
    api.bus.subscribe({ room: LOWERS_ROOM });
    api.bus.subscribe({ room: DONATE_ROOM });
    api.bus.on('message', (data) => {
      switch (data.room) {
      case OBS_ROOM:
        this.screen.obsComment(data);
        break;
      case DONATE_ROOM:
        this.donateService.reciveDonate(data.message);
        this.screen.donate(
          data.message.amount,
          this.donateService.getTotalDonates()
        );
        break;

      case LOWERS_ROOM:
        this.screen.lowerThird(
          data.message.id,
          data.message.title,
          data.message.subtitle);
        break;
      }
    });
  }
}
