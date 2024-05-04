//=============================================================================
// StairMove_ko.js
// by 츠키미
// Last Updated: 2017.12.13
//=============================================================================


/*:ko
 * @plugindesc 자동 대각선 계단이동 플러그인
 * @author Tsukimi
 * 
 * @param 우측 대각선 이동
 * @desc 우축으로 대걱선 통행을 설정하는 지역타일 ID（↗↙）
 * @type number
 * @min 1
 * @max 255
 * @default 33
 * 
 * @param 좌측 대각선 이동
 * @desc 좌측으로 대걱선 통행을 설정하는 지역타일 ID（↗↙）
 * @type number
 * @min 1
 * @max 255
 * @default 34
 * 
 *
 * @help
 * 자동적으로 측면계단대각선이동이 가능하게됩니다.
 * 지역타일 설정으로 자동이동이 가능하게 됩니다.
 * 
 * -----------------
 * 
 */

var Imported = Imported || {};
Imported.TKM_StairMove = true;
var $TKMvar = $TKMvar || {};
$TKMvar.stairMove = {};

(function() {
    'use strict';
    
    var pluginName = 'StairMove_ko';
    var getParam = function(paramNames) {
        if (!Array.isArray(paramNames)) paramNames = [paramNames];
        for (var i = 0; i < paramNames.length; i++) {
            var name = PluginManager.parameters(pluginName)[paramNames[i]];
            if (name) return name;
        }
        return null;
    };
    
    $TKMvar.stairMove = {};
    // PARAMETER
    var parameters = PluginManager.parameters(pluginName);
    var temp = 0;
    $TKMvar.stairMove.regionLDRU = Number( getParam("우측 대각선 이동") ) || -1;
    $TKMvar.stairMove.regionLURD = Number( getParam("좌측 대각선 이동") ) || -1;
    
    
    var _Game_Player_executeMove = Game_Player.prototype.executeMove;
    Game_Player.prototype.executeMove = function(direction) {
        var diagonalAccess = false;
        var sm = $TKMvar.stairMove;
        
        if(this.regionId() === sm.regionLDRU || this.regionId() === sm.regionLURD) {
            if(direction === 4 || direction === 6) {
                var yDirection;
                if(this.regionId() === sm.regionLDRU) yDirection = (direction === 4) ? 2 : 8;
                else yDirection = (direction === 4) ? 8 : 2;
                
                var x2 = $gameMap.roundXWithDirection(this.x, direction);
                var y2 = $gameMap.roundYWithDirection(this.y, yDirection);
                if($gameMap.regionId(x2, y2) === this.regionId()) {
                    diagonalAccess = true;
                    this._direction = direction;
                    this.moveDiagonally(direction, yDirection);
                }
            }
        }
        
        if(!diagonalAccess) {
            _Game_Player_executeMove.apply(this, arguments);
        }
    }
    /* TODO
    Game_Player.prototype.moveDiagonally = function(horz, vert) {
        Game_CharacterBase.prototype.moveDiagonally.apply(this, arguments);
        
        if(!this.isMovementSucceeded()) {
            var sm = $TKMvar.stairMove;
            var direction = this._direction;
            
            if(this.regionId() === sm.regionLDRU || this.regionId() === sm.regionLURD) {
                if(direction === 4 || direction === 6) {
                    var yDirection = 0;
                    if(this.regionId() === sm.regionLDRU) yDirection = (direction === 4) ? 2 : 8;
                    else yDirection = (direction === 4) ? 8 : 2;

                    var x2 = $gameMap.roundXWithDirection(this.x, direction);
                    var y2 = $gameMap.roundYWithDirection(this.y, yDirection);
                    if($gameMap.regionId(x2, y2) === this.regionId()) this.checkEventTriggerTouch(x2, y2);
                }
            }
        }
    }
    */
})();
