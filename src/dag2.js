// const d3 = require('d3')
// const d3_dag = require('d3-dag')

function getD3() {
  const d3_base = require('d3')
  const d3_dag = require('d3-dag')
  return Object.assign({}, d3_base, d3_dag)
}

const d3 = getD3()

d3.json(
  'https://raw.githubusercontent.com/erikbrinkman/d3-dag/master/examples/grafo.json'
).then(grafo => {
  const dag = d3.dagStratify()(grafo)

  d3
    .sugiyama()
    .decross(d3.decrossTwoLayer())
    .coord(d3.coordGreedy())(dag)

  const links = dag.links()
  const descendants = dag.descendants()

  const width = 400
  const height = 400

  const svg = d3
    .select('body')
    .append('svg')
    .attr('width', width * 1.5)
    .attr('height', height * 1.5)

  const line = d3
    .line()
    .curve(d3.curveCatmullRom)
    .x(d => d.x * width)
    .y(d => d.y * height)

  const g = svg.append('g').attr('transform', `translate(${100},${100})`)

  g.append('g')
    .selectAll('path')
    .data(links)
    .enter()
    .append('path')
    .attr('d', ({ source, target, data }) =>
      line(
        [
          {
            x: source.x,
            y: source.y,
          },
        ].concat(data.points || [], [
          {
            x: target.x,
            y: target.y,
          },
        ])
      )
    )
    .attr('fill', 'none')
    .attr('stroke', 'black')

  const nodes = g
    .append('g')
    .selectAll('g')
    .data(descendants)
    .enter()
    .append('g')
    .attr('transform', ({ x, y }) => `translate(${x * width}, ${y * height})`)

  nodes
    .append('circle')
    .attr('r', 20)
    .attr('fill', 'white')
    .attr('stroke', 'black')

  // Add text, which screws up measureement
  nodes
    .append('text')
    .text(d => d.id)
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'middle')
})
