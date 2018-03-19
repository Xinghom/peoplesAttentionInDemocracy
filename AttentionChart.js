var svg = d3.select("svg"),
    margin = {top: 100, right: 80, bottom: 40, left: 150},
    width = svg.attr("width") - margin.left - margin.right,
    height = svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," +margin.top + ")");

//define time format
var parseDate = d3.timeParse("%Y");

var maxY;

//define scales
var x = d3.scaleTime().range([0, width]),
    y = d3.scaleLinear().range([height, 0]),
    //color scale
    z = d3.scaleOrdinal(d3.schemeCategory10);

//define line generator
var line = d3.line()
    .curve(d3.curveBasis)//interpolated using curveBasis: smooth
    .x(function(d) { return x(d.year); })
    .y(function(d) { return y(d.number); });


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
            id: id,
            values: data.map(function(d) {
                return {year: d.year, number: d[id], sum: +d.sum};
            }),
            visible: (id === "total" ? true : false) // "visible": all false except for total which is true.    
        };
    });
    console.log(words)

    //define x axis
    x.domain(d3.extent(data, function(d) { return d.year; }));

    //define y axis
    y.domain([
        d3.min(words, function(c) { return d3.min(c.values, function (d) { return d.number; }); }),
        d3.max(words, function(c) { return d3.max(c.values, function(d) { return d.number; }); })
    ]);

    //define color scale
    z.domain(words.map(function(c) { return c.id; }));

    
    //append x axis
    g.append("g")
        .attr("class", "axis axis-x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    //append y axis
    g.append("g")
        .attr("class", "axis axis-y")
        .call(d3.axisLeft(y))
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -90)
        .attr("x", -125)
        .attr("dy", "0.9em")
        .attr("fill", "#000")
        .text("Volume of Books");

    //append word data to svg
    var word = g.selectAll(".word")
        .data(words)
        .enter()
        .append("g")
        .attr("class", "word");


    //append word path to svg with animation
    word.append("path")
      .attr("class", "line")
      .style("pointer-events", "none") // Stop line interferring with cursor
      .attr("id", function(d) {
        return "line-" + d.id; // Give line id of line-(insert issue name, with any spaces replaced with no spaces)
      })
      .attr("d", function(d) { 
        var Opacity = d.visible ? 1 : 0;
        d3.select("#line-"+d.id).style("opacity", Opacity);  
        return line(d.values); // If array key "visible" = true then draw line, if not then don't 
    })
      .attr("clip-path", "url(#clip)")//use clip path to make irrelevant part invisible
      .style("stroke", function(d) { return z(d.id); });

      var legendSpace = 600 / words.length; // 450/number of issues (ex. 40)  
    
      word.append("rect")
      .attr("width", 10)
      .attr("height", 10)                                    
      .attr("y", (margin.right/3) - 50) 
      .attr("x", function (d, i) { return (legendSpace)+i*(legendSpace); })  // spacing
      .attr("fill",function(d) {
        return d.visible ? z(d.id) : "#F1F1F2"; // If array key "visible" = true then color rect, if not then make it grey 
      })
      .attr("class", "legend-box")
    
    
      .on("click", function(d){ // On click make d.visible 
        d.visible = !d.visible; // If array key for this data selection is "visible" = true then make it false, if false then make it true
        
        maxY = findMaxY(words); // Find max Y rating value categories data with "visible"; true
        y.domain([0,maxY]); // Redefine yAxis domain based on highest y value of categories data with "visible"; true
        
        svg.select("axis-y")
          .transition()
          .call(d3.axisLeft(y))
        		  
        var newOpacity = d.visible ? 1 : 0;
        d3.select("#line-"+d.id).style("opacity", newOpacity);
       
        word.select("rect")
          .transition()
          .attr("fill", function(d) {
          return d.visible ? z(d.id) : "#F1F1F2";
        });
    
          
      })
          
      word.append("text")
      .attr("y", (margin.right/3) - 55) 
      .attr("x", function (d, i) { return (legendSpace)+i*(legendSpace); })  // (return (11.25/2 =) 5.625) + i * (5.625) 
      .text(function(d) { return d.id; }); 

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

//define chart title
var title = svg.append("g")
    .attr("class", "title");
title.append("text")
    .attr("x", (width/1.25))
    .attr("y", 35)
    .attr("text-anchor", "middle")
    .style("font", "20px sans-serif")
    .text("People's attention to democratic topics");
