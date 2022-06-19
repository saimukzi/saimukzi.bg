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
    
    self.cellGameGObj = new CellGroupGameObject(self.runtime);
    self.addChild(self.cellGameGObj);
  };

};

return MainScene;

})();

export default MainScene;
