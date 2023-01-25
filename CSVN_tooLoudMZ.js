//=============================================================================
// RPG Maker MZ - CSVN_tooLoudMZ
// ----------------------------------------------------------------------------
// (C)2023 cursed_twitch
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0  2023/01/25 初版
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/cursed_twitch
//=============================================================================

/*:ja
 * @target MZ
 * @plugindesc すべての音量を共通の比率で調節します。
 * @author cursed_twitch
 * @base CSVN_base
 * @orderAfter CSVN_base
 * 
 * @help CSVN_tooLoudMZ.js
 * 
 * ゲーム中の音量がすべて、コンフィグの音量×この値の音量になります。
 * ex. コンフィグ80%でこのプラグイン50% = コンフィグ40%相当
 * 
 * @param rate
 * @text 比率
 * @max 200
 * @min 5
 * @type number
 * @default 50
 */

(() => {

    'use strict';
    const script = document.currentScript;
    const param = PluginManagerEx.createParameter(script);

    const _ConfigManager_readVolume = ConfigManager.readVolume;
    ConfigManager.readVolume = function (config, name) {
        const orgValue = _ConfigManager_readVolume.call(this, config, name);

        return orgValue * param.rate / 100;
    };

})();