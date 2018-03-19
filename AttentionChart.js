var margin = {top: 20, right: 200, bottom: 100, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var svg = d3.select("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom) //height + margin.top + margin.bottom
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var parseDate = d3.timeParse("%Y");

var xScale = d3.scaleTime()
    .range([0, width]);

var yScale = d3.scaleLinear()
    .range([height, 0]);


var color = d3.scaleOrdinal(d3.schemeCategory10);

var line = d3.line()
    .x(function(d) { return xScale(d.date); })
    .y(function(d) { return yScale(d.number); })
    .defined(function(d) { return d.number; });  // Hiding line value defaults of 0 for missing data



// Create invisible rect for mouse tracking
svg.append("rect")
    .attr("width", width)
    .attr("height", height)                                    
    .attr("x", 0) 
    .attr("y", 0)
    .attr("id", "mouse-tracker")
    .style("fill", "white");


d3.csv("usEng.csv", function(error, data) { 
        if (error) throw error; 
            // here we have read already! do your work here! yeah^^
        color.domain(d3.keys(data[0]).filter(function(key) { // Set the domain of the color ordinal scale to be all the csv headers except "date", matching a color to an issue
          return key !== "date"; 
        }));
        data.forEach(function(d) { // Make every date in the csv data a javascript date object format
          d.date = parseDate(d.year);
        });
            
        var categories = color.domain().map(function(name) { // Nest the data into an array of objects with new keys

          return {
            name: name, // "name": the csv headers except date
            values: data.map(function(d) { // "values": which has an array of the dates and ratings
              return {
                date: d.date, 
                number: +(d[name]),
                };
            }),
            visible: (name == "total" ? true : false) // "visible": all false except for total which is true.
             };
        });
            
        console.table(categories);
//        categories.forEach(function(d) {
//            console.log(d);
//            console.log(d.visible);
//            console.log(d.values);
//            console.log(d.name);
//            
//        });
    
        xScale.domain(d3.extent(data, function(d) { return d.date; })); // extent = highest and lowest points, domain is data, range is bouding box
    
        // yScale had problem, since we should fix it to adapt to maximum value of data
        yScale.domain([0,
                       3500000
//                       d3.max(categories, function(d){
//                                  if (d.visible == true) {
//                                        console.table(d.values);
//                                        return d3.max(d.values, function(num) {
//                                            console.log(num);
//                                            return num;
//                                        });
//                                    }
//                            })
                      ]);
            
        // Add the x Axis
        svg.append("g")
               .attr("class", "x axis")
               .attr("transform", "translate(0," + height + ")")
               .call(d3.axisBottom(xScale));

        svg.append("g")
               .attr("class", "y axis")
               .call(d3.axisLeft(yScale))
               .append("text")
               .attr("transform", "rotate(-90)")
               .attr("y", 6)
               .attr("x", -10)
               .attr("dy", ".71em")
               .style("text-anchor", "end")
               .text("Volume of Books");
            
        var issue = svg.selectAll(".issue")
                .data(categories) // Select nested data and append to new svg group elements
                .enter().append("g")
                .attr("class", "issue");   

        issue.append("path")
                 .attr("class", "line")
                 .style("pointer-events", "none") // Stop line interferring with cursor
                 .attr("id", function(d) {
                  return "line-" + d.name.replace(" ", "").replace("/", ""); // Give line id of line-(insert issue name, with any spaces replaced with no spaces)
                 })
                 .attr("d", function(d) { 
                  return d.visible ? line(d.values) : null; // If array key "visible" = true then draw line, if not then don't 
                  })
                 .attr("clip-path", "url(#clip)")//use clip path to make irrelevant part invisible
                 .style("stroke", function(d) { return color(d.name); });

        // draw legend
        var legendSpace = 450 / categories.length; // 450/number of issues (ex. 40)    

        issue.append("rect")
          .attr("width", 10)
          .attr("height", 10)                                    
          .attr("x", width + (margin.right/3) - 15) 
          .attr("y", function (d, i) { return (legendSpace)+i*(legendSpace) - 8; })  // spacing
          .attr("fill",function(d) {
            return d.visible ? color(d.name) : "#F1F1F2"; // If array key "visible" = true then color rect, if not then make it grey 
          })
          .attr("class", "legend-box")

          .on("click", function(d){ // On click make d.visible 
            d.visible = !d.visible; // If array key for this data selection is "visible" = true then make it false, if false then make it true
        })
});