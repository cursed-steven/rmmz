/*=============================================================================
 CSVN_randomEnemies.js
----------------------------------------------------------------------------
 (C)2020 munokura
 (C)2021 cursed_steven
 This software is released under the MIT License.
 http://opensource.org/licenses/mit-license.php
----------------------------------------------------------------------------
 Version
 1.0.0 2021/08/05 初版
----------------------------------------------------------------------------
 [Twitter]: https://twitter.com/cursed_steven
=============================================================================*/

/*:
 * @target MZ
 * @author munokura(+cursed_steven)
 * @url https://note.com/cursed_steven/n/n097b817e4856
 * @plugindesc Randomly replace the enemy characters in the enemy group.
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @help Randomly replace the enemy characters in the enemy group.
 *
 * Please put the tag as below in the memo field of the enemy character.
 * <RandomEnemy:enemyID>
 * <RandomEnemy:enemyID,enemyID,enemyID>
 * 0 is to be hidden.
 *
 * 例
 * <RandomEnemy:0,0,1,1,2,3>
 *
 * Warning！
 * Do not use the tags below as they will cause an infinite loop.
 * <RandomEnemy:0>
 *
 * At the beginning of the battle, the enemy images are rearranged evenly,
 * taking into account the amount hidden at 0.
 * However, it is premised on the front view.
 * Also, since the enemy image for that purpose is preloaded,
 * it may be that there are too many images or it is heavy.
 * I excluded MV from target because I don't have an environment.
 * If you can confirm it, please try it.
 *
 * No command implemented.
 *
 * This plugin is based on MNKR_RandomEnemies.js (v.1.0.4) by munokura.
 *
 * Terms:
 *  No permission needed for change or re-distribute this plugin.
 *  But I will be glad to being informed you used or reffered this.
 *
 * @param enemyIdFrom
 * @text enemyIDFrom
 * @desc Preload range(From)
 * @type number
 *
 * @param enemyIdTo
 * @text 敵キャラIDTo
 * @desc Preload range(To)
 * @type number
 */

/*:
 * @target MZ
 * @author ムノクラ(+ノロワレ)
 * @url https://note.com/cursed_steven/n/n097b817e4856
 * @plugindesc 敵グループの敵キャラをランダムに入れ替えます。
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @help 敵グループの敵キャラをランダムに入れ替えます。
 *
 * 敵キャラのメモ欄に下記のようにタグを入れてください。
 * <RandomEnemy:敵キャラID>
 * <RandomEnemy:敵キャラID,敵キャラID,敵キャラID>
 * 0は非表示になります。
 *
 * 例
 * <RandomEnemy:0,0,1,1,2,3>
 *
 * 注意！
 * 下記のタグは無限ループが発生するため、使用しないでください。
 * <RandomEnemy:0>
 *
 * 戦闘開始時エネミー画像は、0で非表示になった分を考慮して均等に並べ直されます。
 * ただし、フロントビュー前提です。
 * また、そのためのエネミー画像をプリロードするので、画像が
 * あまり多いとか重いとかだとアレかもしれません。
 * また、MVはウチに環境がないので target からは除外しました。
 * 確認可能な方はしてみてください。
 *
 * プラグインコマンドはありません。
 *
 * このプラグインは munokura =サン作の MNKR_RandomEnemies.js (v.1.0.4)を
 * ベースにかいはつされています。
 *
 * 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 *
 * @param enemyIdFrom
 * @text 敵キャラIDFrom
 * @desc 画像をプリロードする敵キャラIDの範囲(From)
 * @type number
 *
 * @param enemyIdTo
 * @text 敵キャラIDTo
 * @desc 画像をプリロードする敵キャラIDの範囲(To)
 * @type number
 */

(() => {

    'use strict';
    const params = PluginManagerEx.createParameter(document.currentScript);

    const _Scene_Boot_onDatabaseLoaded = Scene_Boot.prototype.onDatabaseLoaded;
    Scene_Boot.prototype.onDatabaseLoaded = function() {
        _Scene_Boot_onDatabaseLoaded.call(this);

        ImageManager.preloadEnemyImages(params.enemyIdFrom, params.enemyIdTo);
    };

    const _Scene_Map_create = Scene_Map.prototype.create;
    Scene_Map.prototype.create = function() {
        _Scene_Map_create.call(this);

        ImageManager.preloadEnemyImages(params.enemyIdFrom, params.enemyIdTo);
    };

    ImageManager.preloadEnemyImages = function(from, to) {
        for (let enemyId = from; enemyId <= to; enemyId++) {
            const dataEnemy = $dataEnemies[enemyId];
            if (dataEnemy) {
                this.loadEnemy(dataEnemy.battlerName);
            }
        }
    };

    const _Game_Troop_setup = Game_Troop.prototype.setup;
    Game_Troop.prototype.setup = function (troopId) {
        _Game_Troop_setup.call(this, troopId);
        var condition = true;
        while (condition) {
            this.clear();
            this._troopId = troopId;
            this._enemies = [];

            let randomEnemyId = 0;
            let enemyIds = [];
            let gameEnemy, dataEnemy;
            let widths = [];
            let width = 0;
            let totalWidth = 0;
            const members = this.troop().members;
            let shownMembers = 0;
            for (let i = 0; i < members.length; i++) {
                dataEnemy = $dataEnemies[members[i].enemyId];
                randomEnemyId = selectEnemyId(dataEnemy);
                dataEnemy = $dataEnemies[randomEnemyId];

                if (randomEnemyId != 0) {
                    width = enemyWidth(dataEnemy);
                    shownMembers++;
                } else {
                    width = 0;
                }
                enemyIds.push(randomEnemyId);
                widths.push(width);
            }

            const minGap = 24;
            // [note] この時点では Graphics.boxWidth はまだ0になる
            const sideGap = (816 - totalWidth - minGap * (shownMembers - 1)) / 2;

            let x = sideGap;
            for (let i = 0; i < members.length; i++) {
                if (enemyIds[i] == 0 || members[i].hidden) {
                    widths[i] = 0;
                }

                x += widths[i] / 2;

                gameEnemy = new Game_Enemy(enemyIds[i] || members[i].enemyId, x, members[i].y);
                if (enemyIds[i] == 0 || members[i].hidden) {
                    gameEnemy.hide();
                } else {
                    condition = false;
                }

                this._enemies.push(gameEnemy);

                x += widths[i] / 2;

                if (widths[i] > 0) {
                    x += minGap;
                }
            }

            this.makeUniqueNames();
        };
    };

    function enemyWidth(dataEnemy) {
        if (!dataEnemy) {
            return 0;
        }

        return ImageManager.loadEnemy(dataEnemy.battlerName).width;
    }

    function selectEnemyId(arrayData) {
        if (!arrayData.meta.RandomEnemy) {
            return null;
        };
        var pool = JsonEx.parse(`[${arrayData.meta.RandomEnemy}]`);
        return Number(pool[Math.randomInt(pool.length)]);
    };

})();