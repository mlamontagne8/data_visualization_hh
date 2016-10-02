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
        console.log("Object data: " + data[0] + data.length);
        //var parse = d3.time.format("%Y-%b-%-d").parse;
        //dates[0] = parse(data[0].date);
        for (i = 0; i < data.length; i++) {
            weatherData[i] = data[i];
        }
        // for (i = 0; i < weatherData.length; i++) {

        // }
        console.log("Object weather: " + weatherData[0] + data.length);
    });
    console.log("Outside of csv call " + weatherData[0].date);
    alert(weatherData[0].date);
}


//var date = [];

function display() {
    parseData();
    //alert(data[0].date);
}