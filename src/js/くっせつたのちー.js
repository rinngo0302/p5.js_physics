const HEIGHT = 500;
const n12 = 1.2;

let x, y;

let t = 0;

class circlePoint
{
    constructor(x, y, angle)
    {
        this._x = x;
        this._y = y;
        this._angle = angle;
        this._hasRefrected = false;
    }

    calc()
    {
        this._x += cos(PI / (180 / this._angle)) * 3;
        this._y += sin(PI / (180 / this._angle)) * 3;

        if (this._y >= HEIGHT / 2 && !this._hasRefrected)
        {
            this._angle *= n12;
            this._hasRefrected = true;
        }
    }

    draw()
    {
        circle(this._x, this._y, 3);
    }

    getPoint()
    {
        return [this._x, this._y];
    }
    getAngle()
    {
        return this._angle;
    }
}

class waveFront
{
    constructor(x, y, angle)
    {
        this._centerX = x;
        this._centerY = y;
        this._angle = angle;
        
        this._x1 = this._centerY * tan(PI / (180 / this._angle)) + this._centerX;
        this._y1 = 0;
        this._x2 = 0;
        this._y2 = this._centerX * tan(PI / (180 / this._angle)) + this._centerY;
    }

    draw()
    {
        console.log(line(this._x1, this._y1, this._x2, this._y2));
        console.log(`x1: ${this._x1}\ny1: ${this._y1}\nx2: ${this._x2}\ny2: ${this._y2}`);
        // circle(this._x1, this._y1, 20);
        // circle(this._x2, this._y2, 20);
    }
}

let allCircles = [];
let waveFronts = [];
function setup()
{
    createCanvas(1000, HEIGHT);
    background(100);

    allCircles.push(new circlePoint(0, 0, 60));
    allCircles.push(new circlePoint(100, 0, 60));
    // waveFronts.push(new waveFront())
}

function calc()
{
    let circlepoint = new circlePoint(100, 50);
    allCircles.push(circlepoint);

}

function draw()
{
    // background(100);
    line(0, 250, 1000, 250);

    for (let i = 0; i < allCircles.length; i++)
    {
        allCircles[i].calc();
        allCircles[i].draw();
        noStroke();
        
        if (t % 10 === 0)
        {
            stroke(255);
            let centerpoint = allCircles[i].getPoint();
            let wavefront = new waveFront(centerpoint[0], centerpoint[1], allCircles[i].getAngle());
            wavefront.draw();
        }
        
    }
    t++;
}