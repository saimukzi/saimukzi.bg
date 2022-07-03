// import TestScene from '/js/minesweeper/main_scene.js';

import * as smz_game_object from '/js/smz/smz_game_object.js';
import * as PIXI from 'pixi.js';
import MainScene from '/js/minesweeper/main_scene.js';

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
  };

};

return TestScene;

})();

export default TestScene;
