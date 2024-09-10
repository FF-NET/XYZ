/*:
 * @plugindesc 76시간 66분 12초 주기를 계산하여 게임 상단에 남은 시간을 표시하는 플러그인입니다.
 * @author YourName
 *
 * @help
 * 이 플러그인은 2024년 9월 11일 00시 00분 00초를 기준으로 76시간 66분 12초(77시간 6분 12초)마다
 * 주기가 갱신되며, 게임 상단에 남은 시간을 표시합니다.
 *
 * 사용법:
 * 1. 플러그인을 활성화하세요.
 * 2. 게임을 시작하면 남은 시간이 상단에 표시됩니다.
 */

(function() {

    // 기준 시간 설정 (2024년 9월 11일 00시 00분 00초)
    const startDate = new Date(2024, 8, 11, 0, 0, 0); // 8월은 9월을 의미 (0부터 시작)
    const period = (77 * 3600 + 6 * 60 + 12) * 1000; // 77시간 6분 12초를 밀리초로 변환

    // 주기 계산 함수
    function calculateNextCycleTime() {
        const now = new Date();
        const elapsedTime = now - startDate;
        const cycleCount = Math.floor(elapsedTime / period);
        const nextCycleTime = new Date(startDate.getTime() + (cycleCount + 1) * period);
        return nextCycleTime;
    }

    // 남은 시간 계산 함수
    function calculateRemainingTime() {
        const now = new Date();
        const nextCycleTime = calculateNextCycleTime();
        const remainingTime = nextCycleTime - now;

        const hours = Math.floor(remainingTime / (1000 * 60 * 60));
        const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

        return { hours, minutes, seconds };
    }

    // 텍스트 스프라이트를 저장할 변수
    let timeSprite = null;

    // 게임 상단에 남은 시간을 표시하는 함수
    function displayRemainingTime() {
        const { hours, minutes, seconds } = calculateRemainingTime();
        const text = `남은 시간: ${hours}시간 ${minutes}분 ${seconds}초`;

        // 이전 스프라이트가 존재하면 제거
        if (timeSprite) {
            SceneManager._scene.removeChild(timeSprite);
        }

        // 새로운 스프라이트 생성 및 설정
        const x = 10; // 좌표
        const y = 10; // 좌표
        const width = 300; // 너비
        const height = 50; // 높이
        const bitmap = new Bitmap(width, height);
        bitmap.drawText(text, 0, 0, width, height, 'left');
        
        timeSprite = new Sprite(bitmap);
        timeSprite.x = x;
        timeSprite.y = y;

        // 새로운 스프라이트 추가
        SceneManager._scene.addChild(timeSprite);
    }

    // Scene_Map 업데이트 시마다 남은 시간을 갱신하여 표시
    const _Scene_Map_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function() {
        _Scene_Map_update.call(this);
        displayRemainingTime();
    };

})();
