// import MainScene from '/js/minesweeper/main_scene.js';

import * as smz_game_object from '/js/smz/smz_game_object.js';
import * as PIXI from 'pixi.js';

import CellGroupGameObject from './cell_group_gobj.js';

'use strict';

export const MainScene = (function(){

class MainScene extends smz_game_object.SmzGameObject {

  constructor(runtime){
    super(runtime);
    const self = this;
    
    self.startMs = Date.now();
    
    self.cellGameGObj = new CellGroupGameObject(self.runtime);
    self.cellGameGObj.position.x = 960;
    self.cellGameGObj.position.y = 540;
    //self.cellGameGObj.scale.x = 2;
    //self.cellGameGObj.scale.y = 2;
    self.cellGameGObj.scale.x = 0.5;
    self.cellGameGObj.scale.y = 0.5;
    self.addChild(self.cellGameGObj);
  };

  tick(){
    const self = this;
    //console.log(performance.now());
    
    const timeDiff = Date.now() - self.startMs;
    //self.cellGameGObj.angle = (timeDiff/2/360)%360;
  };

};

return MainScene;

})();

export default MainScene;
