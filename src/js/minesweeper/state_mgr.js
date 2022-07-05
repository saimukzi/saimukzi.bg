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
    while(true){
      await ShiftHState.goAsync(self.parentMainScene);
      await ShiftVState.goAsync(self.parentMainScene);
    }
  };

};

return StateMgr;

})();

export default StateMgr;
