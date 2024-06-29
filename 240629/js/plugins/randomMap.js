/*:
 * @target MZ
 * @plugindesc 플레이어를 랜덤 맵으로 이동시키는 플러그인입니다.
 * @help
 * 이 플러그인은 특정 이벤트에서 플레이어를 무작위로 선택된 맵으로 이동시키는 기능을 제공합니다.
 *
 * 플러그인 커맨드:
 * - 랜덤 맵으로 이동: 플레이어를 랜덤 맵 ID로 이동시킵니다.
 *
 * 사용법:
 * 이벤트에서 플러그인 명령을 선택하고 "랜덤 맵으로 이동" 명령을 사용하세요.
 *
 * @command goToRandomMap
 * @text 랜덤 맵으로 이동
 * @desc 플레이어를 무작위로 선택된 맵으로 이동시킵니다.
 */

(() => {
    'use strict';

    // 랜덤하게 이동할 맵의 ID 목록을 정의합니다.
    const randomMapIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

    // 무작위로 맵 ID를 선택하는 함수입니다.
    function getRandomMapId() {
        return randomMapIds[Math.floor(Math.random() * randomMapIds.length)];
    }

    // 플레이어를 무작위로 선택된 맵으로 이동시키는 함수입니다.
    function goToRandomMap() {
        const mapId = getRandomMapId();
        if ($gamePlayer) {
            $gamePlayer.reserveTransfer(mapId, 0, 0, 0, 2); // 맵 ID에 따라 플레이어를 이동시킵니다.
            SceneManager.goto(Scene_Map);
        } else {
            setTimeout(goToRandomMap, 100); // $gamePlayer가 초기화될 때까지 대기
        }
    }

    // RPG Maker MZ의 플러그인 명령을 등록합니다.
    PluginManager.registerCommand('RandomMapTransfer', 'goToRandomMap', () => {
        goToRandomMap(); // 랜덤 맵으로 이동하는 함수를 호출합니다.
    });

})();
