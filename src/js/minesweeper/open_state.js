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
  const mapCellListList = mainScene.runtime.mapCellListList;
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

  if(mapCellListList!=null){
    const LEN0 = mapCellListList.length;
    const LEN1 = mapCellListList[0].length;
    const ROT = SmzCommon.randInt(4);
    var xx=0;var xy=0;var yx=0;var yy=0;
    if(ROT==0)     {xx=1; xy=0; yx=0; yy=1; }
    else if(ROT==1){xx=0; xy=1; yx=-1;yy=0; }
    else if(ROT==1){xx=0; xy=-1;yx=1; yy=0; }
    else           {xx=-1;xy=0; yx=0; yy=-1;}
    const SHIFT0 = SmzCommon.randInt(LEN0);
    const SHIFT1 = SmzCommon.randInt(LEN1);
    for(const cell of cellGroupGameObj.cellGroup.children){
      const MX = (cell.gx*xx+cell.gy*yx+SHIFT1+LEN1*3)%LEN1;
      const MY = (cell.gx*xy+cell.gy*yy+SHIFT0+LEN0*3)%LEN0;
      var mapCell = mapCellListList[MY][MX];
      //if(mapCell=='X'){mapCell=9;}
      cell.setNBlockTexture(mapCell,SmzCommon.randInt(4));
    }
  }else{
    for(const cell of cellGroupGameObj.cellGroup.children){
      cell.setNBlockTexture(SmzCommon.randInt(10),SmzCommon.randInt(4));
    }
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
