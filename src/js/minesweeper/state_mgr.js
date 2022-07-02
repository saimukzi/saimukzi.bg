// import StateMgr from '/js/minesweeper/state_mgr.js';

import ShiftHState from '/js/minesweeper/shift_h_state.js';
import ShiftVState from '/js/minesweeper/shift_v_state.js';

'use strict';

export const StateMgr = (function(){

const STATE_CREATE_FUNC_ARY = [
  (pms,t)=>{return new ShiftHState(pms,t);},
  (pms,t)=>{return new ShiftVState(pms,t);},
];

class StateMgr {

  constructor(parentMainScene){
    const self = this;
    self.parentMainScene = parentMainScene;
    self.state = null;
    self.stateIdx = null;
  };
  
  start() {
    const self = this;
    self.update();
  };
  
  onStateEnd() {
    const self = this;
    self.update();
  };
  
  update() {
    const self = this;
    if(self.stateIdx==null){
      self.stateIdx = 0;
    }else{
      ++self.stateIdx;
    }
    self.stateIdx %= STATE_CREATE_FUNC_ARY.length;
    self.state = STATE_CREATE_FUNC_ARY[self.stateIdx](self.parentMainScene, Date.now());
    self.state.start();
  };

};

return StateMgr;

})();

export default StateMgr;
