/*=============================================================================
 CSVN_increaseVarOnPlayerWalk.js
----------------------------------------------------------------------------
 (C)2021 cursed_steven
 This software is released under the MIT License.
 http://opensource.org/licenses/mit-license.php
----------------------------------------------------------------------------
 Version
 1.0.0 2021/08/07 初版
----------------------------------------------------------------------------
 [Twitter]: https://twitter.com/cursed_steven
=============================================================================*/

/*:
 * @target MZ
 * @plugindesc Set up variables that increase or decrease as the player walks.
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @author cursed_steven
 * @url https://note.com/cursed_steven/n/nd1bd4786b28d
 *
 * @help CSVN_increaseVarOnPlayerWalk.js
 *
 * Set up variables that increase or decrease as the player walks.
 * Up to 3 for the time being.
 *
 * When the switch[adminSwitchId1] is turned ON, the variable [adminVarId1]
 * increases or decreases by the variable[stepVarId1] for each step.
 *
 * With the plug-in command "Start increase / decrease",
 * * Which of the three variables should be turned on
 * * Variable increase / decrease value (absolute value)
 * * Sign of increase / decrease of variable (true: increase / false: decrease)
 * decide and start increasing or decreasing.
 *
 * Not implemented something like the plug-in command "stop increase / decrease".
 * Please turn off the corresponding switch in some way.
 *
 * Terms:
 *  No permission needed for change or re-distribute this plugin.
 *  But I will be glad to being informed you used or reffered this.
 *
 * @param adminVarId1
 * @text ID1 of the variable to be managed
 * @desc ID1 of the variable that puts the ID of the variable that manages the increase / decrease
 * @type variable
 *
 * @param adminVarId2
 * @text ID2 of the variable to be managed
 * @desc ID2 of the variable that puts the ID of the variable that manages the increase / decrease
 * @type variable
 *
 * @param adminVarId3
 * @text ID3 of the variable to be managed
 * @desc ID3 of the variable that puts the ID of the variable that manages the increase / decrease
 * @type variable
 *
 * @param adminSwitchId1
 * @text adminVarId1 is being managed
 * @desc Switch to enter whether variable[adminVarId1] is being managed
 * @type switch
 *
 * @param adminSwitchId2
 * @text adminVarId2 is being managed
 * @desc Switch to enter whether variable[adminVarId2] is being managed
 * @type switch
 *
 * @param adminSwitchId3
 * @text adminVarId3 is being managed
 * @desc Switch to enter whether variable[adminVarId3] is being managed
 * @type switch
 *
 * @param stepVarId1
 * @text var Id 1 to be put step value 1
 * @desc var Id 1 to be put step value 1
 * @type variable
 *
 * @param stepVarId2
 * @text var Id 2 to be put step value 2
 * @desc var Id 2 to be put step value 2
 * @type variable
 *
 * @param stepVarId3
 * @text var Id 3 to be put step value 3
 * @desc var Id 3 to be put step value 3
 * @type variable
 *
 * @command start
 * @text start increase/decrease
 * @desc
 *
 * @arg selectVar
 * @text Which variable to start managing
 * @type select
 * @option 1
 * @value 1
 * @option 2
 * @value 2
 * @option 3
 * @value 3
 *
 * @arg step
 * @text step value
 * @desc Value that increases or decreases in one step
 * @type number
 *
 * @arg sign
 * @text increase/decrease
 * @type boolean
 * @on increase
 * @off decrease
 */

/*:ja
 * @target MZ
 * @plugindesc プレイヤーが歩くごとに増減する変数を設定／解除します。
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @author ノロワレ
 * @url https://note.com/cursed_steven/n/nd1bd4786b28d
 *
 * @help CSVN_increaseVarOnPlayerWalk.js
 *
 * プレイヤーが歩くごとに増減する変数を設定／解除します。
 * とりあえず３つまで。
 *
 * スイッチ[変数1管理中]をONにすると、１歩ごとに
 * 変数[管理対象変数1]が、変数[管理対象増減値1]ずつ増減します。
 *
 * プラグインコマンド「増減開始」で、
 * ・３つのうちどの変数の増減をONにするか
 * ・変数の増減値(絶対値)
 * ・変数の増減の符号(true:増える／false:減る)
 * を決めて増減を開始します。
 *
 * プラグインコマンド「増減停止」のようなものは実装していません。
 * 該当のスイッチをなんらかの方法でOFFにしてください。
 *
 * 利用規約：
 *  作者に無断で改変、再配布が可能で、利用形態（商用、18禁利用等）
 *  についても制限はありません。
 *  このプラグインはもうあなたのものです。
 *  が、使ったとか参考にしたとか伝えてもらえると喜びます。
 *
 * @param adminVarId1
 * @text 管理対象変数ID1
 * @desc 増減を管理する変数のIDを入れる変数のID1
 * @type variable
 *
 * @param adminVarId2
 * @text 管理対象変数ID2
 * @desc 増減を管理する変数のIDを入れる変数のID2
 * @type variable
 *
 * @param adminVarId3
 * @text 管理対象変数ID3
 * @desc 増減を管理する変数のIDを入れる変数のID3
 * @type variable
 *
 * @param adminSwitchId1
 * @text 変数1管理中
 * @desc 管理対象変数1を管理中かを入れるスイッチ
 * @type switch
 *
 * @param adminSwitchId2
 * @text 変数2管理中
 * @desc 管理対象変数2を管理中かを入れるスイッチ
 * @type switch
 *
 * @param adminSwitchId3
 * @text 変数3管理中
 * @desc 管理対象変数3を管理中かを入れるスイッチ
 * @type switch
 *
 * @param stepVarId1
 * @text 管理対象増減値1
 * @desc 管理対象変数1が1歩で増減する値を入れる変数のID
 * @type variable
 *
 * @param stepVarId2
 * @text 管理対象増減値2
 * @desc 管理対象変数2が1歩で増減する値を入れる変数のID
 * @type variable
 *
 * @param stepVarId3
 * @text 管理対象増減値3
 * @desc 管理対象変数3が1歩で増減する値を入れる変数のID
 * @type variable
 *
 * @command start
 * @text 増減開始
 * @desc
 *
 * @arg selectVar
 * @text どの変数の管理を始めるか
 * @type select
 * @option 管理対象変数1
 * @value 1
 * @option 管理対象変数2
 * @value 2
 * @option 管理対象変数3
 * @value 3
 *
 * @arg step
 * @text 1歩で増減する値
 * @type number
 *
 * @arg sign
 * @text 正負
 * @type boolean
 * @on プラス
 * @off マイナス
 */

(() => {
    'use strict';
    const params = PluginManagerEx.createParameter(document.currentScript);
    PluginManagerEx.registerCommand(document.currentScript, 'start', args => {
        startAdmin(args.selectVar, args.step, args.sign);
    });
    PluginManagerEx.registerCommand(document.currentScript, 'stop', args => {
        stopAdmin(args.selectVar);
    });

    function startAdmin(selectVar, step, bool) {
        let targetVarSwitchId, targetStepVarId;
        const sign = bool ? 1 : -1;
        switch (selectVar) {
            case 1:
                targetVarSwitchId = params.adminSwitchId1;
                targetStepVarId = params.stepVarId1;
                break;
            case 2:
                targetVarSwitchId = params.adminSwitchId2;
                targetStepVarId = params.stepVarId2;
                break;
            case 3:
                targetVarSwitchId = params.adminSwitchId3;
                targetStepVarId = params.stepVarId3;
                break;
        }
        $gameSwitches.setValue(targetVarSwitchId, true);
        $gameVariables.setValue(targetStepVarId, step * sign);
    }

    function stopAdmin(selectVar) {
        let targetVarSwitchId;
        switch (selectVar) {
            case 1:
                targetVarSwitchId = params.adminSwitchId1;
                break;
            case 2:
                targetVarSwitchId = params.adminSwitchId2;
                break;
            case 3:
                targetVarSwitchId = params.adminSwitchId3;
                break;
        }
        $gameSwitches.setValue(targetVarSwitchId, false);
    }

    const _Game_Party_onPlayerWalk = Game_Party.prototype.onPlayerWalk;
    Game_Party.prototype.onPlayerWalk = function() {
        _Game_Party_onPlayerWalk.call(this);

        let val;
        if ($gameSwitches.value(params.adminSwitchId1)) {
            val = $gameVariables.value(params.adminVarId1);
            val += $gameVariables.value(params.stepVarId1);
            $gameVariables.setValue(params.adminVarId1, val);
        }
        if ($gameSwitches.value(params.adminSwitchId2)) {
            val = $gameVariables.value(params.adminVarId2);
            val += $gameVariables.value(params.stepVarId2);
            $gameVariables.setValue(params.adminVarId2, val);
        }
        if ($gameSwitches.value(params.adminSwitchId3)) {
            val = $gameVariables.value(params.adminVarId3);
            val += $gameVariables.value(params.stepVarId3);
            $gameVariables.setValue(params.adminVarId3, val);
        }
    };
})();