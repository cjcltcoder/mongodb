// <BudgetData>
console.log('Loaded data:', budgetData);

if (Array.isArray(budgetData)) {
  var width = 800;
  var height = 500;
  var radius = Math.min(width, height) / 2;

  var color = d3.scaleOrdinal()
      .domain(budgetData.map(d => d.title))
      .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

  var pie = d3.pie()
      .sort(null)
      .value(d => d.budget);

  var arc = d3.arc()
      .outerRadius(radius * 0.8)
      .innerRadius(radius * 0.4);

  var outerArc = d3.arc()
      .innerRadius(radius * 0.9)
      .outerRadius(radius * 0.9);

  var svg = d3.select('#d3PieChart')
      .append('svg')
      .attr('width', width + 100)
      .attr('height', height)
      .append('g')
      .attr('transform', 'translate(' + (width / 2 + 25) + ',' + height / 2 + ')');

  var arcs = svg.selectAll(".arc")
      .data(pie(budgetData))
      .enter().append("g")
      .attr("class", "arc");

  arcs.append("path")
      .attr("d", arc)
      .attr("fill", d => color(d.data.title))
      .attr("class", "slice");

  arcs.append("text")
      .attr("transform", function (d) {
          var pos = outerArc.centroid(d);
          pos[0] = radius * 0.9 * (midAngle(d) < Math.PI ? 1 : -1);
          return "translate(" + pos + ")";
      })
      .attr("dy", ".35em")
      .style("text-anchor", function (d) {
          return midAngle(d) < Math.PI ? "start" : "end";
      })
      .text(function (d) {
          return d.data.title;
      });

  arcs.append("polyline")
      .attr("points", function (d) {
          var pos = outerArc.centroid(d);
          pos[0] = radius * 0.9 * (midAngle(d) < Math.PI ? 1 : -1);
          return [arc.centroid(d), outerArc.centroid(d), pos];
      })
      .style("fill", "none")
      .style("stroke", "#666")
      .style("stroke-width", "1px");

} else {
  console.error('Invalid data structure. Expected an array in budgetData.');
}

function midAngle(d) {
  return d.startAngle + (d.endAngle - d.startAngle) / 2;
}
