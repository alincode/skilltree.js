const d3 = require('d3')

// 在 body 新增一個 svg element
const svg = d3.select("body").append("svg")
  .attr("width", "900")
  .attr("height", "600");

const data = [
  { "id": "Eve", "parent": "" },
  { "id": "Cain", "parent": "Eve" },
  { "id": "Seth", "parent": "Eve" },
  { "id": "Azura", "parent": "Eve" },
  { "id": "Abel", "parent": "Eve" },
  { "id": "Awan", "parent": "Eve" },
  { "id": "Enos", "parent": "Seth" },
  { "id": "Noam", "parent": "Seth" },
  { "id": "Enoch", "parent": "Awan" }
  
];

const dataStructure = d3.stratify()
  .id(function (d) { return d.id; })
  .parentId(function (d) { return d.parent; })(data);

const treeStructure = d3.tree().size([650, 300]);
const information = treeStructure(dataStructure);

// const connections = svg.append('g').selectAll('path')
//   .data(information.links());

// connections.enter().append('path')
//   .attr('d', function (d) {
//     return 'M' + d.source.x + ',' + d.source.y + 'v 50 H' +
//       d.target.x + ' V' + d.target.y;
//   });

const names = svg.append('g').selectAll('text')
  .data(information.descendants());

names.enter().append('text')
  .text(function (d) { return d.data.id; })
  .attr('text-anchor', 'middle')
  .attr('x', function (d) { return d.x + 40 })
  .attr('y', function (d) { return d.y + 80 })

const rects = svg.append('g').selectAll('rect')
  .data(information.descendants());

rects.enter().append('rect')
  .attr('width', 120).attr('height', 120)
  .attr('fill', 'gray').attr('opacity', '.1')
  .attr('x', function (d) { return d.x - 20 })
  .attr('y', function (d) { return d.y })
  .attr('rx', function (d) { return 10 })
  .attr('ry', function (d) { return 10 })
  .style('cursor', 'pointer')
  .attr('stroke', function (d) { return 'black' })
  .attr('stroke-width', function (d) { return 5 })
  .on('click', function (event) {
    console.log('click');
    // console.log(event);
  })
  .on('mouseover', function (event) {
    console.log('mouseover');
    // console.log(event);
  });


const connections = svg.append('g').selectAll('lin')
  .data(information.links());

connections.enter().append('line')
  .attr('stroke', 'gray')
  .attr('stroke-width', 5)
  .attr('x1', function (d) { return d.source.x + 35; })
  .attr('y1', function (d) { return d.source.y + 120; })
  .attr('x2', function (d) { return d.target.x + 35; })
  .attr('y2', function (d) { return d.target.y; })
  // .attr('d', function (d) {
  //   console.log(d)
  //   return `M${d.source.x + 40} ${d.target.x + 60} V${d.target.y}`;  
  // });