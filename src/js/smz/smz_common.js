// import SmzCommon from '/js/smz/smz_common.js';

import * as PIXI from 'pixi.js';

'use strict';

export const SmzCommon = (function(){

const SmzCommon = {};

SmzCommon.clone = function(data){
  // vue use Proxy and structuredClone not working
  return JSON.parse(JSON.stringify(data));
};

// https://stackoverflow.com/questions/17242144/javascript-convert-hsb-hsv-color-to-rgb-accurately
SmzCommon.hsv2rgb = function(h,s,v){
  let f= (n,k=(n+h/60)%6) => v - v*s*Math.max( Math.min(k,4-k,1), 0);
  const rr = Math.floor(f(5)*0xff);
  const gg = Math.floor(f(3)*0xff);
  const bb = Math.floor(f(1)*0xff);
  return (rr<<16)|(gg<<8)|(bb<<0); 
};

SmzCommon.PHI = (1+Math.sqrt(5))/2;

SmzCommon.waitPromise = function(ms){
  return new Promise((resolve,reject)=>{
    setTimeout(resolve,ms);
  });
};

SmzCommon.waitPromiseFactory = function(ms){
  return (()=>{return SmzCommon.waitPromise(ms);});
};

SmzCommon.displayObjLinearMoveToPos = function(displayObj, ticker, x, y, ms, callback=null, priority=PIXI.UPDATE_PRIORITY.NORMAL){
  const START_X = displayObj.position.x;
  const END_X = x;
  const START_Y = displayObj.position.y;
  const END_Y = y;
  
  const tickFuncAry = [null];
  const timeRemainMsAry = [ms];
  tickFuncAry[0] = ()=>{
    timeRemainMsAry[0] -= ticker.deltaMS;
    const REMAIN_MS = (timeRemainMsAry[0]>0)?(timeRemainMsAry[0]):0;
    displayObj.position.x = (REMAIN_MS * START_X + (ms-REMAIN_MS) * END_X ) / ms;
    displayObj.position.y = (REMAIN_MS * START_Y + (ms-REMAIN_MS) * END_Y ) / ms;
    if(timeRemainMsAry[0]<=0){
      ticker.remove(tickFuncAry[0]);
      if(callback){callback();}
    }
  };
  ticker.add(tickFuncAry[0],null,priority);
};

SmzCommon.displayObjLinearMoveToPosPromise = function(displayObj, ticker, x, y, ms, priority=PIXI.UPDATE_PRIORITY.NORMAL){
  return new Promise((resolve,reject)=>{
    SmzCommon.displayObjLinearMoveToPos(displayObj,ticker,x,y,ms,resolve,priority);
  });
};

SmzCommon.displayObjLinearMoveToPosPromiseFactory = function(displayObj, ticker, x, y, ms, priority=PIXI.UPDATE_PRIORITY.NORMAL){
  return (()=>{return SmzCommon.displayObjLinearMoveToPosPromise(displayObj,ticker,x,y,ms,priority);});
};

return SmzCommon;

})();

export default SmzCommon;
