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


    // Weather data - include "weather" object within the day.
    // Tide data
    // - time range outside 6am, 12pm, 6pm
    // - continues graph or breaks overnight


//    var days = function(data) {
//        var daysById = {};
//        var daysInOrder = [];
//
//        for (var index = 0; index < data.length; index++) {
//            var time_object = data[index];
//            var day_id = Math.floor(time_object.id / 100);
//            if (!daysById.hasOwnProperty(day_id)) {
//                var day_object = {
//                    id: day_id,
//                    day: time_object.day,
//                    times: ["one","two","three"]
//                };
//                daysById[day_id] = day_object;
//                daysInOrder.push(day_object);
//            }
//        }
//
//        return daysInOrder;
//    };

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
    times_selection.each(function(d, i) {
        var time_selection = d3.select(this).selectAll("div.direction").data([d.direction]);
        time_selection.enter()
            .append("span")
            .classed("direction",true)
            .text(function(d, i) {
                return d;
            });
    });

//    wave_days_select.enter()
//        .append("div")
//        .classed("day", true)
////        .each(function(day, day_index) {
////            var wave_day_div = this;
////            var day_div_select = d3.select(wave_day_div).data(day.times);
////            day_div_select.enter()
////                .append("div")
////                .text("x");
////        })
//        .append("span")
//        .text(function(d, i) {
//            return d.day;
//        });

};

