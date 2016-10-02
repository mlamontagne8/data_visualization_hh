/*var data = [4, 8, 15, 16, 23, 42];

var width = 420;
var barHeight = 20;

var x = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range([0, width]);

var chart = d3.select(".chart")
    .attr("width", width)
    .attr("height", barHeight * data.length);

var bar = chart.selectAll("g")
    .data(data)
    .enter().append("g")
    .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

bar.append("rect")
    .attr("width", x)
    .attr("height", barHeight - 1);

bar.append("text")
    .attr("x", function(d) { return x(d) - 3; })
    .attr("y", barHeight / 2)
    .attr("dy", ".35em")
    .text(function(d) { return d; });*/
var data = [];
var dates = [];
var weatherData = [];

function parseData() {
    d3.csv("data/us-weather-history/KNYC.csv", function(data) {
        var parse = d3.timeParse("%Y-%m-%-d");
        for (i = 0; i < data.length; i++) {
            dates[i] = parse(data[0].date);
        }
        console.log("In function call: " + dates[0]);
        for (i = 0; i < data.length; i++) {
            weatherData[i] = data[i];
        }
    });
}

function display() {
    parseData();
}

var m = [20, 20, 30, 20],
    w = 960 - m[1] - m[3],
    h = 500 - m[0] - m[2];

var x,
    y,
    duration = 1500,
    delay = 500;

var color = d3.scaleOrdinal(d3.schemeCategory10);

var svg = d3.select("body").append("svg")
    .attr("width", w + m[1] + m[3])
    .attr("height", h + m[0] + m[2])
    .append("g")
    .attr("transform", "translate(" + m[3] + "," + m[0] + ")");

var city,
    symbols;

// A line generator, for the dark stroke.
var line = d3.line()
    .interpolateBasis()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.actual_mean_temp); });

// A line generator, for the dark stroke.
var axis = d3.line()
    .interpolateBasis()
    .x(function(d) { return x(d.date); })
    .y(h);

// A area generator, for the dark stroke.
var area = d3.svg.area()
    .interpolate("basis")
    .x(function(d) { return x(d.date); })
    .y1(function(d) { return y(d.actual_mean_temp); });

d3.csv("data/us-weather-history/KNYC.csv", function(data) {
    var parse = d3.timeParse("%Y-%m-%-d");

    // Nest stock values by symbol.
    symbols = d3.nest()
        .key("KNYC")
        .entries(city = data);

    // Parse dates and numbers. We assume values are sorted by date.
    // Also compute the maximum actual_mean_temp per symbol, needed for the y-domain.
    symbols.forEach(function(s) {
        s.values.forEach(function(d) {
            d.date = parse(d.date);
            d.actual_mean_temp = +d.actual_mean_temp;
        });
        s.maxactual_mean_temp = d3.max(s.values, function(d) { return d.actual_mean_temp; });
        s.sumactual_mean_temp = d3.sum(s.values, function(d) { return d.actual_mean_temp; });
    });

    // Sort by maximum actual_mean_temp, descending.
    symbols.sort(function(a, b) { return b.maxactual_mean_temp - a.maxactual_mean_temp; });

    var g = svg.selectAll("g")
        .data(symbols)
        .enter().append("g")
        .attr("class", "symbol");

    setTimeout(lines, duration);
});