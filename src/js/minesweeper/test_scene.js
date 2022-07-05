// import TestScene from '/js/minesweeper/main_scene.js';

import * as smz_game_object from '/js/smz/smz_game_object.js';
import * as PIXI from 'pixi.js';
import MainScene from '/js/minesweeper/main_scene.js';
import SmzCommon from '/js/smz/smz_common.js';

import CellGroupGameObject from './cell_group_gobj.js';
import CellGameObject from './cell_gobj.js';

'use strict';

export const TestScene = (function(){

class TestScene extends smz_game_object.SmzGameObject {

  constructor(runtime){
    super(runtime);
    const self = this;
    
    self.mainScene = new MainScene(self.runtime);
    self.mainScene.scale.x = 0.25;
    self.mainScene.scale.y = 0.25;
    self.addChild(self.mainScene);
    
    self.testCellGObj = new CellGameObject(self.runtime);
    self.addChild(self.testCellGObj);
    
    self.testBtn = new PIXI.Graphics();
    self.testBtn.beginFill(0x7fffff);
    self.testBtn.drawRect(0,0,100,100);
    self.testBtn.endFill();
    self.testBtn.interactive = true;
    self.testBtn.hitArea = new PIXI.Rectangle(0,0,100,100);
    self.testBtn.mouseup = (ev)=>{self.onTestBtnClick();};
    self.addChild(self.testBtn);
    self.testBtn.position.x = 0;
    self.testBtn.position.y = 100;
    
    //self.tmp = new PIXI.Sprite(self.runtime.nRoundBoxTextureList[9]);
    //self.addChild(self.tmp);
  };

  onTestBtnClick(){
    const self = this;
    Promise.resolve()
      .then(()=>{console.log("onMouseUp Start");})
      //.then(SmzCommon.waitPromiseFactory(1000))
      .then(SmzCommon.displayObjLinearMoveToPosPromiseFactory(
        self.testCellGObj.block,self.runtime.app.ticker,1,1,250
      ))
      .then(()=>{console.log("onMouseUp End");});
  };

};

return TestScene;

})();

export default TestScene;
