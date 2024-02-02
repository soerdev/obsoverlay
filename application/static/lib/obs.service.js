

export class ObsService {

  constructor() {
    this._isObs = false;
    this.scenes = [];
    this.defaultScene = '';
    this.savedScene = '';

    if (window.obsstudio) {
      console.log('OBS service start');
      this._isObs = true;
      const obs = window.obsstudio;

      obs.getScenes(all => {
        this.scenes = all;
        if (this.scenes.length > 0) {
          this.defaultScene = this.scenes[0];
        }
        console.log(this.scenes, this.defaultScene);
      });
    }

  }


  isObs() {
    return this._isObs;
  }

  async currentScene() {
    return new Promise((resolve, reject) => {
      const obs = window.obsstudio;
      obs.getCurrentScene(scene => {
        resolve(scene.name || this.defaultScene);
      });

    });
  }

  async actionFromComment(msg) {
    const text = msg.toLowerCase();

    this.scenes.forEach(async (target) => {
      if (text.indexOf(`#${target}`) >= 0) {
         console.log('Match', target);
         const currentScene = await this.currentScene();
         if (target == currentScene) { return; }

         window.obsstudio.setCurrentScene(target);
         setTimeout(() => window.obsstudio.setCurrentScene(currentScene), 10000);
      }

    })
  }
}
