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

SmzCommon.randInt = function(v){
  return Math.floor(Math.random()*v);
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

SmzCommon.currentMs = function(ticker){
  // https://github.com/pixijs/pixijs/blob/main/packages/ticker/src/Ticker.ts
  return ticker.lastTime + ticker.deltaMS;
};

SmzCommon.linearMoveToPos = function(param){
  const {
    displayObj,ticker,
    x,y,
    startMs, endMs, nowMs,
    priority=PIXI.UPDATE_PRIORITY.NORMAL,
    callback=null
  } = param;

  const START_X = displayObj.position.x;
  const END_X = x;
  const START_Y = displayObj.position.y;
  const END_Y = y;
  const PERIOD_MS = endMs-startMs;
  
  const tickFuncAry = [null];
  const tickFunc = (nowMs)=>{
    const REMAIN_MS = Math.min(Math.max(0,endMs-nowMs),PERIOD_MS);
    displayObj.position.x = (REMAIN_MS * START_X + (PERIOD_MS-REMAIN_MS) * END_X ) / PERIOD_MS;
    displayObj.position.y = (REMAIN_MS * START_Y + (PERIOD_MS-REMAIN_MS) * END_Y ) / PERIOD_MS;
    if(nowMs>=endMs){
      if(tickFuncAry[0]){ticker.remove(tickFuncAry[0]);}
      if(callback){setTimeout(callback,0,{nowMs:nowMs,endMs:endMs});}
    }
  }

  tickFunc(nowMs);

  if(nowMs<endMs){
    tickFuncAry[0] = ()=>{
      const CURRENT_MS=SmzCommon.currentMs(ticker);
      tickFunc(CURRENT_MS);
    };
    ticker.add(tickFuncAry[0],null,priority);
  }
};

SmzCommon.slideInPos = function(param){
  const {
    displayObj,ticker,
    x,y,deceleration=null,
    startMs, endMs=null, nowMs,
    priority=PIXI.UPDATE_PRIORITY.NORMAL,
    callback=null
  } = param;

  console.assert((deceleration==null)!=(endMs==null),"CUPNVQZYVF");

  const START_X = displayObj.position.x;
  const END_X = x;
  const START_Y = displayObj.position.y;
  const END_Y = y;

  const DELTA_P = Math.pow((START_X-END_X)*(START_X-END_X)+(START_Y-END_Y)*(START_Y-END_Y),0.5);
  const DELTA_T = (endMs!=null)?(endMs-startMs):(Math.pow(2*DELTA_P/deceleration,0.5)*1000);
  const END_T   = startMs+DELTA_T;
  const DECEL   = (deceleration!=null)?(deceleration):(2*DELTA_P*Math.pow(1000/DELTA_T,2));
  
  const tickFuncAry = [null];
  const tickFunc = (nowMs)=>{
    const REMAIN_MS = Math.min(Math.max(0,END_T-nowMs),DELTA_T);
    const REMAIN_S = REMAIN_MS/1000;
    const REMAIN_P = REMAIN_S*REMAIN_S*DECEL/2;
    displayObj.position.x = (REMAIN_P * START_X + (DELTA_P-REMAIN_P) * END_X ) / DELTA_P;
    displayObj.position.y = (REMAIN_P * START_Y + (DELTA_P-REMAIN_P) * END_Y ) / DELTA_P;
    if(nowMs>=END_T){
      if(tickFuncAry[0]){ticker.remove(tickFuncAry[0]);}
      if(callback){setTimeout(callback,0,{nowMs:nowMs,endMs:END_T});}
    }
  }
  
  tickFunc(nowMs);

  if(nowMs<END_T){
    tickFuncAry[0] = ()=>{
      const CURRENT_MS=SmzCommon.currentMs(ticker);
      tickFunc(CURRENT_MS);
    };
    ticker.add(tickFuncAry[0],null,priority);
  }
};

SmzCommon.p = function(func,param){
  return new Promise((res,rej)=>{
    param.callback = res;
    func(param);
  });
};

SmzCommon.pf = function(func,param){
  return (()=>{return SmzCommon.p(func,param);});
};

return SmzCommon;

})();

export default SmzCommon;
