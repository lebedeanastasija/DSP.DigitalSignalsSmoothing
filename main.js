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
let K = 3;

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

    signalVector = getTestSignalVector(N, N * 2);
    drawFunctionGraph(signalVector, colors[5], 1, scale, 1);
}

function task2() {
    clearSvgContainer(svgContainer);
    drawAxes(xAxisLength, yAxisLength, startPoint, scale, 1);

    let signal = getMovingAveragingSignalVector(K, N * 2);
    drawFunctionGraph(signal, colors[5], 1, scale, 1);
}

function task3() {
    clearSvgContainer(svgContainer);
    drawAxes(xAxisLength, yAxisLength, startPoint, scale, 1);
}

function task4() {
    clearSvgContainer(svgContainer);
    drawAxes(xAxisLength, yAxisLength, startPoint, scale, 1);
}

function getTestSignalVector(period, count) {
    let result = [];
    for(let n = 0; n < count; n++) {
        let y = testSignal(period, n);
        result.push({y: y, x: n});
    }
    return result;
}

function testSignal(period, n) {
    let B1 = 10;
    let B2 = 0.5;
    let result = B1 * Math.sin(2 * Math.PI * n / period);
    for(let j = 50; j <= 70; j++) {
        result += Math.pow(-1, getRandomInt(0,1)) * B2 * Math.sin(2 * Math.PI * n * j / period);
    }
    return result;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function movingAveragingSignal(n, k, count) {
    let m = (k - 1) / 2;
    if((n - m) < 0) {
        return signalVector[n].y;
    }

    let result = 0;

    for(let j = n - m; j <= n + m && j < count; j++) {
        if(!signalVector[j]) console.log(j);
        result += signalVector[j].y;
    }
    result *= 1 / k;
    return result
}

function getMovingAveragingSignalVector(k, count) {
    let result = [];
    signalVector.forEach((x, i) => {
        let y = movingAveragingSignal(i, k, count);
        result.push({y: y, x: i});
    });

    return result;
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