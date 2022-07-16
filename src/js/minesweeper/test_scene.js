// import TestScene from '/js/minesweeper/main_scene.js';

import * as smz_game_object from '/js/smz/smz_game_object.js';
import * as PIXI from 'pixi.js';
import MainScene from '/js/minesweeper/main_scene.js';
import SmzCommon from '/js/smz/smz_common.js';
import MwMedia from '/js/minesweeper/mw_media.js';

import CellGroupGameObject from './cell_group_gobj.js';
import CellGameObject from './cell_gobj.js';

'use strict';

export const TestScene = (function(){

class TestScene extends smz_game_object.SmzGameObject {

  constructor(runtime){
    super(runtime);
    const self = this;

    self.mainSceneTransform = new PIXI.Container();
    self.mainSceneTransform.scale.x = 0.25;
    self.mainSceneTransform.scale.y = 0.25;
    self.mainSceneTransform.position.x = 300;
    self.mainSceneTransform.position.y = 200;
    self.addChild(self.mainSceneTransform);
    
    self.mainScene = new MainScene(self.runtime);
    self.mainSceneTransform.addChild(self.mainScene);
    
    const BORDER_SIZE = 8;
    self.mainSceneBorder = new PIXI.Graphics();
    self.mainSceneBorder.beginFill(0xffff7f);
    self.mainSceneBorder.drawRect(-BORDER_SIZE,-BORDER_SIZE,1920+BORDER_SIZE*2,1080+BORDER_SIZE*2);
    self.mainSceneBorder.endFill();
    self.mainSceneBorder.beginHole();
    self.mainSceneBorder.drawRect(0,0,1920,1080);
    self.mainSceneBorder.endFill();
    self.mainSceneTransform.addChild(self.mainSceneBorder);

    self.mainSceneCenter = MwMedia.createRoundBoxGraphics(0xffff7f,8);
    self.mainSceneCenter.position.x = 960;
    self.mainSceneCenter.position.y = 540;
    self.mainSceneTransform.addChild(self.mainSceneCenter);
    
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
    
    self.testLogo = PIXI.Sprite.from(runtime.logoTexture);
    self.testLogo.position.x = 0;
    self.testLogo.position.y = 200;
    self.testLogo.width = 100;
    self.testLogo.height = 100;
    self.addChild(self.testLogo);
    
    self.mainScene.cellGameGObj.createDebugObj();
  };

  async onTestBtnClick(){
    const self = this;
    console.log("onMouseUp Start");
    const NOW_MS = performance.now();
    self.testCellGObj.setNBlockTexture(SmzCommon.randInt(10),SmzCommon.randInt(4));
    var tData = {planMs:NOW_MS,threadMs:NOW_MS};
    tData = await self.testCellGObj.showNBlockAsync(Math.random()*Math.PI,tData);
    tData = await SmzCommon.waitPromise(tData,500);
    tData = await self.testCellGObj.hideNBlockAsync(Math.random()*Math.PI,tData);
    console.log("onMouseUp End");
    return tData;
  };

};

return TestScene;

})();

export default TestScene;
