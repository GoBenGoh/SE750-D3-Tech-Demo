import { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3'

function BarGraph() {
  const svgRef = useRef();
  const [achievements, setData] = useState(["placeholder", 100]);

  useEffect(() => {
  axios.get("http://localhost:3000/api/csgo")
  .then(response => setData(response.data.achievementpercentages.achievements))
  }, []);

  const halfAchievements = achievements.slice(0,85);

  const w = 1800;
  const h = 500;
  const svg = d3.select(svgRef.current)
  .attr('width', w)
  .attr('height', h)
  .style('background', '#5A5A5A')
  .style('margin-top', 5)
  .style('overflow', 'visible');
    
  // scaling
  const xScale = d3.scaleBand().range([0, w]).padding(0.3);
  const yScale = d3.scaleLinear().domain([0, 100]).range([h, 0]); // range is inverted as it goes from top to bottom
  xScale.domain(halfAchievements.map(function(d) { return d.name; }));

  //Labels and Title
  svg.append("g")
  .attr("transform", "translate(0," + h + ")")
  .call(d3.axisBottom(xScale))
  .selectAll("text")  
  .style("text-anchor", "end")
  .attr("dx", "-2em")
  .attr("dy", "-0.7em")
  .attr("transform", "rotate(-90)");

  svg.append("g")
  .call(d3.axisLeft(yScale).tickFormat(function(d){
    return d;
  }).ticks(10));

  svg.append("text")
   .attr("x", 550)
   .attr("y", 50)
   .attr("font-size", "32px")
   .attr("font-family", "trebuchet ms, sans-serif")
   .attr("font-weight", "bold")
   .attr("fill", "white")
   .text("Percentage Completion of CSGO Achievements")

    // data for svg
  svg.selectAll('.bar').data(halfAchievements)
  .enter()
  .append("rect")    
  .attr("class", "bar")
  .attr("x", function(d) { return xScale(d.name); })
  .attr("y", function(d) { return yScale(d.percent); })
  .attr("width", xScale.bandwidth())
  .attr("height", function(d) { return h - yScale(d.percent); });

  return (
    <div className='Graph'>
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default BarGraph;
