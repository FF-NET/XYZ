//=============================================================================
// This RPG Maker Plugin is generated by rmmzp
//=============================================================================

/*:
 * @target MZ
 * @plugindesc (v1.0.4) 8 direction movement and pixel movement for RPG Maker MZ.
 * @author gsioteam
 */
!function(){return function t(e,s,i){function r(h,n){if(!s[h]){if(!e[h]){var a="function"==typeof require&&require;if(!n&&a)return a(h,!0);if(o)return o(h,!0);var c=new Error("Cannot find module '"+h+"'");throw c.code="MODULE_NOT_FOUND",c}var _=s[h]={exports:{}};e[h][0].call(_.exports,function(t){return r(e[h][1][t]||t)},_,_.exports,t,e,s,i)}return s[h].exports}for(var o="function"==typeof require&&require,h=0;h<i.length;h++)r(i[h]);return r}}()({1:[function(t,e,s){const{Game_Player:i,Input:r,Game_CharacterBase:o}=t("rmmz"),h=o.prototype.isMoving;o.prototype.isMoving=function(){return!!this._movePressing||h.call(this)},i.prototype.updateDashing=function(){this.isMoving()&&!this._movePressing||(!this.canMove()||this.isInVehicle()||$gameMap.isDashDisabled()?this._dashing=!1:this._dashing=this.isDashButtonPressed()||$gameTemp.isDestinationValid())},i.prototype.moveByInput=function(){if((!this.isMoving()||this._movePressing)&&this.canMove()){let e=r.dir8;if(e>0){if($gameTemp.clearDestination(),!this._movePressing){this._resetCachePosition();var t=this._followers._data;for(let e of t)e._resetCachePosition()}return this.setMovementSuccess(!1),(e=this._moveByInput(e))>0&&this.setDirection(e),void(this.isMovementSucceeded()?(this._followersMove(0),this._movePressing=!0):(this._followersMove(2),this._movePressing=!1,this.checkEventTriggerTouchFront(e)))}if($gameTemp.isDestinationValid()){this._x=Math.round(this._x),this._y=Math.round(this._y);const t=$gameTemp.destinationX(),s=$gameTemp.destinationY();return(e=this.findDirectionTo(t,s))>0&&this.executeMove(e),void this._followersMove(1)}}this._followersMove(2),this._movePressing=!1},i.prototype._moveByInput=function(t){let e=Math.round(this._x),s=Math.round(this._y),i=this.distancePerFrame(),r=(t=0)=>this.canPass(e+t,Math.floor(this._y+i),2),o=(t=0)=>this.canPass(e+t,Math.ceil(this._y-i),8),h=(t=0)=>this.canPass(Math.ceil(this._x-i),s+t,4),n=(t=0)=>this.canPass(Math.floor(this._x+i),s+t,6),a=()=>{this.increaseSteps(),this.checkEventTriggerHere([1,2])};switch(t){case 1:{let i=h(),o=r();if(i&&o){if(h(1)){this.setMovementSuccess(!0);let t=this.distancePerFrame()/Math.SQRT2;return this._y+=t,this._x-=t,(Math.round(this._y)>s||Math.round(this._x)<e)&&a(),2}return this.x-e<s-this.y?this._moveByInput(4):this._moveByInput(2)}if(i)return this._moveByInput(4);if(o)return this._moveByInput(2);t=2;break}case 3:{let i=n(),o=r();if(i&&o){if(n(1)){this.setMovementSuccess(!0);let t=this.distancePerFrame()/Math.SQRT2;return this._y+=t,this._x+=t,(Math.round(this._y)>s||Math.round(this._x)>e)&&a(),2}return e-this.x<s-this.y?this._moveByInput(6):this._moveByInput(2)}if(i)return this._moveByInput(6);if(o)return this._moveByInput(2);t=2;break}case 7:{let i=h(),r=o();if(i&&r){if(h(-1)){this.setMovementSuccess(!0);let t=this.distancePerFrame()/Math.SQRT2;return this._y-=t,this._x-=t,(Math.round(this._y)<s||Math.round(this._x)<e)&&a(),8}return this.x-e<this.y-s?this._moveByInput(4):this._moveByInput(8)}if(i)return this._moveByInput(4);if(r)return this._moveByInput(8);t=8;break}case 9:{let i=n(),r=o();if(i&&r){if(n(-1)){this.setMovementSuccess(!0);let t=this.distancePerFrame()/Math.SQRT2;return this._y-=t,this._x+=t,(Math.round(this._y)<s||Math.round(this._x)>e)&&a(),8}return e-this.x<this.y-s?this._moveByInput(6):this._moveByInput(8)}if(i)return this._moveByInput(6);if(r)return this._moveByInput(8);t=8;break}case 2:if(r())return this.setMovementSuccess(!0),this._y+=this.distancePerFrame(),Math.round(this._y)>s&&a(),(this._x>e&&!r(1)||this._x<e&&!r(-1))&&(this._x=e),t;break;case 8:if(o())return this.setMovementSuccess(!0),this._y-=this.distancePerFrame(),Math.round(this._y)<s&&a(),(this._x>e&&!o(1)||this._x<e&&!o(-1))&&(this._x=e),t;break;case 4:if(h())return this.setMovementSuccess(!0),this._x-=this.distancePerFrame(),Math.round(this._x)<e&&a(),(this._y>s&&!h(1)||this._y<s&&!h(-1))&&(this._y=s),t;break;case 6:if(n())return this.setMovementSuccess(!0),this._x+=this.distancePerFrame(),Math.round(this._x)>e&&a(),(this._y>s&&!n(1)||this._y<s&&!n(-1))&&(this._y=s),t}return t},i.prototype._followersMove=function(t){this._recordPosition();var e=this._followers._data;if(0===t)for(let t=e.length-1;t>=0;t--){let s=(t>0?e[t-1]:$gamePlayer)._lastPosition();if(s){let i=e[t];Math.abs(s.y-i._y)>Math.abs(s.x-i._x)?s.y>i._y?i.setDirection(2):s.y<i._y&&i.setDirection(8):s.x>i._x?i.setDirection(6):s.x<i._x&&i.setDirection(4),i._x=s.x,i._y=s.y,i._movePressing=!0,i._recordPosition()}}else for(let s of e)1===t&&(s._x=Math.round(s.x),s._y=Math.round(s.y)),s._movePressing=!1,s._recordPosition()},o.prototype._resetCachePosition=function(){this._posRecords=[]},o.prototype._recordPosition=function(){this._posRecords||(this._posRecords=[]);let t=this._recentPosition();let e=function(t,e){if(!t||!e)return 0;let s=t.x-e.x,i=t.y-e.y;return Math.sqrt(s*s+i*i)}(t,this);if(e>2)this._resetCachePosition();else if(!t||e>.1)for(this._posRecords.push({x:this.x,y:this.y});this._posRecords.length>10;)this._posRecords.shift()},o.prototype._lastPosition=function(){if(this._posRecords&&this._posRecords.length>0)return this._posRecords[0]},o.prototype._recentPosition=function(){if(this._posRecords&&this._posRecords.length>0)return this._posRecords[this._posRecords.length-1]},i.prototype.checkEventTriggerHere=function(t){this.canStartLocalEvents()&&this.startMapEvent(Math.round(this.x),Math.round(this.y),t,!1)};const n=i.prototype.checkEventTriggerThere;i.prototype.checkEventTriggerThere=function(){this._x=Math.round(this.x),this._y=Math.round(this.y),n.call(this,...arguments)};const a=i.prototype.checkEventTriggerTouch;i.prototype.checkEventTriggerTouch=function(t,e){let s=Math.round(t),i=Math.round(e);return Math.abs(s-t)<.3&&Math.abs(i-e)<.3&&a.call(this,s,i)};const c=Game_Character.prototype.processMoveCommand;Game_Character.prototype.processMoveCommand=function(){return this._movePressing=!1,this._x=Math.round(this.x),this._y=Math.round(this.y),c.call(this,...arguments)}},{rmmz:2}],2:[function(t,e,s){e.exports=window},{}]},{},[1]);