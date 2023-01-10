const g = 9.8;
const OY = 2000;
const TURN_POINT = 4000;
let e = 0.9;

let hasSet = false;

let x = 0;  let y = 400;
let angle = 60;
let v0 = 150;
let v0x;
let v0y;
let increaseX = 0;
let increaseY = 0;
let t = 0;

function changeData()
{
    let hasSetEl = document.getElementById("hasSet");
    hasSetEl.innerText = "設定されていません。";
}

let startButton;
let isStart = false;
function setup() {
    createCanvas(5000, OY);
    background(100);
    text("※めっちゃ縮小してください！", 0, 200);
    line(0, OY * 4, 5000, OY * 4);
    line(TURN_POINT, 0, TURN_POINT, OY * 2);
    v0x = v0 * cos(PI / (180 / angle));
    v0y = v0 * sin(PI / (180 / angle)) * -1;

    startButton = createButton("Start");
    startButton.position(0, 0);
    startButton.id("startbutton");
    startButton.mousePressed(() => {
        isStart = (isStart) ? false : true;
        let startbutton = document.getElementById("startbutton");
        startbutton.innerHTML = (isStart) ? "Stop" : "Start";
    });

    let v0el = document.getElementById("v0");
    let angleel = document.getElementById("angle");
    let eel = document.getElementById("e");
    v0el.value = v0;
    angleel.value = angle;
    eel.value = e;
    hasSet = true;
    document.getElementById("hasSet").innerHTML = "設定完了！";

    alert("限界まで縮小してください！\n※また、このサイトはPCでないと上手く作動しない可能性があります。");
}

function setData()
{
    let user_v0 = parseFloat(document.getElementById("v0").value);
    let user_angle = parseFloat(document.getElementById("angle").value);
    let user_e = parseFloat(document.getElementById("e").value);
    if (isNaN(user_v0) || isNaN(user_angle) || isNaN(user_e))
    {
        alert("設定するデータの値が正しくありません。");
        return;
    }
    v0 = user_v0; angle = user_angle; e = user_e;
    v0x = v0 * cos(PI / (180 / angle));
    v0y = v0 * sin(PI / (180 / angle)) * -1;

    console.log(`初速度: ${v0}\n角度: ${angle}\n反発係数: ${e}\nセット完了!!`);
    let hasSetEl = document.getElementById("hasSet");
    hasSetEl.innerText = "設定完了！";
}

let oldT = 0;
let tmpangle = 0;
let isOnOY = false;
let direction = 1;
let ox = 0;
let countBound = 1;
let hasBpundInTurnPoint = false;
let hasBpundInO = false;
let debug = false;
function calc()
{
    if (x >= TURN_POINT)
    {
        direction *= -1;
        ox = TURN_POINT * countBound;
        hasBpundInTurnPoint = true;
        debug = true;
    }
    if (x <= 0 && increaseX != 0)
    {
        ox -= TURN_POINT * 2 * countBound;
        direction *= -1;
        countBound++;
        hasBpundInO = true;
        debug = true;
    }

    increaseX = (v0x * direction) * (t + oldT) + ox * 2;
    x = hasBpundInTurnPoint ? increaseX * e : increaseX;
    hasBpundInTurnPoint = false;
    y = v0y * t + (1/2) * g * t ** 2 + OY;
    increaseY = v0y * t + (1/2) * g * t ** 2 + OY;
    y = hasBpundInO ? increaseY * e : increaseY;
    hasBpundInO = false;
    if (y >= OY && x != 0)
    {
        oldT = t + oldT;
        t = 0;
        v0y *= e;
        line(x, OY + 10, x, OY - 10);
    }

    t++;
}

function draw() {
    if (isStart)
    {
        background(100);
        line(0, OY * 4, 5000, OY * 4);
        line(TURN_POINT, 0, TURN_POINT, OY * 2);
        calc();
        if (!hasBpundInO && !hasBpundInTurnPoint)
        {
            circle(x, y, 100);
        }
    }
}