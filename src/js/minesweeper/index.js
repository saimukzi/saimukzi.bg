// https://pixijs.io/guides/basics/getting-started.html
import * as PIXI from 'pixi.js';
import * as smz_runtime from '/js/smz/smz_runtime.js';
import MainScene from './main_scene.js';
import MwCommon from '/js/minesweeper/mw_common.js';
import MwMedia from '/js/minesweeper/mw_media.js';

const GAME_MAIN = {

  SCREEN_WIDTH:1920,
  SCREEN_HEIGHT:1080,
  FPS:30,

  onload:function(){
    const self = this;

    document.body.style.overflow = "hidden";
    document.body.style.margin = "0px";

    this.app = new PIXI.Application({ width: self.SCREEN_WIDTH, height: self.SCREEN_HEIGHT, backgroundColor: MwCommon.COLOR_00 });
    //this.app.view.style.position="absolute";
    document.body.appendChild(this.app.view);

    // runtime
    self.runtime = new smz_runtime.SmzRuntime(self.app, self.FPS);

    (async function(){
      await MwMedia.initMediaAsync(self.runtime);
      self.runtime.setScene(new MainScene(self.runtime));
    })();
  },
};

window.addEventListener("load", function(){
  GAME_MAIN.onload();
});

// document.body.style.overflow = "hidden";
// document.body.style.margin = "0px";
// 
// // Create the application helper and add its render target to the page
// let app = new PIXI.Application({ width: 1920, height: 1080 });
// document.body.appendChild(app.view);
// 
// // FPS = 30
// app.ticker.deltaMS = 1000/30;
// 
// // Create the sprite and add it to the stage
// let sprite = PIXI.Sprite.from('assets/sample.png');
// app.stage.addChild(sprite);
// 
// // Add a ticker callback to move the sprite back and forth
// let elapsed = 0.0;
// app.ticker.add((delta) => {
//   elapsed += delta;
//   sprite.x = 100.0 + Math.cos(elapsed/50.0) * 100.0;
// });
