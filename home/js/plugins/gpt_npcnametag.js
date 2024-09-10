(function() {
    var _Scene_Map_prototype_start = Scene_Map.prototype.start;
    Scene_Map.prototype.start = function() {
        _Scene_Map_prototype_start.call(this);
        this.createNpcNameLabels(false);
    };

    Scene_Map.prototype.createNpcNameLabels = function(withFadeIn) {
        this._npcNameLabels = [];
        var events = $gameMap.events(); // 맵의 모든 이벤트(NPC 포함)를 가져옴
        for (var i = 0; i < events.length; i++) {
            var npcName = events[i].event().name; // 이벤트의 이름을 NPC의 이름으로 사용
            if (npcName && npcName !== "Custom Event" && !npcName.match(/^\[.*\]$/) && !npcName.match(/^\{.*\}$/)) {
                var nameLabel = new Sprite_NameLabel(npcName, events[i], withFadeIn);
                this._spriteset._tilemap.addChild(nameLabel); // Spriteset_Map의 타일맵 위에 이름표 추가
                this._npcNameLabels.push(nameLabel); // 이름표 스프라이트를 배열에 저장
            }
        }
    };

    function Sprite_NameLabel() {
        this.initialize.apply(this, arguments);
    }

    Sprite_NameLabel.prototype = Object.create(Sprite.prototype);
    Sprite_NameLabel.prototype.constructor = Sprite_NameLabel;

    Sprite_NameLabel.prototype.initialize = function(npcName, event, withFadeIn) {
        Sprite.prototype.initialize.call(this);
        this._name = npcName; // NPC의 이름으로 설정
        this._event = event; // 이벤트 객체 저장 (NPC 위치 추적용)
        this.bitmap = new Bitmap(200, 24); // 이름을 그릴 비트맵 크기 설정
        this.bitmap.fontFace = Window_Base.prototype.standardFontFace; // 기본 시스템 폰트 설정
        this.bitmap.fontSize = 16; // 폴더명 스타일 폰트 크기 설정
        this.bitmap.textColor = "#ffffff"; // 폴더명 스타일의 흰색 텍스트
        this.bitmap.context.imageSmoothingEnabled = false; // 안티앨리어싱 제거
        this.opacity = 0; // 처음에는 투명하게 설정

        this.updatePosition();
        this.updateText();

        if (withFadeIn) {
            this.fadeIn(); // 페이드인 애니메이션 시작
        } else {
            this.opacity = 255; // 페이드인이 없을 경우 바로 완전 불투명으로 설정
        }
    };

    Sprite_NameLabel.prototype.fadeIn = function() {
        var fadeSpeed = 5; // 투명도 증가 속도 (프레임당 5씩 증가)

        var fadeInterval = setInterval(() => {
            this.opacity += fadeSpeed;
            if (this.opacity >= 255) {
                this.opacity = 255;
                clearInterval(fadeInterval); // 투명도가 최대치에 도달하면 애니메이션 종료
            }
        }, 16); // 약 60FPS로 16ms마다 호출
    };

    Sprite_NameLabel.prototype.update = function() {
        Sprite.prototype.update.call(this);
        this.updatePosition();
        this.updateText();
    };

    Sprite_NameLabel.prototype.updatePosition = function() {
        var screenX = this._event.screenX(); // NPC의 화면 X 좌표
        var screenY = this._event.screenY(); // NPC의 화면 Y 좌표
        this.x = screenX - this.bitmap.width / 2; // 이름표의 X 좌표를 NPC의 X 좌표에 맞춤
        this.y = screenY - 5; // 이름표를 NPC 위쪽으로 5px 올림
    };

    Sprite_NameLabel.prototype.updateText = function() {
        this.bitmap.clear();
        var textWidth = this.bitmap.measureTextWidth(this._name); // 이름의 실제 너비 계산
        var textHeight = this.bitmap.fontSize + 8; // 텍스트 높이를 계산하여 배경 높이에 사용
        var x = (this.bitmap.width - textWidth) / 2; // 텍스트의 중앙 X 좌표 계산
        var y = (this.bitmap.height - textHeight) / 2; // 텍스트의 중앙 Y 좌표 계산
        this.bitmap.drawText(this._name, x, y, textWidth, textHeight, 'left'); // 텍스트를 중앙에 그리기
    };
})();
