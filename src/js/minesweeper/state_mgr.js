// import StateMgr from '/js/minesweeper/state_mgr.js';

import ShiftHState from '/js/minesweeper/shift_h_state.js';
import ShiftVState from '/js/minesweeper/shift_v_state.js';
import OpenState from '/js/minesweeper/open_state.js';
import SmzCommon from '/js/smz/smz_common.js';
import * as PIXI from 'pixi.js';

'use strict';

export const StateMgr = (function(){

class StateMgr {

  constructor(parentMainScene){
    const self = this;
    self.parentMainScene = parentMainScene;
  };
  
  async goAsync(){
    const self = this;
    const START_MS = performance.now();
    var tData = {planMs:START_MS, threadMs:START_MS};
    var tmp;
    while(true){
      tData = (await ShiftHState.goAsync(self.parentMainScene.cellGameGObj,tData));
      tData = (await OpenState.goAsync(self.parentMainScene,tData));
      tData = (await ShiftVState.goAsync(self.parentMainScene.cellGameGObj,tData));
      tData = (await OpenState.goAsync(self.parentMainScene,tData));
    }
  };

};

return StateMgr;

})();

export default StateMgr;
