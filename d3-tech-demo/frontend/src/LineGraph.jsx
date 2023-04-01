import { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3'

function LineGraph() {
  const [data] = useState([21,52,83,34,53,68]);
  const svgRef = useRef();

  useEffect(() => {
    const w = 1800;
    const h = 500;
    const svg = d3.select(svgRef.current)
    .attr('width', w)
    .attr('height', h)
    .style('background', '#d3d3d3')
    .style('overflow', 'visible');
    
    // scaling
    const xScale = d3.scaleLinear().domain([0, data.length-1]).range([0, w])
    const yScale = d3.scaleLinear().domain([0, 100]).range([h, 0]) // range is inverted as it goes from top to bottom
    const generateScaledLine = d3.line()
    .x((d, i) => xScale(i))
    .y(yScale)
    .curve(d3.curveCardinal)

    // axes
    const xAxis = d3.axisBottom(xScale)
    .ticks(data.length)
    .tickFormat(i => i+1);
    const yAxis = d3.axisLeft(yScale)
    .ticks(5);
    svg.append('g')
    .call(xAxis)
    .attr('transform', `translate(0, ${h})`);
    svg.append('g')
    .call(yAxis);
    svg.append("text")
    .attr("x", 720)
    .attr("y", 40)
    .attr("font-size", "32px")
    .attr("font-family", "trebuchet ms, sans-serif")
    .attr("font-weight", "bold")
    .attr("fill", "black")
    .text("Line Graph of Data")

    // data for svg
    svg.selectAll('.line').data([data]).join('path')
    .attr('d', d => generateScaledLine(d))
    .attr('fill', 'none')
    .attr('stroke', 'black')
  }, [data]);

  return (
    <div className='Graph'>
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default LineGraph;
