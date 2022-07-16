// import OpenState from '/js/minesweeper/open_state.js';

import MwCommon from '/js/minesweeper/mw_common.js';
import SmzCommon from '/js/smz/smz_common.js';

import * as PIXI from 'pixi.js';

'use strict';

export const OpenState = (function(){

const C = SmzCommon;

const BIG_FLIP_MS = 1000;
const SMALL_FLIP_MS = 250;
const SHOW_MS = 500;
const TOTAL_MS = BIG_FLIP_MS+SMALL_FLIP_MS+SHOW_MS+BIG_FLIP_MS+SMALL_FLIP_MS;

const RADIUS = Math.sqrt(960*960+540*540)+100;

const OpenState = {};

OpenState.goAsync = async function(mainScene, tData){
  const cellGroupGameObj = mainScene.cellGameGObj;
  var myTData = tData;
  var flipCenter;
  var rad;
  var tmpMat = new PIXI.Matrix();

  mainScene.dummyContainerTransform(myTData.planMs+(BIG_FLIP_MS/2));
  flipCenter = new PIXI.Point(960,540);
  mainScene.dummyContainer.toLocal(flipCenter,mainScene,flipCenter);
  if(mainScene.cellGameGObj.debugStartObj){
    mainScene.cellGameGObj.debugStartObj.position.copyFrom(flipCenter);
  }

  rad = Math.random()*Math.PI*2;
  tmpMat.identity().rotate(rad).translate(flipCenter.x,flipCenter.y);
  
  //var tmpPtr = tmpMat.applyInverse(flipCenter);
  //console.log(tmpPtr);

  for(const cell of cellGroupGameObj.cellGroup.children){
    cell.setNBlockTexture(SmzCommon.randInt(10),SmzCommon.randInt(4));
  }

  const t0 = myTData;
  const promiseAry = [];
  for(const cell of cellGroupGameObj.cellGroup.children){
    var pos = new PIXI.Point();
    pos.copyFrom(cell.position);
    pos.x+=50;pos.y+=50;
    tmpMat.applyInverse(pos,pos);
    pos = pos.x;
    pos /= RADIUS;
    pos += 0.5;
    pos = SmzCommon.bound(0,pos,1);
    var p = async function(pos){
      var t=t0;
      const ms = pos*BIG_FLIP_MS;
      t=await SmzCommon.waitPromise(t,ms);
      //console.log(pos);
      t=await cell.showNBlockAsync(rad,t);
      return t;
    };
    p=p(pos);
    promiseAry.push(p);
  }
  
  var retAry = await Promise.all(promiseAry);
  myTData = SmzCommon.maxTData(retAry);

  myTData = await SmzCommon.waitPromise(myTData,SHOW_MS);

  mainScene.dummyContainerTransform(myTData.planMs+(BIG_FLIP_MS/2));
  flipCenter = new PIXI.Point(960,540);
  mainScene.dummyContainer.toLocal(flipCenter,mainScene,flipCenter);
  if(mainScene.cellGameGObj.debugStartObj){
    mainScene.cellGameGObj.debugStartObj.position.copyFrom(flipCenter);
  }

  rad = Math.random()*Math.PI*2;
  tmpMat.identity().rotate(rad).translate(flipCenter.x,flipCenter.y);

  const t1 = myTData;
  promiseAry.length = 0;
  for(const cell of cellGroupGameObj.cellGroup.children){
    var pos = new PIXI.Point();
    pos.copyFrom(cell.position);
    pos.x+=50;pos.y+=50;
    tmpMat.applyInverse(pos,pos);
    pos = pos.x;
    pos /= RADIUS;
    pos += 0.5;
    pos = SmzCommon.bound(0,pos,1);
    var p = async function(pos){
      var t=t1;
      const ms = pos*BIG_FLIP_MS;
      t=await SmzCommon.waitPromise(t,ms);
      // console.log(pos);
      t=await cell.hideNBlockAsync(rad+Math.PI,t);
      return t;
    };
    p=p(pos);
    promiseAry.push(p);
  }
  
  retAry = await Promise.all(promiseAry);
  myTData = SmzCommon.maxTData(retAry);

  return myTData;
};

return OpenState;

})();

export default OpenState;
