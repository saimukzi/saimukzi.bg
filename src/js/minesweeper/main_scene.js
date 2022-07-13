// import MainScene from '/js/minesweeper/main_scene.js';

import * as smz_game_object from '/js/smz/smz_game_object.js';
import * as PIXI from 'pixi.js';

import CellGroupGameObject from './cell_group_gobj.js';
import SmzCommon from '/js/smz/smz_common.js';
import StateMgr from '/js/minesweeper/state_mgr.js';

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
    self.cellGameGObj.scale.x = 2;
    self.cellGameGObj.scale.y = 2;
    self.addChild(self.cellGameGObj);

    // for position calculation
    self.dummyContainer = new PIXI.Container();
    self.dummyContainer.scale.x = 2;
    self.dummyContainer.scale.y = 2;
    self.addChild(self.dummyContainer);

    self.stateMgr = new StateMgr(self);
    self.stateMgr.goAsync();
  };

  tick(){
    const self = this;
    const threadMs = SmzCommon.currentMs(self.runtime.app.ticker);
    MainScene.applyMsTransform(self.cellGameGObj,threadMs);
  };
  
  static applyMsTransform(dObj,ms){
    dObj.angle = MainScene.msToAngle(ms);
    dObj.position.copyFrom(MainScene.msToPos(ms));
  };
  
  dummyContainerTransform(ms){
    const self = this;
    MainScene.applyMsTransform(self.dummyContainer,ms);
  };
  
  static msToAngle(ms){
    return (ms*360/1000/60/3)%360;
  };
  
  static msToPos(ms){
    const rad = (ms*2*Math.PI*(-1) /1000/60/3/SmzCommon.PHI)%(2*Math.PI);
    //console.log(rad);
    return new PIXI.Point(
      POS_CENTER_X+POS_RADIUS*Math.cos(rad),
      POS_CENTER_Y+POS_RADIUS*Math.sin(rad)
    );
  };

};

return MainScene;

})();

export default MainScene;
