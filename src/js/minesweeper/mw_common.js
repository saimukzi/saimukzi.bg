// import MwCommon from '/js/minesweeper/mw_common.js';

'use strict';

export const MwCommon = (function(){

const MwCommon = {};

MwCommon.SCREEN_WIDTH = 1920;
MwCommon.SCREEN_HEIGHT = 1080;

MwCommon.CELL_ROWCOL_COUNT = 20;
MwCommon.CELL_SIZE = 100;
MwCommon.CELL_MOVE_DEC = 1000;

MwCommon.CELL_MOVE_MAX = 4;

MwCommon.COLOR_N1 = 0x777777;
MwCommon.COLOR_00 = 0x7f7f7f;
MwCommon.COLOR_P1 = 0x878787;

return MwCommon;

})();

export default MwCommon;
