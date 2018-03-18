var width = 1080;
var height = 800;

var svg = d3.select("svg")
            .attr("margin", "auto")
            .attr("width", width)
            .attr("height", height);

// axis
// area chart
// 5 toggles
// legend
// brush
// rightside information display

// 干巴爹！

d3.queue()
    .defer(d3.csv, "usEng.csv")
    .defer(d3.csv, "Chinese.csv")
    .defer(d3.csv, "Heb.csv")
    .defer(d3.csv, "rus.csv")
    .defer(d3.csv, "spa.csv")
    .await(function(error, usEng_file, chi_file, heb_file, rus_file, spa_file) {
        if (error) {console.error("csv reading error: " + error)}
        else {
            // here we have read already! do your work here! yeah^^
        }
});