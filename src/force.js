// http://blog.wulk.com.tw/d3js-force-layout-v4-v5/
const d3 = require('d3')

var width = 600
var height = 600

var svg = d3
  .select('body')
  .append('svg')
  .attr('width', width)
  .attr('height', height)

// var nodes = [
//   { name: "A" },
//   { name: "B" },
//   { name: "C" },
//   { name: "D" },
//   { name: "E" },
//   { name: "F" }
// ];

var nodes = [
  { name: 'Solidity' },
  { name: 'Variables' },
  { name: 'Events' },
  { name: 'Mappings' },
  { name: 'Modifiers' },
  { name: 'Types' },
  { name: 'Imports' },
  { name: 'Source File' },
  { name: 'Remix' },
  { name: 'Deploying' },
  { name: 'Networks' },
]

var links = [
  { source: 0, target: 1 },
  { source: 1, target: 2 },
  { source: 2, target: 3 },
  { source: 2, target: 5 },
  { source: 3, target: 5 },
  { source: 4, target: 5 },
  { source: 6, target: 1 },
  { source: 7, target: 1 },
  { source: 8, target: 1 },
  { source: 9, target: 8 },
  { source: 9, target: 1 },
  { source: 9, target: 10 },
  { source: 10, target: 7 },
]

var simulation = d3
  .forceSimulation()
  .force('charge', d3.forceManyBody().strength(-200))
  .force('center', d3.forceCenter(width / 2, height / 2))
  .nodes(nodes)
  .force('link', d3.forceLink(links).distance(120))
  .on('tick', ticked)

var color = d3.scaleOrdinal(d3.schemeCategory10)

var lines = svg
  .append('g')
  .selectAll('.force-line')
  .data(links)
  .enter()
  .append('line')
  .attr('class', 'force-line')
  .attr('stroke', '#999')
  .attr('stroke-width', '1px')

var nodeGroups = svg
  .append('g')
  .selectAll('.force-node')
  .data(nodes)
  .enter()
  .append('g')
  .attr('class', 'force-node')

var circles = nodeGroups
  .append('circle')
  .attr('class', 'force-circle')
  .attr('r', 30)
  .style('fill', function(d, i) {
    return color(i)
  })

var texts = nodeGroups
  .append('text')
  .attr('class', 'force-text')
  .attr('dy', '.33em')
  .attr('text-anchor', 'middle')
  .style('fill', '#eee')
  .text(function(d) {
    // return d.name;
    return d.name.substr(0, 1)
  })

function ticked() {
  lines
    .attr('x1', function(d) {
      return d.source.x
    })
    .attr('y1', function(d) {
      return d.source.y
    })
    .attr('x2', function(d) {
      return d.target.x
    })
    .attr('y2', function(d) {
      return d.target.y
    })

  nodeGroups.attr('transform', function(d) {
    return 'translate(' + d.x + ', ' + d.y + ')'
  })
}
