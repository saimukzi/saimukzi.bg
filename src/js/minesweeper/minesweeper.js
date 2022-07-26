// import MineSweeper from '/js/minesweeper/minesweeper.js';

'use strict';

export const MineSweeper = (function(){

import SmzCommon from '/js/smz/smz_common.js';

const MineSweeper = {};

// empty = ' '
// mine =  '*'
// input can be row str list
MineSweeper.calc = func(cellListList) {
  const EMPTY = ' ';
  const MINE  = '*';
  const S0 = cellListList.length;
  const S1 = cellListList[0].length;
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
      if(ii0<0)continue;
      if(ii0>=S0)continue;
      if(ii1<0)continue;
      if(ii1>=S1)continue;
      if(cellListList[ii0][ii1]==MINE){++v;}
    }
    retCellListList[i0][i1] = v;
  }
  return retCellListList;
};

return MineSweeper;

})();

export default MineSweeper;
