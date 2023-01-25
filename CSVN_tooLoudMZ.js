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
 * @param rate
 * @text 比率
 * @desc すべての音量がこの値％になります。
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