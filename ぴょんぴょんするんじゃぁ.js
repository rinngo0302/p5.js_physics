const g = 9.8;
const OY = 1000;
const TURN_POINT = 3000;
let e = 0.5;

let x = 0;  let y = 400;
let angle = 50;
let v0 = 100;
let v0x;
let v0y;
let increaseX = 0;
let increaseY = 0;
let t = 0;

let startButton;
let isStart = false;
function setup() {
    createCanvas(5000, OY * 2);
    background(100);
    line(0, OY, 5000, OY);
    line(TURN_POINT, 0, TURN_POINT, OY * 2);
    v0x = v0 * cos(PI / (180 / angle));
    v0y = v0 * sin(PI / (180 / angle)) * -1;

    startButton = createButton("Start");
    startButton.position(0, 0);
    startButton.mousePressed(() => {
        isStart = true;
    });
}

let oldT = 0;
let tmpangle = 0;
let isOnOY = false;
let direction = 1;
let ox = 0;
let countBound = 1;
let hasBpundInTurnPoint = false;
let hasBpundInO = false;
function calc()
{
    if (x >= TURN_POINT)
    {
        direction *= -1;
        ox = TURN_POINT * countBound;
        hasBpundInTurnPoint = true;
    }
    if (x <= 0 && increaseX != 0)
    {
        ox -= TURN_POINT * 2 * countBound;
        direction *= -1;
        countBound++;
        hasBpundInO = true;
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
        // textSize(20);
        // text(`x: ${x}\nt: ${t + oldT}`, x - 20, OY + 60);
    }

    t++;
}

function draw() {
    if (isStart)
    {
        background(100);
        line(0, OY, 5000, OY);
        line(TURN_POINT, 0, TURN_POINT, OY * 2);
        calc();
        circle(x, y, 20);
    }
}