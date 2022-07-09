// import CellGroupGameObject from '/js/minesweeper/cell_gobj.js';

import * as smz_game_object from '/js/smz/smz_game_object.js';
import * as PIXI from 'pixi.js';

import SmzCommon from '/js/smz/smz_common.js';
import CellGameObject from './cell_gobj.js';
import StateMgr from '/js/minesweeper/state_mgr.js';
import MwCommon from '/js/minesweeper/mw_common.js';

'use strict';

export const CellGroupGameObject = (function(){

class CellGroupGameObject extends smz_game_object.SmzGameObject {

  constructor(runtime){
    super(runtime);
    const self = this;
    
    self.cellGroup = new PIXI.Container();
    self.addChild(self.cellGroup);
    
    // self.testCellObj = new CellGameObject(self.runtime);
    // self.addChild(self.testCellObj);
    for(let i=0;i<MwCommon.CELL_ROWCOL_COUNT;++i)
    for(let j=0;j<MwCommon.CELL_ROWCOL_COUNT;++j){
      self.randomCreateCell(i,j);
    }
    
    //self.state = new ShiftVState(self, Date.now());
    //self.state.start();
    self.stateMgr = new StateMgr(self);
    self.stateMgr.goAsync();
  };
  
  tick(){
    const self = this;
    const now = Date.now();
    //self.state.tick(now);
  };

  randomCreateCell(gx,gy){
    const self = this;
    if(Math.random()<(SmzCommon.PHI-1))return;
    self.createCell(gx,gy);
  };

  createCell(gx,gy){
    const self = this;
    var testCellObj = new CellGameObject(self.runtime);
    testCellObj.position.x = self.gToP(gx);
    testCellObj.position.y = self.gToP(gy);
    testCellObj.gx = gx;
    testCellObj.gy = gy;
    self.cellGroup.addChild(testCellObj);
  };
  
  gToP(g){
    return (g-MwCommon.CELL_ROWCOL_COUNT/2)*MwCommon.CELL_SIZE;
  };

};

return CellGroupGameObject;

})();

export default CellGroupGameObject;
