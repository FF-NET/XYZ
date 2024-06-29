document.addEventListener('DOMContentLoaded', function() {
    // 페이지 로드 후 5초 후에 텍스트를 숨김
    var mannertext = document.getElementById('mannermodeText');
    mannertext.style.display = 'block'; // 텍스트 보이기

    setTimeout(function() {
        mannertext.style.display = 'none'; // 5초 후 텍스트 숨기기
    }, 5000); // 5000밀리초 = 5초
});
