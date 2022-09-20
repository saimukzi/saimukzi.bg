// import MineSweeper from '/js/minesweeper/minesweeper.js';

import SmzCommon from '/js/smz/smz_common.js';

'use strict';

export const MineSweeper = (function(){

const MineSweeper = {};

// empty = ' '
// mine =  '*'
// input can be row str list
MineSweeper.calc = function(cellListList) {
  const EMPTY = ' ';
  const MINE  = 'X';
  const S0 = cellListList.length;
  const S1 = cellListList[0].length;
  console.log(S0,S1);
  const retCellListList = SmzCommon.createArray(S0, S1);
  for(let i0=0;i0<S0;++i0)
  for(let i1=0;i1<S1;++i1){
    if(cellListList[i0][i1]==MINE){
      retCellListList[i0][i1] = MINE;
      continue;
    }
    var v = 0;
    for(let ii0=i0-1;ii0<=i0+1;++ii0)
    for(let ii1=i1-1;ii1<=i1+1;++ii1){
      const ii0x = (ii0+S0)%S0;
      const ii1x = (ii1+S1)%S1;
      if(cellListList[ii0x][ii1x]==MINE){++v;}
    }
    retCellListList[i0][i1] = v;
  }
  return retCellListList;
};

return MineSweeper;

})();

export default MineSweeper;
