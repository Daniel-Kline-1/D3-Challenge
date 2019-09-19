


  var svgWidth = window.innerWidth;
  var svgHeight = window.innerHeight;

  var margin = {
    top: 50,
    bottom: 100,
    right: 50,
    left: 100
  };

  var height = svgHeight - margin.top - margin.bottom;
  var width = svgHeight - margin.left - margin.right;

  // Append SVG element
  var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);

  // Append group element
  var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Read CSV
  //d3.csv("../assets/data/data.csv").then(function(response) {
    d3.csv("assets/data/data.csv", function( response) {
//console.log(data.healthcareLow);
    // create date parser
    console.log(response)
    var dateParser = d3.timeParse("%d-%b");
    // X axis will be poverty
    // Y axis will be healthcareLow

    response.forEach(function(data){
      data.poverty = +data.poverty;
      data.healthcare = +data.healthcare;
    })

    var poverty = response.map( d=>d.poverty )
    var healthcare = response.map( d=> d.healthcare)
    console.log(d3.extent(poverty));
    console.log(d3.extent(healthcare))
      
    var xLinearScale = d3.scaleLinear()
      .domain(d3.extent(response, d => d.poverty))
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain(d3.extent(response, d => d.healthcare))
      .range([height, 0]); 
      

    // create axes
    var xAxis = d3.axisBottom(xLinearScale);
    var yAxis = d3.axisLeft(yLinearScale).ticks(7);

//append axes
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis);

    chartGroup.append("g")
      .call(yAxis);
var listt = [poverty,healthcare];
console.log(listt);
chartGroup.selectAll("circle")
.data(response)
.enter()
.append("circle")
.attr("cx", d => xLinearScale(d.poverty))
.attr("cy", d => yLinearScale(d.healthcare))
.attr("r",10);
//console.log(poverty)
/////////////////////////////////////////////
///////////////////////////////////////////
//////////////////////////////////////



















var circleLabels = chartGroup.selectAll(null)
.data(response)
.enter()
.append("text");

circleLabels
  .attr("x", function(d) {
    return xLinearScale(d.poverty);
  })
  .attr("y", function(d) {
    return yLinearScale(d.healthcare);
  })
  .text(function(d) {
    return d.abbr;
  })
  .attr("font-family", "comic sans")
  .attr("font-size", "10px")
  .attr("text-anchor", "middle")
  .attr("fill", "white");

// Create axes labels
chartGroup.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", - margin.left)
  .attr("x", - (height / 2)-40)
  .attr("dy", "1em")
  .attr("class", "aText")
  .attr("id","axisY")
  .text("Lacks Healthcare (%)");

chartGroup.append("text")
  .attr("transform", `translate(${width / 2}, ${height + margin.top - 10})`)
  .attr("class", "axisText")
  .attr("id","axisX")
  .text("In Poverty (%)")












  
  });


//makeResponsive()