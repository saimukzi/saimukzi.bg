// import ShiftHState from '/js/minesweeper/shift_h_state.js';

import MwCommon from '/js/minesweeper/mw_common.js';
import SmzCommon from '/js/smz/smz_common.js';

'use strict';

export const ShiftHState = (function(){

class ShiftHState {

  constructor(parentMainScene,startMs){
    const self = this;
    self.parentMainScene = parentMainScene;
    self.startMs = startMs;
  };

  start(){
    const self = this;
    
    // cal move dist
    self.moveAry = Array(MwCommon.CELL_ROWCOL_COUNT);
    for(let i=0;i<MwCommon.CELL_ROWCOL_COUNT;++i){
      var v = 0;
      while(true){
        v = Math.random();
        v *= (MwCommon.CELL_MOVE_MAX*2)+1;
        v -= MwCommon.CELL_MOVE_MAX;
        v = Math.floor(v);
        if(v==0)continue;
        //if((i>=1)&&(v==self.moveAry[i-1]))continue;
        break;
      }
      self.moveAry[i] = v;
    }
    
    // create new cell
    for(let i=0;i<MwCommon.CELL_ROWCOL_COUNT;++i){
      const move = self.moveAry[i];
      if(move>0){
        const newCellCnt = move;
        for(let j=0;j<newCellCnt;++j){
          const jj = 0-move+j;
          self.parentMainScene.randomCreateCell(jj,i);
        }
      }else{
        const newCellCnt = -move;
        for(let j=0;j<newCellCnt;++j){
          const jj = MwCommon.CELL_ROWCOL_COUNT+j;
          self.parentMainScene.randomCreateCell(jj,i);
        }
      }
    }
    
    // promise array
    var pp = null;
    const promiseAry = [];
    
    // move cell
    for(const cell of self.parentMainScene.children){
      const i = cell.gy;
      const j0 = cell.gx;
      const move = self.moveAry[i];
      const j1 = j0+move;
      cell.gx = j1;
      const promise = new Promise((resolve,reject)=>{
        cell.slideInPos(self.parentMainScene.gToP(j1), self.parentMainScene.gToP(i), MwCommon.CELL_MOVE_DEC, resolve);
      });
      promiseAry.push(promise);
    }
    
    // remove all out grid cell
    pp = Promise.all(promiseAry).then((v)=>{
      const rmCellList = [];
      for(const cell of self.parentMainScene.children){
        var rm=false;
        if(cell.gx<0){rm=true;}
        if(cell.gy<0){rm=true;}
        if(cell.gx>=MwCommon.CELL_ROWCOL_COUNT){rm=true;}
        if(cell.gy>=MwCommon.CELL_ROWCOL_COUNT){rm=true;}
        if(rm){rmCellList.push(cell);}
      }
      for(const cell of rmCellList){
        cell.destroy();
      }
    });
    
    pp = pp.then((v)=>{
      // self.parentMainScene.state = new ShiftHState(self.parentMainScene, Date.now());
      // self.parentMainScene.state.start();
      self.parentMainScene.stateMgr.onStateEnd();
    });
  };
  
  tick(ms){
  };
  
  end(){
  };

};

return ShiftHState;

})();

export default ShiftHState;
