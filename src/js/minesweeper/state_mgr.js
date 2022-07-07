// import StateMgr from '/js/minesweeper/state_mgr.js';

import ShiftHState from '/js/minesweeper/shift_h_state.js';
import ShiftVState from '/js/minesweeper/shift_v_state.js';

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
      tData = (await ShiftHState.goAsync(self.parentMainScene,tData));
      tData = (await ShiftVState.goAsync(self.parentMainScene,tData));
    }
  };

};

return StateMgr;

})();

export default StateMgr;
