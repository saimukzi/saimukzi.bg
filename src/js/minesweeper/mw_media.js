// import MwMedia from '/js/minesweeper/mw_media.js';

import * as PIXI from 'pixi.js';
import MwCommon from '/js/minesweeper/mw_common.js';
import SmzCommon from '/js/smz/smz_common.js';
import MineSweeper from '/js/minesweeper/minesweeper.js';

'use strict';

export const MwMedia = (function(){

const MwMedia = {};

const PHI2 = Math.pow((SmzCommon.PHI-1), 0.5);

MwMedia.initMediaAsync = async function(runtime){
  const renderer = runtime.app.renderer;
  //const renderer = runtime.renderer;
  console.log(renderer);
  
  runtime.pRoundBoxTexture = MwMedia.createRoundBoxTexture(renderer, MwCommon.COLOR_00, MwCommon.COLOR_P1, 128);

  runtime.logoTexture = MwMedia.createLogoTexture(renderer, MwCommon.COLOR_00, MwCommon.COLOR_N1, 128);

  await new Promise((res,rej)=>{
    runtime.digitBaseTexture = PIXI.BaseTexture.from('assets/digit.png');
    runtime.digitBaseTexture.on('loaded',res);
  });

  var map_txt = await fetch('/assets/map.txt');
  console.log(map_txt);
  if(map_txt.ok){
    map_txt = await map_txt.text();
    console.log(map_txt);
    map_txt = map_txt.replaceAll("\r\n","\n");
    map_txt = map_txt.split("\n");
    map_txt = map_txt.filter((r)=>{return r.length>0;});
    console.log(map_txt);
    map_txt = MineSweeper.calc(map_txt);
    console.log(map_txt);
    runtime.map_txt = map_txt;
  }else{
    console.log("Load map failed");
    map_txt = null;
    runtime.map_txt = null;
  }

  //runtime.nRoundBoxTexture = MwMedia.createRoundBoxDigitTexture(renderer, MwCommon.COLOR_00, MwCommon.COLOR_N1, runtime.digitBaseTexture, new PIXI.Rectangle(0,0,256,256), 128);
  runtime.nRoundBoxTextureList = [];
  for(let i=0;i<4;++i)for(let j=0;j<4;++j){
    runtime.nRoundBoxTextureList.push(
      MwMedia.createRoundBoxDigitTexture(renderer, MwCommon.COLOR_00, MwCommon.COLOR_N1, runtime.digitBaseTexture, new PIXI.Rectangle(j*256,i*256,256,256), 128)
    );
  }
};

MwMedia.createRoundBoxDigitTexture = function(renderer, bgColor, fgColor, baseTexture, textureUvRect, size){
  const ret = PIXI.RenderTexture.create({width:size,height:size});
  

  var tmpDo;
  var tmpTx;

  tmpDo = new PIXI.Graphics();
  tmpDo.beginFill(bgColor);
  tmpDo.drawRect(0,0,size,size);
  tmpDo.endFill();
  renderer.render(tmpDo, {renderTexture:ret} );
  tmpDo.destroy();

  tmpDo = MwMedia.createRoundBoxGraphics(fgColor,size);
  tmpDo.position.x = size/2;
  tmpDo.position.y = size/2;
  renderer.render(tmpDo, {renderTexture:ret, clear:false} );
  tmpDo.destroy();

  tmpTx = new PIXI.Texture(baseTexture,textureUvRect);
  tmpDo = new PIXI.Sprite(tmpTx);
  tmpDo.position.x = size*(1-PHI2)/2;
  tmpDo.position.y = size*(1-PHI2)/2;
  tmpDo.width = size*PHI2;
  tmpDo.height = size*PHI2;
  tmpDo.tint = bgColor;
  renderer.render(tmpDo, {renderTexture:ret, clear:false} );
  tmpDo.destroy();
  tmpTx.destroy();
  
  return ret;
};

MwMedia.createRoundBoxTexture = function(renderer, bgColor, fgColor, size){
  const ret = PIXI.RenderTexture.create({width:size,height:size});

  var tmpGraphics;

  tmpGraphics = new PIXI.Graphics();
  tmpGraphics.beginFill(bgColor);
  tmpGraphics.drawRect(0,0,size,size);
  tmpGraphics.endFill();
  renderer.render(tmpGraphics, {renderTexture:ret} );
  tmpGraphics.destroy();

  tmpGraphics = MwMedia.createRoundBoxGraphics(fgColor,size);
  tmpGraphics.position.x = size/2;
  tmpGraphics.position.y = size/2;
  renderer.render(tmpGraphics, {renderTexture:ret, clear:false} );
  tmpGraphics.destroy();
  
  //console.log(ret);
  
  return ret;
};

MwMedia.createRoundBoxGraphics = function(color,size){
  const RADIUS = (2-SmzCommon.PHI)/2;
  const OFFSET = (1-SmzCommon.PHI)/2;

  const ret = new PIXI.Graphics();
  ret.beginFill(color);
  ret.drawRoundedRect(-0.5*size,-0.5*size,1*size,1*size,RADIUS*size);
  ret.endFill();
  return ret;
};

MwMedia.createLogoTexture = function(renderer, bgColor, fgColor, size){
  const ret = PIXI.RenderTexture.create({width:size,height:size});
  var tmpGraphics;
  
  tmpGraphics = new PIXI.Graphics();
  tmpGraphics.clear();
  tmpGraphics.beginFill(bgColor);
  tmpGraphics.drawRect(0,0,size,size);
  tmpGraphics.endFill();
  renderer.render(tmpGraphics, {renderTexture:ret} );
  tmpGraphics.destroy();

  tmpGraphics = MwMedia.createRoundBoxGraphics(fgColor,size);
  tmpGraphics.position.x = size/2;
  tmpGraphics.position.y = size/2;
  renderer.render(tmpGraphics, {renderTexture:ret, clear:false} );
  tmpGraphics.destroy();

  tmpGraphics = new PIXI.Graphics();

  tmpGraphics.clear();
  tmpGraphics.beginFill(bgColor);
  tmpGraphics.drawCircle(size/2,size/2,size*PHI2/2);
  tmpGraphics.endFill();
  renderer.render(tmpGraphics, {renderTexture:ret, clear:false} );

  // tmpGraphics.clear();
  // tmpGraphics.beginFill(fgColor);
  // tmpGraphics.drawCircle(size*(1/2+PHI2/4),size/2,size*PHI2/4);
  // tmpGraphics.endFill();
  // renderer.render(tmpGraphics, {renderTexture:ret, clear:false} );
  // 
  // tmpGraphics.clear();
  // tmpGraphics.beginFill(fgColor);
  // tmpGraphics.arc(size*(1/2-PHI2/4),size/2-size*PHI2*PHI2/3/Math.PI,size*PHI2*PHI2/4,0,Math.PI);
  // tmpGraphics.endFill();
  // renderer.render(tmpGraphics, {renderTexture:ret, clear:false} );

  tmpGraphics.destroy();

  return ret;
};

return MwMedia;

})();

export default MwMedia;
