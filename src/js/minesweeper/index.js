// https://pixijs.io/guides/basics/getting-started.html
import * as PIXI from 'pixi.js';

document.body.style.overflow = "hidden";
document.body.style.margin = "0px";

// Create the application helper and add its render target to the page
let app = new PIXI.Application({ width: 1920, height: 1080 });
document.body.appendChild(app.view);

// FPS = 30
app.ticker.deltaMS = 1000/30;

// Create the sprite and add it to the stage
let sprite = PIXI.Sprite.from('assets/sample.png');
app.stage.addChild(sprite);

// Add a ticker callback to move the sprite back and forth
let elapsed = 0.0;
app.ticker.add((delta) => {
  elapsed += delta;
  sprite.x = 100.0 + Math.cos(elapsed/50.0) * 100.0;
});
