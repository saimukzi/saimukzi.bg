// import MwMedia from '/js/minesweeper/mw_media.js';

import * as PIXI from 'pixi.js';
import MwCommon from '/js/minesweeper/mw_common.js';
import SmzCommon from '/js/smz/smz_common.js';

'use strict';

export const MwMedia = (function(){

const MwMedia = {};

MwMedia.initMedia = function(runtime){
  const renderer = runtime.app.renderer;
  //const renderer = runtime.renderer;
  console.log(renderer);
  
  runtime.pRoundBoxTexture = MwMedia.createRoundBoxTexture(renderer, MwCommon.COLOR_00, MwCommon.COLOR_P1, 128);
  runtime.nRoundBoxTexture = MwMedia.createRoundBoxTexture(renderer, MwCommon.COLOR_00, MwCommon.COLOR_N1, 128);
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
  renderer.render(tmpGraphics, ret, false );
  tmpGraphics.destroy();
  
  console.log(ret);
  
  return ret;
};

MwMedia.createRoundBoxGraphics = function(color,size){
  const RADIUS = (2-SmzCommon.PHI)/2;
  const OFFSET = (1-SmzCommon.PHI)/2;

  const ret = new PIXI.Graphics();
  ret.beginFill(color);
  ret.drawRect((1-SmzCommon.PHI)*size/2,-0.5*size,(SmzCommon.PHI-1)*size,1*size);
  ret.drawRect(-0.5*size,(1-SmzCommon.PHI)*size/2,1*size,(SmzCommon.PHI-1)*size);
  ret.drawCircle(-OFFSET*size,-OFFSET*size,RADIUS*size);
  ret.drawCircle(-OFFSET*size,+OFFSET*size,RADIUS*size);
  ret.drawCircle(+OFFSET*size,-OFFSET*size,RADIUS*size);
  ret.drawCircle(+OFFSET*size,+OFFSET*size,RADIUS*size);
  ret.endFill();
  return ret;
};

return MwMedia;

})();

export default MwMedia;
