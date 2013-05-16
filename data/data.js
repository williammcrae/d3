window.onload=function(){

    d3.select('#test').text("It's alive!!!");

    var wave_data = [
        {when: "Thur 6am", height: 1.08, direction: 267},
        {when: "Thur 12pm", height: 1.08, direction: 267},
        {when: "Thur 6pm", height: 1.08, direction: 267},
        {when: "Fri 6am", height: 1.08, direction: 267},
        {when: "Fri 12pm", height: 1.08, direction: 267},
        {when: "Fri 6pm", height: 1.08, direction: 267}
    ];

    d3.select('#wave').data(wave_data);

    // Update...
    var wave = d3.select("#wave").selectAll("div")
        .data(wave_data)
        .text("blah");

    // Enter...
    wave.enter().append("div")
        .text("new");

    // Exit...
    wave.exit().remove();

};

