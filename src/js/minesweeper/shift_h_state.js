// import ShiftHState from '/js/minesweeper/shift_h_state.js';

import MwCommon from '/js/minesweeper/mw_common.js';
import SmzCommon from '/js/smz/smz_common.js';

'use strict';

export const ShiftHState = (function(){

const ShiftHState = {};

ShiftHState.goAsync = async function(cellGroupGameObj, tData){
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
        cellGroupGameObj.randomCreateCell(jj,i);
      }
    }else{
      const newCellCnt = -move;
      for(let j=0;j<newCellCnt;++j){
        const jj = MwCommon.CELL_ROWCOL_COUNT+j;
        cellGroupGameObj.randomCreateCell(jj,i);
      }
    }
  }
  
  // promise array
  var pp = null;
  const promiseAry = [];
  
  // move cell
  for(const cell of cellGroupGameObj.cellGroup.children){
    const i = cell.gy;
    const j0 = cell.gx;
    const move = moveAry[i];
    const j1 = j0+move;
    cell.gx = j1;
    const promise = SmzCommon.p(SmzCommon.slideInPos,{
      displayObj:cell,
      ticker:cell.runtime.app.ticker,
      x:cellGroupGameObj.gToP(j1),y:cellGroupGameObj.gToP(i),
      tData:tData,deltaMs:1000,
    });
    promiseAry.push(promise);
  }

  var retAry = await Promise.all(promiseAry);
  var nowTData = SmzCommon.maxTData(retAry);
  
  // remove all out grid cell
  const rmCellList = [];
  for(const cell of cellGroupGameObj.cellGroup.children){
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
  
  return nowTData;
};

return ShiftHState;

})();

export default ShiftHState;
