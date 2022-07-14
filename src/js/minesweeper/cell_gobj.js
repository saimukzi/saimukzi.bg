// import CellGameObject from '/js/minesweeper/cell_gobj.js';

import * as smz_game_object from '/js/smz/smz_game_object.js';
import * as PIXI from 'pixi.js';
import SmzCommon from '/js/smz/smz_common.js';
import MwCommon from '/js/minesweeper/mw_common.js';
import MwMedia from '/js/minesweeper/mw_media.js';

'use strict';

export const CellGameObject = (function(){

class CellGameObject extends smz_game_object.SmzGameObject {

  constructor(runtime){
    super(runtime);
    const self = this;
    
    const phi2 = Math.pow(SmzCommon.PHI-1, 0.5);
    const BLOCK_RADIUS = (2-SmzCommon.PHI)/2;
    const SQRT2 = Math.pow(2, 0.5);

    self.scaleContainer = new PIXI.Container();
    self.scaleContainer.scale.x = 100*phi2;
    self.scaleContainer.scale.y = 100*phi2;
    self.scaleContainer.position.x = 50;
    self.scaleContainer.position.y = 50;
    self.addChild(self.scaleContainer);

    self.pBlock = PIXI.Sprite.from(runtime.pRoundBoxTexture);
    self.pBlock.width = 1;
    self.pBlock.height = 1;
    self.pBlock.anchor.x = 0.5;
    self.pBlock.anchor.y = 0.5;
    self.scaleContainer.addChild(self.pBlock);

    self.nBlock = PIXI.Sprite.from(PIXI.Texture.EMPTY);
    self.nBlock.width = 1;
    self.nBlock.height = 1;
    self.nBlock.anchor.x = 0.5;
    self.nBlock.anchor.y = 0.5;
    self.nBlock.visible = false;
    self.scaleContainer.addChild(self.nBlock);

    self.nBlockMaskRotate = new PIXI.Container();
    self.scaleContainer.addChild(self.nBlockMaskRotate);

    self.nBlockMask = new PIXI.Graphics();
    self.nBlockMask.beginFill(0xffffff);
    self.nBlockMask.drawRect(-SQRT2/2,-SQRT2/2,SQRT2,SQRT2);
    self.nBlockMask.endFill();
    self.nBlockMaskRotate.addChild(self.nBlockMask);
    self.nBlock.mask = self.nBlockMask;

    // self.setNBlockTexture(Math.floor(Math.random()*10),Math.floor(Math.random()*4));
  };

  setNBlockTexture(tId, dir){
    const self=this;
    self.nBlock.angle = dir*90;
    self.nBlock.texture = this.runtime.nRoundBoxTextureList[tId];
  };

  async showNBlockAsync(rad,tData){
    const self=this;

    const phi2 = Math.pow(SmzCommon.PHI-1, 0.5);
    const SQRT2 = Math.pow(2, 0.5);

    self.nBlock.visible = false;
    self.nBlockMaskRotate.rotation = rad;
    self.nBlockMask.position.x = SQRT2;
    self.nBlock.visible = true;
    return await SmzCommon.p(
      SmzCommon.linearMoveToPos,
      {
        displayObj: self.nBlockMask,
        ticker: self.runtime.app.ticker,
        x:0,y:0,
        tData:tData,deltaMs:250,
      }
    );
  };

  async hideNBlockAsync(rad,tData){
    const self=this;

    const phi2 = Math.pow(SmzCommon.PHI-1, 0.5);
    const SQRT2 = Math.pow(2, 0.5);

    self.nBlockMaskRotate.rotation = rad;
    self.nBlockMask.position.x = 0;
    self.nBlock.visible = true;
    const ret = await SmzCommon.p(
      SmzCommon.linearMoveToPos,
      {
        displayObj: self.nBlockMask,
        ticker: self.runtime.app.ticker,
        x:SQRT2,y:0,
        tData:tData,deltaMs:250,
      }
    );
    self.nBlock.visible = false;
    return ret;
  };

};

return CellGameObject;

})();

export default CellGameObject;
