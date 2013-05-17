window.onload=function(){

    d3.select('#test').text("It's alive!!!");


    var wave_data = [
        {
            day: "Thur",
            times: [
                {
                    time: "6am",
                    height: 1,
                    direction: 0
                },
                {
                    time: "12pm",
                    height: 2,
                    direction: 45
                },
                {
                    time: "6pm",
                    height: 3,
                    direction: 90
                }
            ]
        },
        {
            day: "Fri",
            times: [
                {
                    time: "6am",
                    height: 0.5,
                    direction: 180
                },
                {
                    time: "12pm",
                    height: 0.75,
                    direction: 200
                },
                {
                    time: "6pm",
                    height: 0.25,
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
            height: 0.8
        },
        {
            status: 'High',
            timestamp: 1368685560,
            height: 1.5
        },
        {
            status: 'Low',
            timestamp: 1368710100,
            height: 0.6
        },
        {
            status: 'High',
            timestamp: 1368732720,
            height: 1.3
        },
        {
            status: 'Low',
            timestamp: 1368753240,
            height: 0.8
        },
        {
            status: 'High',
            timestamp: 1368775620,
            height: 1.5
        },
        {
            status: 'Low',
            timestamp: 1368799620,
            height: 0.6
        },
        {
            status: 'High',
            timestamp: 1368822600,
            height: 1.4
        },
        {
            status: 'Low',
            timestamp: 1368843840,
            height: 0.8
        },
        {
            status: 'High',
            timestamp: 1368865740,
            height: 1.5
        }
    ];


    // Weather data - include "weather" object within the day.
    // Tide data
    // - time range outside 6am, 12pm, 6pm
    // - continues graph or breaks overnight


    // Days
    var days_selection = d3.select("#wave").selectAll("div.day")
        .data(wave_data);

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
        // height
        var height_selection = d3.select(this).selectAll("div.height").data([d.height]);
        height_selection.enter()
            .append("span")
            .classed("height",true)
            .text(function(d, i) {
                return d + "ft";
            });
        height_selection.enter()
            .append("div")
            .classed("height",true)
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

    var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = 900 - margin.left - margin.right,
        height = 200 - margin.top - margin.bottom;

    var x = d3.scale.linear()
        .range([0, width]);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    var svg = d3.select("#tide").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    var area = d3.svg.area()
        .interpolate("cardinal")
        .x(function(d) { return x(d.timestamp); })
        .y0(function(d) { return y(d.height); })
        .y1(function(d) { return height; });


    x.domain([tides_start_timestamp,tides_end_timestamp]);

    y.domain(d3.extent(tides, function(d) { return d.height; }));

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

//    svg.append("path")
//        .datum(tides)
//        .attr("class", "line")
//        .attr("d", line);

    svg.append("path")
        .datum(tides)
        .attr("class", "line")
        .attr("d", area)
        .style("fill","red")
        .style("stroke","green")

};

