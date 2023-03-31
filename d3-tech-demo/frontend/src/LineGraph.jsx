import { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3'

function LineGraph() {
  const [data] = useState([1,2,3,4]);
  const [achievements, setData] = useState();
  const svgRef = useRef();
  useEffect(() => 
    {axios.get("http://localhost:3000/api/csgo")
    .then(response => setData(response.data.achievementpercentages.achievements))
  console.log(achievements)},[])
  
  console.log(achievements)

  useEffect(() => {
    const w = 400;
    const h = 100;
    const svg = d3.select(svgRef.current)
    .attr('width', w)
    .attr('height', h)
    .style('background', '#d3d3d3')
    .style('margin-top', 50)
    .style('overflow', 'visible');
    
    // scaling
    const xScale = d3.scaleLinear().domain([0, data.length-1]).range([0, w])
    const yScale = d3.scaleLinear().domain([0, h]).range([h, 0]) // range is inverted as it goes from top to bottom
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
