// import CellGameObject from '/js/minesweeper/cell_gobj.js';

import * as smz_game_object from '/js/smz/smz_game_object.js';
import * as PIXI from 'pixi.js';
import SmzCommon from '/js/smz/smz_common.js';
import MwCommon from '/js/minesweeper/mw_common.js';

'use strict';

export const CellGameObject = (function(){

class CellGameObject extends smz_game_object.SmzGameObject {

  constructor(runtime){
    super(runtime);
    const self = this;
    
    const phi2 = Math.pow(SmzCommon.PHI-1, 0.5);
    const offset = (1-phi2)/2;
    const SQRT2 = Math.pow(2, 0.5);

    self.scaleContainer = new PIXI.Container();
    self.scaleContainer.scale.x = 100*phi2;
    self.scaleContainer.scale.y = 100*phi2;
    self.scaleContainer.position.x = 50;
    self.scaleContainer.position.y = 50;
    self.addChild(self.scaleContainer);

    self.nBlock = new PIXI.Graphics();
    self.nBlock.beginFill(MwCommon.COLOR_N1);
    self.nBlock.drawRect(-0.5,-0.5,1,1);
    self.nBlock.endFill();
    self.scaleContainer.addChild(self.nBlock);

    self.maskContainer = new PIXI.Container();
    self.scaleContainer.addChild(self.maskContainer);

    self.block = new PIXI.Graphics();
    self.block.beginFill(MwCommon.COLOR_P1);
    self.block.drawRect(-SQRT2/2,-SQRT2/2,SQRT2,SQRT2);
    self.block.endFill();
    self.block.angle = 45;
    self.maskContainer.addChild(self.block);

    var mask = new PIXI.Graphics();
    mask.beginFill(0xffffff);
    mask.drawRect(-0.5,-0.5,1,1);
    mask.endFill();
    self.maskContainer.mask = mask;
    self.maskContainer.addChild(mask);
  };

};

return CellGameObject;

})();

export default CellGameObject;
