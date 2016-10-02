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