const g = 9.8;
const OY = 2000;
let l = 3000;

let angle = 45;

let v0 = 200;
let v0x, v0y;

let x = 0
let y = 0;
let t = 0;

let hasStarted = false;

function setup()
{
    createCanvas(5000, OY);
    background(100);

    v0x = v0 * cos(PI / (180 / angle));
    v0y = v0 * sin(PI / (180 / angle)) * -1;

    setup_monkey();

    startButton = createButton("Start");
    startButton.position(0, 0);
    startButton.mousePressed(() => {
        hasStarted = (hasStarted) ? false : true;
    });
}

function calc()
{
    if (x >= l)
    {
        hasStarted = false;
    }
    if (!hasStarted)
    {
        alert("当たった！");
    }
    x = v0x * t;
    y = v0y * t + (1/2) * g * t ** 2 + OY;
    t++;
}

function draw()
{
    if (hasStarted)
    {
        calc_monkey();
        calc();
    }

    background(100);
    line(0, OY, l, H);
    circle(x, y, 100);
    draw_monkey();
    line(l, 0, l, OY);
}