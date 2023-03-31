import { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3'

function BarGraph() {
  const svgRef = useRef();
  const [achievements, setData] = useState(["name", 100]);

  useEffect(() => {
  axios.get("http://localhost:3000/api/csgo")
  .then(response => setData(response.data.achievementpercentages.achievements))
  }, []);

  useEffect(() => {
    const w = 1920;
    const h = 500;
    const svg = d3.select(svgRef.current)
    .attr('width', w)
    .attr('height', h)
    .style('background', '#5A5A5A')
    .style('margin-top', 50)
    .style('overflow', 'visible');
    
    // scaling
    const xScale = d3.scaleBand().range([0, w]).padding(0);
    const yScale = d3.scaleLinear().domain([0, 100]).range([h, 0]); // range is inverted as it goes from top to bottom

    xScale.domain(achievements.map(function(d) { return d.name; }));
    yScale.domain([0, d3.max(achievements, function(d) { return d.percent; })]);

    svg.append("g")
         .attr("transform", "translate(0," + h + ")")
         .call(d3.axisBottom(xScale));

    svg.append("g")
    .call(d3.axisLeft(yScale).tickFormat(function(d){
        return d;
    }).ticks(10));

    // data for svg
    svg.selectAll('.bar').data(achievements)
    .enter()
    .append("rect")    
    .attr("class", "bar")
    .attr("x", function(d) { return xScale(d.name); })
    .attr("y", function(d) { return yScale(d.percent); })
    .attr("width", xScale.bandwidth())
    .attr("height", function(d) { return h - yScale(d.percent); });

  }, [achievements]);

  return (
    <div className='Graph'>
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default BarGraph;
