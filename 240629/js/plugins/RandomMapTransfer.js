/*:
 * @target MZ
 * @plugindesc 플레이어를 랜덤 맵으로 이동시키는 플러그인입니다. 모든 맵이 로드될 때 페이드 인 효과가 적용됩니다.
 * @help
 * 이 플러그인은 특정 이벤트에서 플레이어를 무작위로 선택된 맵으로 이동시키는 기능을 제공합니다.
 * 또한, 모든 맵이 처음 로드될 때 페이드 인 효과를 적용합니다.
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

    // 제외할 맵 ID를 정의합니다. 예를 들어, 맵 ID 9를 제외합니다.
    const excludedMapIds = [9, 19, 20, 21, 22];

    // RPG Maker MZ의 데이터 파일에서 모든 맵 ID를 가져옵니다.
    function getAllMapIds() {
        const mapIds = [];
        for (const mapData of $dataMapInfos) {
            if (mapData && !excludedMapIds.includes(mapData.id)) {
                mapIds.push(mapData.id);
            }
        }
        return mapIds;
    }

    // 무작위로 맵 ID를 선택하는 함수입니다.
    function getRandomMapId() {
        const mapIds = getAllMapIds();
        return mapIds[Math.floor(Math.random() * mapIds.length)];
    }

    // 플레이어를 무작위로 선택된 맵으로 이동시키는 함수입니다.
    function goToRandomMap() {
        const mapId = getRandomMapId();
        if ($gamePlayer) {
            // 맵 ID에 따라 플레이어를 이동시킵니다.
            $gamePlayer.reserveTransfer(mapId, 0, 0, 0, 2);
            SceneManager.goto(Scene_Map);
        } else {
            // $gamePlayer가 초기화될 때까지 대기
            setTimeout(goToRandomMap, 100);
        }
    }

    // RPG Maker MZ의 플러그인 명령을 등록합니다.
    PluginManager.registerCommand('RandomMapTransfer', 'goToRandomMap', () => {
        goToRandomMap(); // 랜덤 맵으로 이동하는 함수를 호출합니다.
    });

    // Scene_Map 클래스의 start 메서드를 오버라이드하여 맵 로드 시 페이드 인을 추가합니다.
    const _Scene_Map_start = Scene_Map.prototype.start;
    Scene_Map.prototype.start = function() {
        _Scene_Map_start.call(this);
        
        const fadeInDuration = 60; // 페이드 인 시간 (프레임 단위)
        if ($gamePlayer.isTransferring()) {
            // 만약 플레이어가 전송 중이라면, 페이드 인을 수행하지 않습니다.
            return;
        }
        // 맵 로드 시 페이드 인을 시작합니다.
        $gameScreen.startFadeIn(fadeInDuration);
    };

})();
