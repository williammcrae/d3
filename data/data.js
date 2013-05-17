window.onload=function(){

    d3.select('#test').text("It's alive!!!");


    var data = [
        {
            day: "Thur",
            times: [
                {
                    time: "6am",
                    wave_height: 1,
                    direction: 0
                },
                {
                    time: "12pm",
                    wave_height: 2,
                    direction: 45
                },
                {
                    time: "6pm",
                    wave_height: 3,
                    direction: 90
                }
            ]
        },
        {
            day: "Fri",
            times: [
                {
                    time: "6am",
                    wave_height: 0.5,
                    direction: 180
                },
                {
                    time: "12pm",
                    wave_height: 0.75,
                    direction: 200
                },
                {
                    time: "6pm",
                    wave_height: 0.25,
                    direction: 220
                }
            ]
        }
    ];


    var tides_start_timestamp = 1368680400;
    var tides_end_timestamp = 1368853199;

    var tides = [
        {
            status: 'Low',
            timestamp: 1368662760,
            tide_height: 0.8
        },
        {
            status: 'High',
            timestamp: 1368685560,
            tide_height: 1.5
        },
        {
            status: 'Low',
            timestamp: 1368710100,
            tide_height: 0.6
        },
        {
            status: 'High',
            timestamp: 1368732720,
            tide_height: 1.3
        },
        {
            status: 'Low',
            timestamp: 1368753240,
            tide_height: 0.8
        },
        {
            status: 'High',
            timestamp: 1368775620,
            tide_height: 1.5
        },
        {
            status: 'Low',
            timestamp: 1368799620,
            tide_height: 0.6
        },
        {
            status: 'High',
            timestamp: 1368822600,
            tide_height: 1.4
        },
        {
            status: 'Low',
            timestamp: 1368843840,
            tide_height: 0.8
        },
        {
            status: 'High',
            timestamp: 1368865740,
            tide_height: 1.5
        }
    ];


    // Weather data - include "weather" object within the day.
    // Tide data
    // - time range outside 6am, 12pm, 6pm
    // - continues graph or breaks overnight


    // Days
    var days_selection = d3.select("#wave").selectAll("div.day")
        .data(data);

    days_selection.enter()
        .append("div")
        .classed("day", true)
        .append("span")
        .text(function(d, i) {
            return d.day;
        });

    // Times
    days_selection.each(function(d, i) {
        var times_selection = d3.select(this).selectAll("div.time").data(d.times);
        times_selection.enter()
            .append("div")
            .classed("time",true);
    });

    var times_selection = d3.select("#wave").selectAll("div.time");
    var rotate = function(d,i) {
      return "rotate(" + d + "deg)";
    };

    times_selection.each(function(d, i) {
        var direction_selection = d3.select(this).selectAll("div.direction").data([d.direction]);
        // direction
        direction_selection.enter()
            .append("div")
            .classed("direction",true)
            .append("img")
            .attr("src","wave-arrow.png")
            .style("transform", rotate)
            .style("-ms-transform", rotate)
            .style("-webkit-transform", rotate)

            /*transform:rotate(43deg);*/
            /*-ms-transform:rotate(43deg); *//* IE 9 */
            /*-webkit-transform:rotate(43deg); *//* Safari and Chrome */

            .text(function(d, i) {
                return d;
            });
        // wave_height
        var wave_height_selection = d3.select(this).selectAll("div.wave_height").data([d.wave_height]);
        wave_height_selection.enter()
            .append("span")
            .classed("wave_height",true)
            .text(function(d, i) {
                return d + "ft";
            });
        wave_height_selection.enter()
            .append("div")
            .classed("wave_height",true)
            .style("height", function(d,i){
                return (d * 20) + "px";
            });
        // time
        var time_selection = d3.select(this).selectAll("div.name").data([d.time]);
        time_selection.enter()
            .append("span")
            .classed("name",true)
            .text(function(d, i) {
                return d;
            });
    });


    // Tides

    var margin = {top: 10, right: 0, bottom: 30, left: 0},
        width = 240 - margin.left - margin.right,
        height = 100 - margin.top - margin.bottom;

    var x = d3.scale.linear()
        .range([0, width]);

    var y = d3.scale.linear()
        .range([height, 0]);

    var svg = d3.select("#tide").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var area = d3.svg.area()
        .interpolate("cardinal")
        .x(function(d) { return x(d.timestamp); })
        .y0(function(d) { return y(d.tide_height); })
        .y1(function(d) { return height; });

    x.domain([tides_start_timestamp,tides_end_timestamp]);

    y.domain([0, d3.max(tides, function(d) { return d.tide_height; })]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")");

    svg.append("g")
        .attr("class", "y axis");

    svg.append("path")
        .datum(tides)
        .attr("class", "line")
        .attr("d", area)
        .style("fill","lightgray")
        .style("stroke","darkgray")

    // Tides days
    var tide_days_selection = d3.select("#tide").selectAll("div.day")
        .data(data);

    tide_days_selection.enter()
        .append("div")
        .classed("day", true);

};

