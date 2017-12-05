let colors = [
    "red",
    "brown",
    "blue",
    "purple",
    "yellow",
    "orange",
    "gray",
    "green",
    "crimson",
    "lavender",
    "indigo",
    "moccasin",
    "orchid",
    "plum",
    "silver",
    "tan",
    "red",
    "brown",
    "blue",
    "purple",
    "yellow",
    "orange",
    "gray",
    "green",
    "crimson",
    "lavender",
    "indigo",
    "moccasin",
    "orchid",
    "plum",
    "silver",
    "tan"
];

let svgContainer,
    svgWidth = 3900,
    svgHeight = 700,
    svgMargin = {
        top: 20,
        right: 50,
        bottom: 20,
        left: 50
    },
    startPoint = {
        x: svgMargin.left*2,
        y: Math.round((svgMargin.top + svgHeight)/2)
    },
    xAxisLength = 3850,
    yAxisLength = 650,
    scale = 30;

let N = 256;
let phase = Math.PI / 24;
let A = 10;
let f = 1;

let signalVector;

function init() {
    drawSvgContainer(svgWidth, svgHeight, svgMargin);
    drawAxes(xAxisLength, yAxisLength, startPoint, scale);
    task1();
}

function task1() {

    signalVector = [];

    clearSvgContainer(svgContainer);
    drawAxes(xAxisLength, yAxisLength, startPoint, scale, 1);

    signalVector = getTestSignalVector(0, A, N, N, f);
ы
    drawFunctionGraph(signalVector, colors[5], 1, scale, 1);
}

function task2() {
    clearSvgContainer(svgContainer);
    drawAxes(xAxisLength, yAxisLength, startPoint, scale, 1);
}

function task3() {
    clearSvgContainer(svgContainer);
    drawAxes(xAxisLength, yAxisLength, startPoint, scale, 1);
}

function task4() {
    clearSvgContainer(svgContainer);
    drawAxes(xAxisLength, yAxisLength, startPoint, scale, 1);
}

function getTestSignalVector(initPhase, amplitude, period, count, oscillation) {
    let result = [];
    for(let n = 0; n < count; n++) {
        let y = testSignal(initPhase, amplitude, period, oscillation, n);
        result.push({y: y, x: n});
    }
    return result;
}

function testSignal(initPhase, amplitude, period, oscillation, n) {
    //A = 10
    //initPhase = 0
    //oscillation = 1
    return amplitude * Math.cos((2 * Math.PI * oscillation * n) / period - initPhase);
}


function drawSvgContainer(width, height, margin) {
    svgContainer = d3.select("body").append("svg")
        .attr("width", margin.left + width + margin.right)
        .attr("height", margin.top + height + margin.bottom);
}

function clearSvgContainer(svg) {
    svg.selectAll("*").remove();
}

function drawAxes(xLength, yLength, startPoint, y_scale, x_scale) {
    let ys = y_scale ? y_scale : 1;
    let xs = x_scale ? x_scale : 1;
    let xScale = d3.scaleLinear().domain([0, xLength / xs]).range([0, xLength]);
    let yScale = d3.scaleLinear().domain([-1 * yAxisLength / ys / 2, yAxisLength / ys / 2]).range([yLength, 0]);
    let xAxis = d3.axisBottom().scale(xScale);
    let yAxis = d3.axisLeft().scale(yScale);

    svgContainer
        .append("g")
        .attr('class', 'axis')
        .attr('transform', 'translate(' + startPoint.x + ',' + Math.round(svgMargin.top * 1.75) + ')')
        .call(yAxis);

    svgContainer
        .append("g")
        .attr('class', 'axis')
        .attr('transform', 'translate(' + startPoint.x + ',' + startPoint.y + ')')
        .call(xAxis);
}

function drawFunctionGraph(points, color, width, y_scale, x_scale) {
    debugger;
    for(let i = 0; i < points.length - 1; i++) {
        drawLine(points[i], points[i+1], color, width, y_scale, x_scale);
    }
}

function drawPoints(functionResults, color, size) {
    functionResults.forEach( point => {
        drawPoint(point, color, size);
    });
}

function drawLine(p1, p2, color, width, ys, xs) {
    svgContainer.append("line")
        .attr("x1", p1.x * xs + startPoint.x)
        .attr("y1", startPoint.y - (p1.y * ys))
        .attr("x2", p2.x * xs + startPoint.x)
        .attr("y2", startPoint.y - (p2.y * ys))
        .attr("stroke-width", width || 1)
        .attr("stroke", color || 'black');
}

function drawPoint(point, color, size) {
    svgContainer.append("circle")
        .attr("cx", point.x + startPoint.x)
        .attr("cy", startPoint.y - (point.y * scale))
        .attr("r", size || 1)
        .style("fill", color);
}