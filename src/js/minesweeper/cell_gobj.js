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
    self.pBlock.position.x = -0.5;
    self.pBlock.position.y = -0.5;
    self.scaleContainer.addChild(self.pBlock);

    //self.nBlock = PIXI.Sprite.from(runtime.nRoundBoxTexture);
    //self.nBlock.width = 1;
    //self.nBlock.height = 1;
    //self.nBlock.position.x = -0.5;
    //self.nBlock.position.y = -0.5;
    //self.scaleContainer.addChild(self.nBlock);
  };

};

return CellGameObject;

})();

export default CellGameObject;
