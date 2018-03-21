var svg = d3.select("svg")
            .attr("width", 1080)
            .attr("height", 960);

var margin = {top: 100, right: 80, bottom: 40, left: 150},
    width = svg.attr("width") - margin.left - margin.right,
    height = svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," +margin.top + ")");

//color Def
var usBlue = "#2222ff", chiRed = "#ee4444", hebGreen = "#33cc33", rusDarkBlue = "#222299", spaYellow = "#ffaa33";

//define time format
var parseDate = d3.timeParse("%Y");
var show_number = true;
var maxY;

//define scales
var x = d3.scaleTime().range([0, width]),
    y = d3.scaleLinear().range([height, 0]),
    y_percent = d3.scaleLinear().range([height,0]),

    //color scale
    z = d3.scaleOrdinal(d3.schemeCategory20);

//define line generator
var line = d3.line()
    .curve(d3.curveBasis)//interpolated using curveBasis: smooth
    .x(function(d) { return x(d.year); })
    .y(function(d) { return y(d.number); });

var line_percent = d3.line()
    .curve(d3.curBasis)
    .x(function(d){ return x(d.year)})
    .y(function(d) {return y(d.number/d.sum)});

var select_lang = [1,1,1,1,1];

//========== Toggle buttons =============
g.append("text")
        .attr("class", "toggleText")
        .style("fill", usBlue)
        .attr("x", 80)
        .attr("y", 20)
        .style("opacity", 1)
        .text("American English")
g.append("rect")
        .attr("id", "usEng_button")
        .attr("x", 75)
        .attr("y", 5)
        .attr("height", "20px")
        .attr("width", "130px")
        .style("stroke", usBlue)
        .style("fill", "#ffffff")
        .style("fill-opacity", "0")
        .style("opacity", 1)
        .on("mouseover", function() { 
            svg.select("#usEng_button")
                .style("stroke-width","5px"); 
            }
        )
        .on("mouseout", function() { 
            svg.select("#usEng_button")
                .style("stroke-width","1px");
            }
        )
        .on("click", function() {
            if(select_lang[0] == 0){
                svg.selectAll("#usEng_button")
                select_lang[0] = 1;
            } else {
                svg.selectAll("#useEng_button")
                select_lang[0] = 0;
            }
        });

g.append("text")
        .attr("class", "toggleText")
        .style("fill", chiRed)
        .attr("x", width/10 * 3)
        .attr("y", 20)
        .style("opacity", 1)
        .text("Chinese")

g.append("rect")
        .attr("id", "chi_button")
        .attr("x", width/10 * 3 - 5)
        .attr("y", 5)
        .attr("height", "20px")
        .attr("width", "130px")
        .style("stroke", chiRed)
        .style("fill", "#ffffff")
        .style("fill-opacity", "0")
        .style("opacity", 1)
        .on("mouseover", function() { 
            svg.select("#chi_button")
                .style("stroke-width","5px"); 
            }
        )
        .on("mouseout", function() { 
            svg.select("#chi_button")
                .style("stroke-width","1px");
            }
        )
        .on("click", function() {
            if(select_lang[1] == 0){
                svg.selectAll("#usEng_button")
                select_lang[1] = 1;
            } else {
                svg.selectAll("#useEng_button")
                select_lang[1] = 0;
            }
        });

g.append("text")
        .attr("class", "toggleText")
        .style("fill", hebGreen)
        .attr("x", width/10 * 5)
        .attr("y", 20)
        .style("opacity", 1)
        .text("Hebrew")
g.append("rect")
        .attr("id", "heb_button")
        .attr("x", width/10 * 5 - 5)
        .attr("y", 5)
        .attr("height", "20px")
        .attr("width", "130px")
        .style("stroke", hebGreen)
        .style("fill", "#ffffff")
        .style("fill-opacity", "0")
        .style("opacity", 1)
        .on("mouseover", function() { 
            svg.select("#heb_button")
                .style("stroke-width","5px"); 
            }
        )
        .on("mouseout", function() { 
            svg.select("#heb_button")
                .style("stroke-width","1px");
            }
        )
        .on("click", function() {
            if(select_lang[2] == 0){
                svg.selectAll("#heb_button")
                select_lang[2] = 1;
            } else {
                svg.selectAll("#heb_button")
                select_lang[2] = 0;
            }
        });

g.append("text")
        .attr("class", "toggleText")
        .style("fill", rusDarkBlue)
        .attr("x", width / 10 * 7)
        .attr("y", 20)
        .style("opacity", 1)
        .text("Russian")
g.append("rect")
        .attr("id", "rus_button")
        .attr("x", width / 10 * 7 - 5)
        .attr("y", 5)
        .attr("height", "20px")
        .attr("width", "130px")
        .style("stroke", rusDarkBlue)
        .style("fill", "#ffffff")
        .style("fill-opacity", "0")
        .style("opacity", 1)
        .on("mouseover", function() { 
            svg.select("#rus_button")
                .style("stroke-width","5px"); 
            }
        )
        .on("mouseout", function() { 
            svg.select("#rus_button")
                .style("stroke-width","1px");
            }
        )
        .on("click", function() {
            if(select_lang[3] == 0){
                svg.selectAll("#rus_button")
                select_lang[3] = 1;
            } else {
                svg.selectAll("#rus_button")
                select_lang[3] = 0;
            }
        });

g.append("text")
        .attr("class", "toggleText")
        .style("fill", spaYellow)
        .attr("x", width/10 * 9)
        .attr("y", 20)
        .style("opacity", 1)
        .text("Spanish")
g.append("rect")
        .attr("id", "spa_button")
        .attr("x", width/10 * 9 - 5)
        .attr("y", 5)
        .attr("height", "20px")
        .attr("width", "130px")
        .style("stroke", spaYellow)
        .style("fill", "#ffffff")
        .style("fill-opacity", "0")
        .style("opacity", 1)
        .on("mouseover", function() { 
            svg.select("#spa_button")
                .style("stroke-width","5px"); 
            }
        )
        .on("mouseout", function() { 
            svg.select("#spa_button")
                .style("stroke-width","1px");
            }
        )
        .on("click", function() {
            if(select_lang[4] == 0){
                svg.selectAll("#spa_button")
                select_lang[4] = 1;
            } else {
                svg.selectAll("#spa_button")
                select_lang[4] = 0;
            }
        });
// =====================================//




d3.queue()
    .defer(d3.csv, "usEng.csv", type)
    .defer(d3.csv, "Chinese.csv", type)
    .defer(d3.csv, "Heb.csv", type)
    .defer(d3.csv, "rus.csv", type)
    .defer(d3.csv, "spa.csv", type)
    .await(function(error, usEng_data, chi_data, heb_data, rus_data, spa_data) {
        if (error) {console.error("csv reading error: " + error)}
    var list = [usEng_data, chi_data, heb_data, rus_data, spa_data];

    list.forEach(function(language) {
        //console.table(language);
        language.forEach(function(d) {
            d.data = parseDate(d.year);
            d.sum = + d.all;
        });
    });
    
    var words_usEng = list[0].columns.slice(1,10).map(function(id) {
        return {
          id: (id === "total" ? "average" : id),
          values: (id === "total" ? list[0].map(function(d) {
                return {year: d.year, number: d[id]/8, sum: +d.sum}; }) : list[0].map(function(d) {
              return {year: d.year, number:d[id], sum: +d.sum};
          })),
          visible: (id === "total" ? true : false)
        }
    });
    var words_chi = list[1].columns.slice(1,10).map(function(id) {
        return {
          id: (id === "total" ? "average" : id),
          values: (id === "total" ? list[1].map(function(d) {
                return {year: d.year, number: d[id]/8, sum: +d.sum}; }) : list[1].map(function(d) {
              return {year: d.year, number:d[id], sum: +d.sum};
          })),
          visible: (id === "total" ? true : false)
        }
    });
    var words_heb = list[2].columns.slice(1,10).map(function(id) {
        return {
          id: (id === "total" ? "average" : id),
          values: (id === "total" ? list[2].map(function(d) {
                return {year: d.year, number: d[id]/8, sum: +d.sum}; }) : list[2].map(function(d) {
              return {year: d.year, number:d[id], sum: +d.sum};
          })),
          visible: (id === "total" ? true : false)
        }
    });
    var words_rus = list[3].columns.slice(1,10).map(function(id) {
        return {
          id: (id === "total" ? "average" : id),
          values: (id === "total" ? list[3].map(function(d) {
                return {year: d.year, number: d[id]/8, sum: +d.sum}; }) : list[3].map(function(d) {
              return {year: d.year, number:d[id], sum: +d.sum};
          })),
          visible: (id === "total" ? true : false)
        }
    });
    var words_spa = list[4].columns.slice(1,10).map(function(id) {
        return {
          id: (id === "total" ? "average" : id),
          values: (id === "total" ? list[4].map(function(d) {
                return {year: d.year, number: d[id]/8, sum: +d.sum}; }) : list[4].map(function(d) {
              return {year: d.year, number:d[id], sum: +d.sum};
          })),
          visible: (id === "total" ? true : false)
        }
    });
    var list_lang = [words_usEng, words_chi, words_heb, words_rus, words_spa];
    
    var array_maxNumsOfList = [];
    list_lang.forEach(function(lang_words) {
        var temp = findMaxFromLanguageTable(lang_words);
        console.log(findMaxFromLanguageTable(lang_words));
        array_maxNumsOfList.push(temp);
    });
    
    var array_maxPercentOfList = [];
    list_lang.forEach(function(lang_words) {
        var temp = findMaxPercent(lang_words);
        array_maxPercentOfList.push(temp);
    });
    console.log(array_maxPercentOfList);
//    console.log(array_maxNumsOfList);
    
    //define x axis
    x.domain(d3.extent(usEng_data, function(d) { return d.year; }));
    //define y axis
    y.domain([
        0,
        d3.max(array_maxNumsOfList)
    ]);
    y_percent.domain([
        0,
        d3.max(array_maxPercentOfList)
    ]);

    //define color scale
    z.domain(list_lang.map(function(c) { return c.id; }));

    
    //append x axis
    g.append("g")
        .attr("class", "axis axis-x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    //append y axis
    g.append("g")
        .attr("class", "axis axis-y")
        .call(d3.axisLeft(y))
        .style("opacity", 0)
        .transition()
        .duration(500)
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
            show_number = !show_number;
            if(show_number === true){
                draw_line();
            }
         })
        .transition()
        .duration(500)
        .style("opacity",1);
    
    
    //append y_percent axis
    g.append("g")
        .attr("class", "axis axis-y-percent")
        .attr("transform", "translate(-90, 0)")
        .call(d3.axisLeft(y_percent))

        .attr("dy", "0.9em")
        .style("opacity", 0)
        .transition()
        .duration(500)
        .style("opacity", 1);
    
    
        
    //append y_percent text
    g.append("text")
        .attr("id", "percentText")
        .attr("y", -145)
        .attr("x", -300)
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
        .attr("x", -305)
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
            show_number = !show_number;
                draw_line();
         })
        .transition()
        .duration(500)
        .style("opacity",1);
        
    var line_usEng = g.selectAll(".word")
            .data(words_usEng)
            .enter()
            .append("g")
            .attr("class", "word");
        
    var line_Chinese = g.selectAll(".word")
            .data(words_chi)
            .enter()
            .append("g")
            .attr("class", "word");
        
    var line_Hebrew = g.selectAll(".word")
            .data(words_heb)
            .enter()
            .append("g")
            .attr("class", "word");
        
    var line_Rus = g.selectAll(".word")
            .data(words_rus)
            .enter()
            .append("g")
            .attr("class", "word");
        
    var line_Spa = g.selectAll(".word")
            .data(words_spa)
            .enter()
            .append("g")
            .attr("class", "word");
    
    var visible_state = [{line_usEng: select_lang[0]},
                        {line_Chinese: select_lang[1]},
                        {line_Hebrew: select_lang[2]},
                        {line_Rus: select_lang[3]},
                        {line_Spa: select_lang[4]}];
    
    function draw_line(){
        //create line
        for (var key in visible_state) {
            if (visible_state[key] == 1){
               key.append("path")
                  .attr("class", "line")
                  .style("pointer-events", "none") // Stop line interferring with cursor
                  .attr("d", function(d) { 
                    return show_number ? line(d.values) : line_percent(d.values); // If array key "visible" = true then draw line, if not then don't 
                  })
                 .attr("clip-path", "url(#clip)")//use clip path to make irrelevant part invisible
                 .style("stroke", chiRed);
//                 .style("stroke", function(d) { return z(d.id); });
            }
        }
        
    }

    
//    //**************************//
//    //append x axis
//    g.append("g")
//        .attr("class", "axis axis-x")
//        .attr("transform", "translate(0," + height + ")")
//        .call(d3.axisBottom(x));
//
//    //append y axis
//    g.append("g")
//        .attr("class", "axis axis-y")
//        .call(d3.axisLeft(y))
//        .append("text")
//        .attr("transform", "rotate(-90)")
//        .attr("y", -90)
//        .attr("x", -125)
//        .attr("dy", "0.9em")
//        .attr("fill", "#000")
//        .text("Volume of Books");
//
//    //append data to svg
//    var Trend_usEng = g.selectAll(".language")
//        .data(words_usEng)
//        .enter()
//        .append("g")
//        .attr("class", "language");
//    var Trend_chi = g.selectAll(".language")
//        .data(words_chi)
//        .enter()
//        .append("g")
//        .attr("class", "language");
//    var Trend_heb = g.selectAll(".language")
//        .data(words_heb)
//        .enter()
//        .append("g")
//        .attr("class", "language");
//    var Trend_rus = g.selectAll(".language")
//        .data(words_rus)
//        .enter()
//        .append("g")
//        .attr("class", "language");
//    var Trend_spa = g.selectAll(".language")
//        .data(words_spa)
//        .enter()
//        .append("g")
//        .attr("class", "language");
//
//    //append Trend path to svg with animation
//    Trend_usEng.append("path")
//      .attr("class", "line")
//      .style("pointer-events", "none") // Stop line interferring with cursor
//      .attr("id", function(d) {
//        return "line-" + d.id; // Give line id of line-(insert issue name, with any spaces replaced with no spaces)
//      })
//      .attr("d", function(d) {
//        console.log(d);
//        var Opacity = d.visible ? 1 : 0;
//        d3.select("#line-"+d.id).style("opacity", Opacity);  
//        return line(d.values); // If array key "visible" = true then draw line, if not then don't 
//        })
//      .style("stroke", function(d) { return z(d.id); });
});

////load data
//var data = d3.csv("usEng.csv", type, function(error, data) {
//    if(error) throw error;
//    data.forEach(function(d) { // Make every date in the csv data a javascript date object format
//      d.date = parseDate(d.year);
//      d.sum = + d.all;
//    });
//    //parse data
//    var words = data.columns.slice(1,10).map(function(id) {
//        return {
//            id: id,
//            values: data.map(function(d) {
//                return {year: d.year, number: d[id], sum: +d.sum};
//            }),
//            visible: (id === "total" ? true : false) // "visible": all false except for total which is true.    
//        };
//    });
//    console.log(words)
//
//    //define x axis
//    x.domain(d3.extent(data, function(d) { return d.year; }));
//
//    //define y axis
//    y.domain([
//        d3.min(words, function(c) { return d3.min(c.values, function (d) { return d.number; }); }),
//        d3.max(words, function(c) { return d3.max(c.values, function(d) { return d.number; }); })
//    ]);
//
//    //define color scale
//    z.domain(words.map(function(c) { return c.id; }));
//
//    
//    //append x axis
//    g.append("g")
//        .attr("class", "axis axis-x")
//        .attr("transform", "translate(0," + height + ")")
//        .call(d3.axisBottom(x));
//
//    //append y axis
//    g.append("g")
//        .attr("class", "axis axis-y")
//        .call(d3.axisLeft(y))
//        .append("text")
//        .attr("transform", "rotate(-90)")
//        .attr("y", -90)
//        .attr("x", -125)
//        .attr("dy", "0.9em")
//        .attr("fill", "#000")
//        .text("Volume of Books");
//
//    //append word data to svg
//    var word = g.selectAll(".word")
//        .data(words)
//        .enter()
//        .append("g")
//        .attr("class", "word");
//
//
//    //append word path to svg with animation
//    word.append("path")
//      .attr("class", "line")
//      .style("pointer-events", "none") // Stop line interferring with cursor
//      .attr("id", function(d) {
//        return "line-" + d.id; // Give line id of line-(insert issue name, with any spaces replaced with no spaces)
//      })
//      .attr("d", function(d) { 
//        var Opacity = d.visible ? 1 : 0;
//        d3.select("#line-"+d.id).style("opacity", Opacity);  
//        return line(d.values); // If array key "visible" = true then draw line, if not then don't 
//    })
//      .attr("clip-path", "url(#clip)")//use clip path to make irrelevant part invisible
//      .style("stroke", function(d) { return z(d.id); });
//
//      var legendSpace = 600 / words.length; // 450/number of issues (ex. 40)  
//    
//      word.append("rect")
//      .attr("width", 10)
//      .attr("height", 10)                                    
//      .attr("y", (margin.right/3) - 50) 
//      .attr("x", function (d, i) { return (legendSpace)+i*(legendSpace); })  // spacing
//      .attr("fill",function(d) {
//        return d.visible ? z(d.id) : "#F1F1F2"; // If array key "visible" = true then color rect, if not then make it grey 
//      })
//      .attr("class", "legend-box")
//    
//    
//      .on("click", function(d){ // On click make d.visible 
//        d.visible = !d.visible; // If array key for this data selection is "visible" = true then make it false, if false then make it true
//        
//        maxY = findMaxY(words); // Find max Y rating value categories data with "visible"; true
//        y.domain([0,maxY]); // Redefine yAxis domain based on highest y value of categories data with "visible"; true
//        
//        svg.select("axis-y")
//          .transition()
//          .call(d3.axisLeft(y))
//        		  
//        var newOpacity = d.visible ? 1 : 0;
//        d3.select("#line-"+d.id).style("opacity", newOpacity);
//       
//        word.select("rect")
//          .transition()
//          .attr("fill", function(d) {
//          return d.visible ? z(d.id) : "#F1F1F2";
//        });
//    
//          
//      })
//          
//      word.append("text")
//      .attr("y", (margin.right/3) - 55) 
//      .attr("x", function (d, i) { return (legendSpace)+i*(legendSpace); })  // (return (11.25/2 =) 5.625) + i * (5.625) 
//      .text(function(d) { return d.id; }); 
//
//});

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

function findMaxFromLanguageTable(data) {
    var maxValues = data.map(function(d) {
        if (d.visible){
            return d3.max(d.values, function(value) {
                return value.number;
            });
        }
    });
    return d3.max(maxValues);
}

function findMaxPercent(data) {
    var maxValues = data.map(function(d) {
        if (d.visible){
            return d3.max(d.values, function(value) {
                return value.number / value.sum;
            });
        }
    });
    return d3.max(maxValues); 
}