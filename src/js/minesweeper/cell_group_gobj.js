// import CellGroupGameObject from '/js/minesweeper/cell_gobj.js';

import * as smz_game_object from '/js/smz/smz_game_object.js';
import * as PIXI from 'pixi.js';

import CellGameObject from './cell_gobj.js';

'use strict';

export const CellGroupGameObject = (function(){

class CellGroupGameObject extends smz_game_object.SmzGameObject {

  constructor(runtime){
    super(runtime);
    const self = this;
    
    // self.testCellObj = new CellGameObject(self.runtime);
    // self.addChild(self.testCellObj);
    for(let i=0;i<20;++i)for(let j=0;j<20;++j){
      var testCellObj = new CellGameObject(self.runtime);
      testCellObj.position.x = (i-10)*100;
      testCellObj.position.y = (j-10)*100;
      self.addChild(testCellObj);
    }
  };

};

return CellGroupGameObject;

})();

export default CellGroupGameObject;
