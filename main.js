// 그림 그리기에 필요한 최소한의 코드 1️⃣
var 캔버스 = document.getElementById('canvas');
var ctx = 캔버스.getContext('2d'); //context 객체가 사용할 정보 모음
캔버스.width = 600; //window.innerWidth-100;
캔버스.height = 413; //window.innerHeight-1000;

var 돌 = new Image();
var 토끼 = new Image();
var 배경 = new Image();

돌.src = 'stone.png';
토끼.src = 'rabbit.png';
배경.src = 'background.jpg';

// 배경 관련 변수
var 배경1_x = 0;
var 배경2_x = 캔버스.width;

// 배경 그리기 함수
function drawBackground() {
    ctx.drawImage(배경, 배경1_x, 0, 캔버스.width, 캔버스.height);
    ctx.drawImage(배경, 배경2_x, 0, 캔버스.width, 캔버스.height);

    // 배경 이동
    배경1_x -= 5; // 배경 속도 조절
    배경2_x -= 5;

    // 배경 위치 초기화
    if (배경1_x <= -캔버스.width) {
        배경1_x = 캔버스.width;
    }
    if (배경2_x <= -캔버스.width) {
        배경2_x = 캔버스.width;
    }
}

// 공룡 오브젝트 자료 정리 2️⃣
var 주인공 = {
    x: 30,
    y: 200,
    width: 50,
    height: 113,
    draw() {
        ctx.fillStyle = 'red';
        ctx.drawImage(토끼, this.x, this.y);
    }
};
주인공.draw(); // 공룡 그리기

// 장애물은 width height가 각각 다른 비슷한 오브젝트가 많으므로 클래스 정리 3️⃣
class Stone {
    constructor() {
        this.x = 캔버스.width;
        this.y = 250;
        this.width = 100;
        this.height = 70;
    }
    draw() {
        ctx.fillStyle = 'red';
        ctx.drawImage(돌, this.x, this.y);
    }
}

// 애니메이션 4️⃣
var 애니메이션;
var stone배열 = [];
var 타이머 = 0;
var jump타이머 = 0;

function 주인공animate() {
    애니메이션 = requestAnimationFrame(주인공animate);
    타이머++;

    // 화면 지우기 (배경을 먼저 그리기 전에)
    ctx.clearRect(0, 0, 캔버스.width, 캔버스.height);

    // 배경 그리기
    drawBackground();

    const 랜덤 = Math.floor(Math.random() * 50) + 120;
    if (타이머 % 랜덤 === 0) {
        var stone = new Stone();
        stone배열.push(stone);
    }

    stone배열.forEach((s, i, j) => {
        if (s.x < s.width * -1) {
            j.splice(i, 1);
        }
        s.x -= 5;
        crash(주인공, s);
        s.draw();
    });

    // 점프
    if (jump == true) {
        if (jump타이머 < 25) {
            주인공.y -= 5;
        } else {
            주인공.y -= 1;
        }
        jump타이머++;
    }

    if (jump == false) {
        if (주인공.y < 200) {
            주인공.y += 5;
        }
    }

    if (jump타이머 > 35) {
        jump = false;
        jump타이머 = 0;
    }

    주인공.draw();
}

주인공animate();

var jump = false;
document.addEventListener('keydown', function (e) {
    if (e.code === 'KeyW') {
        jump = true;
    }
});

// 충돌 6️⃣
function crash(주인공, 장애물) {
    var x차이 = 장애물.x - (주인공.x + 주인공.width);
    if (장애물.x < 0) {
        x차이 = -1 * x차이;
    }
    var y차이 = 장애물.y - (주인공.y + 주인공.height);

    if (x차이 < 0 && y차이 < 0) {
        ctx.clearRect(0, 0, 캔버스.width, 캔버스.height);
        drawBackground();
        cancelAnimationFrame(애니메이션);
    }
}
