// import OpenState from '/js/minesweeper/open_state.js';

import MwCommon from '/js/minesweeper/mw_common.js';
import SmzCommon from '/js/smz/smz_common.js';

'use strict';

export const OpenState = (function(){

const C = SmzCommon;

const BIG_FLIP_MS = 1000;
const SMALL_FLIP_MS = 250;
const SHOW_MS = 500;
const TOTAL_MS = BIG_FLIP_MS+SMALL_FLIP_MS+SHOW_MS+BIG_FLIP_MS+SMALL_FLIP_MS;

const OpenState = {};

OpenState.goAsync = async function(parentMainScene, tData){
  var myTData = tData;
  var flipCenter;
  var rad;

  self.parentMainScene.dummyContainerTransform(tData.planMs+(TOTAL_MS/2));
  flipCenter = new PIXI.Point(960,540);
  self.parentMainScene.dummyContainer.toLocal(flipCenter,self.parentMainScene,flipCenter);
  self.parentMainScene.cellGameGObj.debugStartObj.position.copyFrom(flipCenter);

  rad = ;
  

  return myTData;
};

return OpenState;

})();

export default OpenState;
