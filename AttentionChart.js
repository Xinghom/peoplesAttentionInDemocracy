var svg = d3.select("svg")
            .attr("width", 1080)
            .attr("height", 800);


var margin = {top: 100, right: 80, bottom: 40, left: 150},
    width = svg.attr("width") - margin.left - margin.right,
    height = svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," +margin.top + ")");

//define time format
var parseDate = d3.timeParse("%Y");

var show_number = true;
var click_vol = 0;
var click_percent = 0;
var maxY;

//define scales
var x = d3.scaleTime().range([0, width]),
    y = d3.scaleLinear().range([height, 0]),
    y_percent = d3.scaleLinear().range([height,0]),
    //color scale
    z = d3.scaleOrdinal(d3.schemeCategory10);

//define Tooltip
    var toolTip = d3.select("svg").append("toolTip")
        .attr("class", "tooltip")
        .style("opacity", 0);


//define line generator
var line = d3.line()
    .curve(d3.curveBasis)//interpolated using curveBasis: smooth
    .x(function(d) { return x(d.year); })
    .y(function(d) { return y(d.number); });

var line_percent = d3.line()
    .curve(d3.curBasis)
    .x(function(d){ return x(d.year)})
    .y(function(d) {return y(d.number/d.sum)});

//load data
var data = d3.csv("usEng.csv", type, function(error, data) {
    if(error) throw error;
    data.forEach(function(d) { // Make every date in the csv data a javascript date object format
      d.date = parseDate(d.year);
      d.sum = + d.all;
    });
    //parse data
    var words = data.columns.slice(1,10).map(function(id) {
        return {
            id: (id === "total" ? "average" : id),
            values: (id === "total" ? data.map(function(d) {
                return {laguage: "Chinese language", year: d.year, number: d[id]/8, sum: +d.sum}; }) : data.map(function(d) {
                return {language: "Chinese language",year: d.year, number: d[id], sum: +d.sum};})),
            visible: (id === "total" ? true : false) // "visible": all false except for total which is true.    
        };
    });
    console.log(words)

    //define x axis
    x.domain(d3.extent(data, function(d) { return d.year; }));

    //define y axis
    y.domain([0,
        d3.max(words, function(c) { return d3.max(c.values, function(d) { return d.number; }); })
    ]);
    y_percent.domain([0,d3.max(words, function(c) {return d3.max(c.values, function(d) {return d.number/d.sum})})]);

    //define color scale
    z.domain(words.map(function(c) { return c.id; }));

    
    
    //append x axis
    g.append("g")
        .attr("class", "axis-x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    //append y axis
    g.append("g")
        .attr("class", "axis-y")
        .call(d3.axisLeft(y))
        .attr("transform", "translate(0, 0)")
        .style("opacity", 1);
    
    //append y text

    g.append("text")
        .attr("id", "rightText")
        .attr("y", -75)
        .attr("x", -300)
        .attr("dy", "0.9em")
        .attr("transform", "rotate(-90)")
        .style("opacity", 0)
        .text("Volume of Books")
        .transition()
        .duration(500)
        .style("opacity", 1);
    
    //Dray y title box/button
    g.append("rect")
        .attr("id", "rightRect")
        .attr("x", -305)
        .attr("y", -75)
        .attr("rx", 5)
        .attr("ry", 5)
        .attr("height", "20px")
        .attr("width", 125)
        .attr("transform", "rotate(-90)")
        .style("stroke", "#000000")
        .style("fill", "#ffffff")
        .style("fill-opacity", "0")
        .style("opacity",0)
        .on("mouseover", function() {
            svg.select("#rightRect")
                .style("stroke-width","3px");
            }
        )
        .on("mouseout", function() {
            svg.select("#rightRect")
                .style("stroke-width","1px");
            }
        )
        .on("click", function() {
            show_number = true;
                move_percent();
                draw_line();
         })
        .transition()
        .duration(500)
        .style("opacity",1);
    
    
    //append y_percent axis
    g.append("g")
        .attr("class", "axis-y-percent")
        .attr("transform", "translate(-90, 0)")
        .call(d3.axisLeft(y_percent))
        .style("opacity", 1);
    
    
        
    //append y_percent text
    g.append("text")
        .attr("id", "percentText")
        .attr("y", -145)
        .attr("x", -325)
        .attr("dy", "0.9em")
        .attr("transform", "rotate(-90)")
        .style("opacity", 0)
        .text("percentage of the year")
        .transition()
        .duration(500)
        .style("opacity", 1);
    
    //Draw y_percent title box/button
    g.append("rect")
        .attr("id", "percentRect")
        .attr("x", -335)
        .attr("y", -145)
        .attr("rx", 5)
        .attr("ry", 5)
        .attr("height", "20px")
        .attr("width", 175)
        .attr("transform", "rotate(-90)")
        .style("stroke", "#000000")
        .style("fill", "#ffffff")
        .style("fill-opacity", "0")
        .style("opacity",0)
        .on("mouseover", function() {
            svg.select("#percentRect")
                .style("stroke-width","3px");
            }
        )
        .on("mouseout", function() {
            svg.select("#percentRect")
                .style("stroke-width","1px");
            }
        )
        .on("click", function() {
            show_number = false;
                move_percent();
                draw_line();
         })
        .transition()
        .duration(500)
        .style("opacity",1);
    
    
    var visible_state = [{line_usEng: select_lang[0]},
                        {line_Chinese: select_lang[1]},
                        {line_Hebrew: select_lang[2]},
                        {line_Rus: select_lang[3]},
                        {line_Spa: select_lang[4]}];
        
    
    function draw_line(){
        //create line
        var line_usEng = g.selectAll(".word")
            .data(usEng)
            .enter()
            .append("g")
            .attr("class", "word");
        
        var line_Chinese = g.selectAll(".word")
            .data(Chinese)
            .enter()
            .append("g")
            .attr("class", "word");
        
        var line_Hebrew = g.selectAll(".word")
            .data(usEng)
            .enter()
            .append("g")
            .attr("class", "word");
        
        var line_Rus = g.selectAll(".word")
            .data(usEng)
            .enter()
            .append("g")
            .attr("class", "word");
        
        var line_Spa = g.selectAll(".word")
            .data(usEng)
            .enter()
            .append("g")
            .attr("class", "word");
        
        for (var key in visible_state){
            
            if (visible_state[key] === 1){
               key.append("path")
                  .attr("class", "line")
                  .style("pointer-events", "none") // Stop line interferring with cursor
                  .attr("d", function(d) { 
                    return show_number ? line(d.values) : line_percent(d.values); // If array key "visible" = true then draw line, if not then don't 
                  })
                 .attr("clip-path", "url(#clip)")//use clip path to make irrelevant part invisible
                 .style("stroke", function(d) { return z(d.id); })
                 .on("mouseover", function(d) {
                        toolTip.transition()
                               .duration(200)
                               .style("opacity", .9);
                        toolTip.html(d.language + "<br/>" + "Num. of Books " + d.number
                                + "<br/>" + "% in the year" + d.number/d.sum + "%" 
                               .style("left", (d3.event.pageX) + "px")
                               .style("top", (d3.event.pageY - 28) + "px"));         
                  })
                  .on("mouseout", function(d){
                         toolTip.transition()
                                .duration(500)
                                .style("opacity", 0);
                   });
             }
        }
        
    }
    
    //updated move_percent()function
    
    function move_percent(){
    g.selectAll(".axis-y")
        .attr("transform", "translate(" + (show_number ? "0" : "-80") + ", 0)");
    g.selectAll("#rightText")
        .attr("y", show_number ? -75 : -150);
    g.selectAll("#rightRect")
        .attr("y", show_number ? -75: - 150);

    g.selectAll(".axis-y-percent")
        .transition()
        .duration(500)
        .attr("transform", "translate(" + (show_number ? "-90" : "0") + ", 0)" );
    g.selectAll("#percentText")
        .transition()
        .duration(500)
        .attr("y", show_number ? -145 : -65);
    g.selectAll("#percentRect")
        .transition()
        .duration(500)
        .attr("y", show_number ? -145: - 65);
    }

});

//bind with multiseries data
function type(d, _, columns) {
    d.year = parseDate(d.year);
    //iterate through each column
    for(var i = 1, n = columns.length, c; i < n; ++i)
        //bind column data to year
        d[c = columns[i]] = +d[c];
        return d;
}

function findMaxY(data){  // Define function "findMaxY"
    var maxYValues = data.map(function(d) { 
      if (d.visible){
        return d3.max(d.values, function(value) { // Return max rating value
          return value.rating; })
      }
    });
    return d3.max(maxYValues);
}
