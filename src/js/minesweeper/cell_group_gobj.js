// import CellGroupGameObject from '/js/minesweeper/cell_gobj.js';

import * as smz_game_object from '/js/smz/smz_game_object.js';
import * as PIXI from 'pixi.js';

import SmzCommon from '/js/smz/smz_common.js';
import CellGameObject from './cell_gobj.js';
import ShiftHState from '/js/minesweeper/shift_h_state.js';
import MwCommon from '/js/minesweeper/mw_common.js';

'use strict';

export const CellGroupGameObject = (function(){

class CellGroupGameObject extends smz_game_object.SmzGameObject {

  constructor(runtime){
    super(runtime);
    const self = this;
    
    // self.testCellObj = new CellGameObject(self.runtime);
    // self.addChild(self.testCellObj);
    for(let i=0;i<MwCommon.CELL_ROWCOL_COUNT;++i)
    for(let j=0;j<MwCommon.CELL_ROWCOL_COUNT;++j){
      if(Math.random()<(SmzCommon.PHI-1))continue;
      self.createCell(i,j);
    }
    
    self.state = new ShiftHState(self, Date.now());
    self.state.start();
  };
  
  tick(){
    const self = this;
    const now = Date.now();
    self.state.tick(now);
  };

  createCell(gx,gy){
    const self = this;
    var testCellObj = new CellGameObject(self.runtime);
    testCellObj.position.x = self.gToP(gx);
    testCellObj.position.y = self.gToP(gy);
    testCellObj.gx = gx;
    testCellObj.gy = gy;
    self.addChild(testCellObj);
  };
  
  gToP(g){
    return (g-MwCommon.CELL_ROWCOL_COUNT/2)*MwCommon.CELL_SIZE;
  };

};

return CellGroupGameObject;

})();

export default CellGroupGameObject;
