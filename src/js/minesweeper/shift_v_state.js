// import ShiftVState from '/js/minesweeper/shift_h_state.js';

import MwCommon from '/js/minesweeper/mw_common.js';
import SmzCommon from '/js/smz/smz_common.js';

'use strict';

export const ShiftVState = (function(){

const ShiftVState = {};

ShiftVState.goAsync = async function(parentMainScene, timeGone=0){
  // cal move dist
  const moveAry = Array(MwCommon.CELL_ROWCOL_COUNT);
  for(let i=0;i<MwCommon.CELL_ROWCOL_COUNT;++i){
    var v = 0;
    while(true){
      v = Math.random();
      v *= (MwCommon.CELL_MOVE_MAX*2)+1;
      v -= MwCommon.CELL_MOVE_MAX;
      v = Math.floor(v);
      if(v==0)continue;
      //if((i>=1)&&(v==moveAry[i-1]))continue;
      break;
    }
    moveAry[i] = v;
  }
  
  // create new cell
  for(let i=0;i<MwCommon.CELL_ROWCOL_COUNT;++i){
    const move = moveAry[i];
    if(move>0){
      const newCellCnt = move;
      for(let j=0;j<newCellCnt;++j){
        const jj = 0-move+j;
        parentMainScene.randomCreateCell(i,jj);
      }
    }else{
      const newCellCnt = -move;
      for(let j=0;j<newCellCnt;++j){
        const jj = MwCommon.CELL_ROWCOL_COUNT+j;
        parentMainScene.randomCreateCell(i,jj);
      }
    }
  }
  
  // promise array
  var pp = null;
  const promiseAry = [];
  
  // move cell
  for(const cell of parentMainScene.children){
    const i = cell.gx;
    const j0 = cell.gy;
    const move = moveAry[i];
    const j1 = j0+move;
    cell.gy = j1;
    //const promise = new Promise((resolve,reject)=>{
    //  cell.slideInPos(parentMainScene.gToP(i), parentMainScene.gToP(j1), MwCommon.CELL_MOVE_DEC, resolve);
    //});
    const promise = SmzCommon.p(SmzCommon.slideInPos,{
      displayObj:cell,
      ticker:cell.runtime.app.ticker,
      x:parentMainScene.gToP(i),y:parentMainScene.gToP(j1),
      deceleration:MwCommon.CELL_MOVE_DEC,
      timeGone:timeGone,
    });
    promiseAry.push(promise);
  }

  var overTime = await Promise.all(promiseAry);
  overTime = overTime.map(i=>i.overTime);
  overTime = Math.max(...overTime);
  
  // remove all out grid cell
  const rmCellList = [];
  for(const cell of parentMainScene.children){
    var rm=false;
    if(cell.gy<0){rm=true;}
    if(cell.gx<0){rm=true;}
    if(cell.gy>=MwCommon.CELL_ROWCOL_COUNT){rm=true;}
    if(cell.gx>=MwCommon.CELL_ROWCOL_COUNT){rm=true;}
    if(rm){rmCellList.push(cell);}
  }
  for(const cell of rmCellList){
    cell.destroy();
  }
  
  return {overTime:overTime};
};

return ShiftVState;

})();

export default ShiftVState;
