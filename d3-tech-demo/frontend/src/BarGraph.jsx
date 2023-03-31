import { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3'

function BarGraph() {
  const [data] = useState([0]);
  const svgRef = useRef();
  const [achievements, setData] = useState(["name", 100]);

  useEffect(() => {
  axios.get("http://localhost:3000/api/csgo")
  .then(response => setData(response.data.achievementpercentages.achievements))
  }, []);

  const achievementList = Array(achievements.length);
  const percentList = Array(achievements.length);
  for(let i = 0; i < achievements.length; i++){
    achievementList[i] = achievements[i].name;
    percentList[i] = achievements[i].percent;
  }

  useEffect(() => {
    const w = 1000;
    const h = 500;
    const svg = d3.select(svgRef.current)
    .attr('width', w)
    .attr('height', h)
    .style('background', '#d3d3d3')
    .style('margin-top', 50)
    .style('overflow', 'visible');
    
    // scaling
    const xScale = d3.scaleLinear().domain([0, percentList.length-1]).range([0, w])
    const yScale = d3.scaleLinear().domain([0, 100]).range([h, 0]) // range is inverted as it goes from top to bottom
    const generateScaledLine = d3.line()
    .x((d, i) => xScale(i))
    .y(yScale)
    .curve(d3.curveCardinal)

    // axes
    const xAxis = d3.axisBottom(xScale)
    .ticks(percentList.length)
    .tickFormat(i => i+1);
    const yAxis = d3.axisLeft(yScale)
    .ticks(5);
    svg.append('g')
    .call(xAxis)
    .attr('transform', `translate(0, ${h})`);
    svg.append('g')
    .call(yAxis);

    // data for svg
    svg.selectAll('.line').data([percentList]).join('path')
    .attr('d', d => generateScaledLine(d))
    .attr('fill', 'none')
    .attr('stroke', 'black')
  }, [percentList]);

  return (
    <div className='Graph'>
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default BarGraph;
