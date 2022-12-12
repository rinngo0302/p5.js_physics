let H = 0;
let m_x = 0;
let m_y = 0;

function setup_monkey()
{
    m_x = l;
    H = OY - l * tan(PI / (180 / angle));
    m_y = H;

    console.log(`H: ${H}`);
}

function calc_monkey()
{
    m_y = (1/2) * g * t ** 2 + H;
}

function draw_monkey()
{
    circle(m_x, m_y, 100);
}