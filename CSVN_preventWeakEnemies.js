/*=============================================================================
 CSVN_preventWeakEnemies.js
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
 * @plugindesc Prevent the appearance of weak enemies
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @author cursed_steven
 * @url
 *
 * @help CSVN_preventWeakEnemies.js
 *
 * Encounters with enemy groups below the average party level minus
 * the set value will be skipped while the specified switch is on.
 *
 * The level of the enemy character can be set by writing the following
 * meta tag in the memo field.
 * ex. <Lv:25>
 *
 * If the meta tag is not written, it will be treated as Lv99.
 *
 * Terms:
 *  No permission needed for change or re-distribute this plugin.
 *  But I will be glad to being informed you used or reffered this.
 *
 * @param switchId
 * @text switch ID
 * @desc Attempts to skip while this switch is ON.
 * @type switch
 *
 * @param lvDiff
 * @text Setting level difference
 * @desc Encounters with enemy groups below the average party level minus this value will be skipped while the specified switch is on.
 */

/*:ja
 * @target MZ
 * @plugindesc 弱い敵の出現を防ぐ
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @author ノロワレ
 * @url
 *
 * @help CSVN_preventWeakEnemies.js
 *
 * 指定したスイッチが入っている間、パーティーのレベルの平均を
 * 設定値以上下回る敵グループとのエンカウントはスキップされます。
 *
 * 敵キャラのレベルは、メモ欄に以下のようなメタタグを書くことで
 * 設定できます。
 * ex. <Lv:25>
 *
 * なお、メタタグを書いていない場合はLv99として扱われます。
 *
 * 利用規約：
 *  作者に無断で改変、再配布が可能で、利用形態（商用、18禁利用等）
 *  についても制限はありません。
 *  このプラグインはもうあなたのものです。
 *  が、使ったとか参考にしたとか伝えてもらえると喜びます。
 *
 * @param switchId
 * @text 有効判定スイッチID
 * @desc このスイッチがONの間スキップ試行します。
 * @type switch
 *
 * @param lvDiff
 * @text 設定レベル差
 * @desc 敵グループのLv平均がパーティのLv平均をこの設定値以上下回るとエンカウントがスキップされます。
 */

(() => {
    'use strict';
    const params = PluginManagerEx.createParameter(document.currentScript);

    const _Game_Player_executeEnounter = Game_Player.prototype.executeEncounter;
    Game_Player.prototype.executeEncounter = function() {
        if (!$gameMap.isEventRunning() && this._encounterCount <= 0) {
            if ($gameSwitches.value(params.switchId)) {
                const result = determineLvDiff(this.makeEncounterTroopId());

                this.makeEncounterCount();
                if (!result) {
                    return false;
                } else {
                    BattleManager.onEncounter();
                    return true;
                }
            }
            return _Game_Player_executeEnounter.call(this);
        }
    };

    function determineLvDiff(troopId) {
        let partyLvAve = 0;
        let troopLvAve = 0;

        const dataTroop = $dataTroops[troopId];
        if (dataTroop) {
            BattleManager.setup(troopId, true, false);

            const enemies = $gameTroop.aliveMembers();
            let lvs = 0;
            let dataEnemy;
            for (const enemy of enemies) {
                if ($dataEnemies[enemy._enemyId]) {
                    dataEnemy = $dataEnemies[enemy._enemyId];
                    lvs += Number(dataEnemy.meta.Lv ? dataEnemy.meta.Lv : 99);
                }
            }
            troopLvAve = Math.floor(lvs / enemies.length);

            const members = $gameParty.aliveMembers();
            lvs = 0;
            for (const member of members) {
                lvs += Number(member._level);
            }
            partyLvAve = Math.floor(lvs / members.length);

            return partyLvAve - troopLvAve < params.lvDiff;
        } else {
            return false;
        }
    }
})();