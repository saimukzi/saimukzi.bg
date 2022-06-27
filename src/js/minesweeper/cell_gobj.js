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
    
    self.block = new PIXI.Graphics();
    self.block.beginFill(MwCommon.COLOR_FG);
    self.block.drawRect(100*offset,100*offset,100*phi2,100*phi2);
    self.block.endFill();
    self.addChild(self.block);
  };

};

return CellGameObject;

})();

export default CellGameObject;
