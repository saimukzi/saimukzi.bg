// import OpenState from '/js/minesweeper/open_state.js';

import MwCommon from '/js/minesweeper/mw_common.js';
import SmzCommon from '/js/smz/smz_common.js';

'use strict';

export const OpenState = (function(){

const C = SmzCommon;

const OpenState = {};

OpenState.goAsync = async function(parentMainScene, tData){
  var myTData = tData;

  
  myTData = await C.waitPromise(myTData,2000);

  return myTData;
};

return OpenState;

})();

export default OpenState;
