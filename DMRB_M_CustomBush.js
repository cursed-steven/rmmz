"use strict";
/*:en
 * @target MZ
 * @plugindesc Customize sprites for bush.
 * @author cursed_steven
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 *
 * @help
 * RPG Maker MZ - DMRB_M_CustomBush.ts
 * ----------------------------------------------------------------------------
 * (C)2025 cursed_steven
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * ----------------------------------------------------------------------------
 * Version
 * 1.0.0  2025/xx/xx First release.
 * ----------------------------------------------------------------------------
 * [Twitter]: https://twitter.com/cursed_steven
 *
 * @param bushDepth
 * @text Bush depth(%)
 * @desc if 25, then depth will be 25% of tile height.
 * @type number
 * @min 0
 * @max 100
 *
 * @param bushOpacity
 * @text Bush opacity
 * @desc 0 to be transparent, 255 to be opaque.
 * @type number
 * @min 0
 * @max 255
 */
/*:ja
 * @target MZ
 * @plugindesc 茂みの描画のカスタマイズ
 * @author cursed_steven
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 *
 * @help
 * RPG Maker MZ - DMRB_M_CustomBush.ts
 * ----------------------------------------------------------------------------
 * (C)2025 cursed_steven
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * ----------------------------------------------------------------------------
 * Version
 * 1.0.0  2025/xx/xx 初版
 * ----------------------------------------------------------------------------
 * [Twitter]: https://twitter.com/cursed_steven
 *
 * @param bushDepth
 * @text 茂みの深さ(%)
 * @desc 25にすると深さがタイルサイズの25%になります。
 * @type number
 * @min 0
 * @max 100
 *
 * @param bushOpacity
 * @text 茂みの中の不透明度
 * @desc 0にすると透明、255にすると不透明になります。
 * @type number
 * @min 0
 * @max 255
 */
const cbPp = PluginManagerEx.createParameter(document.currentScript);
Game_Map.prototype.bushDepth = function () {
    return (this.tileHeight() * cbPp.bushDepth) / 100;
};
const _Sprite_Character_createGalfBodySprites_cb = Sprite_Character.prototype.createHalfBodySprites;
Sprite_Character.prototype.createHalfBodySprites = function () {
    _Sprite_Character_createGalfBodySprites_cb.call(this);
    this._lowerBody.opacity = cbPp.bushOpacity;
};
