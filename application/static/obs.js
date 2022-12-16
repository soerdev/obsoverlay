import { Application } from './core/application.js';

window.addEventListener('load', async () => {

  window.application = new Application();
  window.api = window.application.metacom.api;

  await application.metacom.load('bus');
  application.startBus();


  application.screen.obsComment(
    { 'message': { 'comment': 'OBS is Running' } }
  );

});
