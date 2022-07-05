import * as PIXI from 'pixi.js';
import { v4 as uuidv4 } from 'uuid';

'use strict';

export const SmzGameObject = (function(){

class SmzGameObject extends PIXI.Container {
  constructor(runtime){
    super();
    const self=this;
    this.runtime = runtime;
    this.uuid = uuidv4();
    if(runtime==null){
      console.error(`runtime==null, uuid=${this.uuid}`);
    }
    
    //self._onDestroy = ()=>{self.onDestroy();}
    //self.destroyed += self._onDestroy;
    self.on('destroyed', function(){self.onDestroy();});
    
    if((typeof this.tick)=="function"){
      console.log("AVWWHTDP");
      this._tick = ()=>{self.tick();};
      this.runtime.app.ticker.add(this._tick);
    }
  };
  
  //slideInPos(x,y,deceleration,callback,priority=PIXI.UPDATE_PRIORITY.NORMAL){
  //  const self = this;
  //  
  //  const START_X = self.position.x;
  //  const END_X = x;
  //  const START_Y = self.position.y;
  //  const END_Y = y;
  //
  //  const DELTA_P = Math.pow((START_X-END_X)*(START_X-END_X)+(START_Y-END_Y)*(START_Y-END_Y),0.5);
  //  if(DELTA_P<=0){
  //    self.runtime.app.ticker.addOnce(()=>{callback();});
  //    return;
  //  }
  //  
  //  const DELTA_T = Math.pow(2*DELTA_P/deceleration,0.5)*1000;
  //  
  //  const tickFuncAry = [null];
  //  const timeRemainAry = [DELTA_T];
  //  tickFuncAry[0] = ()=>{
  //    timeRemainAry[0] -= self.runtime.app.ticker.deltaMS;
  //    const REMAIN_T = (timeRemainAry[0]>0)?(timeRemainAry[0]/1000):0;
  //    const REMAIN_P = REMAIN_T*REMAIN_T*deceleration/2;
  //    self.position.x = (REMAIN_P * START_X + (DELTA_P-REMAIN_P) * END_X ) / DELTA_P;
  //    self.position.y = (REMAIN_P * START_Y + (DELTA_P-REMAIN_P) * END_Y ) / DELTA_P;
  //    if(timeRemainAry[0]<=0){
  //      self.runtime.app.ticker.remove(tickFuncAry[0]);
  //      if(callback){callback();}
  //    }
  //  };
  //  self.runtime.app.ticker.add(tickFuncAry[0],null,priority);
  //};
  
  onDestroy(){
    //console.log(`onDestroy ${this.uuid}`);
    if((typeof this.tick)=="function"){
      this.runtime.app.ticker.remove(this._tick);
    }
  };
};

return SmzGameObject;

})();
