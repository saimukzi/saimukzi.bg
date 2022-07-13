// import MainScene from '/js/minesweeper/main_scene.js';

import * as smz_game_object from '/js/smz/smz_game_object.js';
import * as PIXI from 'pixi.js';

import CellGroupGameObject from './cell_group_gobj.js';
import SmzCommon from '/js/smz/smz_common.js';

'use strict';

export const MainScene = (function(){

const POS_CENTER_X = 960;
const POS_CENTER_Y = 540;
const POS_RADIUS = Math.sqrt(960*960+540*540)/SmzCommon.PHI;

class MainScene extends smz_game_object.SmzGameObject {

  constructor(runtime){
    super(runtime);
    const self = this;
    
    self.cellGameGObj = new CellGroupGameObject(self.runtime);
    self.cellGameGObj.position.x = 960;
    self.cellGameGObj.position.y = 540;
    self.cellGameGObj.scale.x = 2;
    self.cellGameGObj.scale.y = 2;
    self.addChild(self.cellGameGObj);
  };

  tick(){
    const self = this;
    const threadMs = SmzCommon.currentMs(self.runtime.app.ticker);
    self.cellGameGObj.angle = MainScene.msToAngle(threadMs);
    const {x,y} = MainScene.msToPos(threadMs);
    console.log(x);
    self.cellGameGObj.position.x = x;
    self.cellGameGObj.position.y = y;
  };
  
  static msToAngle(ms){
    return (ms*360/1000/60/3)%360;
  };
  
  static msToPos(ms){
    const rad = (ms*2*Math.PI*(-1) /1000/60/3/SmzCommon.PHI)%(2*Math.PI);
    console.log(rad);
    return {
      x:POS_CENTER_X+POS_RADIUS*Math.cos(rad),
      y:POS_CENTER_Y+POS_RADIUS*Math.sin(rad)
    };
  };

};

return MainScene;

})();

export default MainScene;
