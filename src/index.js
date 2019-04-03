const faker = require('faker')
const _ = require('lodash')

const width = 400
const height = 400
const offset = 30
const defaultIcon = faker.image.imageUrl(32, 32)

function getD3() {
  const d3_base = require('d3')
  const d3_dag = require('d3-dag')
  return Object.assign({}, d3_base, d3_dag)
}

const d3 = getD3()

function getSources() {
  return {
    Grafo: ['grafo', d3.dagStratify()],
    'X-Shape': ['ex', d3.dagStratify()],
    Zherebko: ['zherebko', d3.dagConnect().linkData(() => ({}))],
  }
}

const sources = getSources()
const source = 'Grafo'

async function getChildNodes(dag_data, parentNode) {
  const mySubs = _.filter(dag_data, o => _.includes(o.parentIds, parentNode.id))
  const allSubs =
    mySubs.length > 0
      ? await Promise.all(mySubs.map(sub => getChildNodes(dag_data, sub)))
      : []
  return _.flattenDeep(_.concat([parentNode], allSubs))
}

async function getFilterData(dag_data, id) {
  const rootNode = _.find(dag_data, ['id', id])
  let datas = await getChildNodes(dag_data, rootNode)
  datas = _.map(datas, function(o) {
    if (o.id === id) return _.pick(o, ['id', 'title', 'url', 'icon'])
    return o
  })
  return datas
}

async function getDag(dag_data, id) {
  const [key, reader] = sources[source]
  // const dag_data = await d3.json(
  // `https://raw.githubusercontent.com/erikbrinkman/d3-dag/master/examples/${key}.json`
  // )
  let datas = id ? await getFilterData(dag_data, id) : dag_data

  return reader(datas)
}

function getLayerings() {
  return {
    'Simplex (slow)': d3.layeringSimplex(),
    'Longest Path (fast)': d3.layeringLongestPath(),
    'Coffman Graham (medium)': d3.layeringCoffmanGraham(),
  }
}

const layerings = getLayerings()
const layering = 'Simplex (slow)'

function getDecrossings() {
  return {
    'Optimal (slow)': d3.decrossOpt(),
    'Two Layer Opt (medium)': d3.decrossTwoLayer().order(d3.twolayerOpt()),
    'Two Layer (flast)': d3.decrossTwoLayer(),
  }
}

const decrossings = getDecrossings()
const decross = 'Optimal (slow)'

function getCoords() {
  return {
    'Vertical (slow)': d3.coordVert(),
    'Minimum Curves (slow)': d3.coordMinCurve(),
    'Greedy (medium)': d3.coordGreedy(),
    'Center (fast)': d3.coordCenter(),
  }
}

const coords = getCoords()
const coord = 'Greedy (medium)'

const layout = d3
  .sugiyama()
  .size([width, height])
  .layering(layerings[layering])
  .decross(decrossings[decross])
  .coord(coords[coord])

async function start(rootElemntName, dag_data, id) {
  const dag = await getDag(dag_data, id)

  function getTime() {
    const start = Date.now()
    layout(dag)
    return Date.now() - start
  }

  const time = getTime()

  // This code only handles rendering
  const nodeRadius = 25

  const svg = d3
    .select(rootElemntName)
    .append('svg')
    .attr('width', width * 1.2)
    .attr('height', height * 1.2)
    .attr(
      'viewbox',
      `${-nodeRadius} ${-nodeRadius} ${width + 2 * nodeRadius} ${height +
        2 * nodeRadius}`
    )

  const tooltip = d3
    .select(rootElemntName)
    .append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0)
    .style('position', 'absolute')
    .style('text-align', 'left')
    .style('width', '160px')
    .style('height', '80px')
    .style('padding', '2px')
    .style('padding', '2px')
    .style('font', '12px sans-serif')
    .style('background', 'lightsteelblue')
    .style('border', '0px')
    .style('order-radius', '8px')
    .style('pointer-events', 'none')

  const defs = svg.append('defs') // For gradients

  // Use computed layout
  layout(dag)

  const steps = dag.size()
  const interp = d3.interpolateRainbow
  const colorMap = {}
  dag.each((node, i) => {
    colorMap[node.id] = interp(i / steps)
  })

  // How to draw edges
  const line = d3
    .line()
    .curve(d3.curveCatmullRom)
    .x(d => d.x + offset)
    .y(d => d.y + offset)

  // Plot edges
  svg
    .append('g')
    .selectAll('path')
    .data(dag.links())
    .enter()
    .append('path')
    .attr('d', ({ data }) => line(data.points))
    .attr('fill', 'none')
    .attr('stroke-width', 3)
    .attr('stroke', ({ source, target }) => {
      const gradId = `${source.id}-${target.id}`
      const grad = defs
        .append('linearGradient')
        .attr('id', gradId)
        .attr('gradientUnits', 'userSpaceOnUse')
        .attr('x1', source.x)
        .attr('x2', target.x)
        .attr('y1', source.y)
        .attr('y2', target.y)
      grad
        .append('stop')
        .attr('offset', '0%')
        .attr('stop-color', colorMap[source.id])
      grad
        .append('stop')
        .attr('offset', '100%')
        .attr('stop-color', colorMap[target.id])
      return `url(#${gradId})`
    })

  // Select nodes
  const nodes = svg
    .append('g')
    .selectAll('g')
    .data(dag.descendants())
    .enter()
    .append('g')
    .attr('title', n => n.id)
    .attr('transform', ({ x, y }) => `translate(${x + offset}, ${y + offset})`)

  // Plot node circles
  nodes
    .append('defs')
    .append('pattern')
    .attr('id', n => `img${n.id}`)
    .attr('x', 0 - 15)
    .attr('y', 0 - 20)
    .attr('height', '100%')
    .attr('width', '100%')
    .attr('patternUnits', 'userSpaceOnUse')
    .append('image')
    .attr('x', 0)
    .attr('y', 0)
    .attr('xlink:href', n => (n.data.icon ? n.data.icon : defaultIcon))
  // .attr('r', nodeRadius)
  // .attr('fill', n => colorMap[n.id])

  nodes
    .append('circle')
    .attr('r', nodeRadius)
    .attr('fill', n => `url(#img${n.id})`)
    .on('click', n => window.open(n.data.url))
    .on('mousemove', function(d) {
      tooltip
        .transition()
        .duration(200)
        .style('opacity', 0.9)

      tooltip
        .html(`${d.data.title}`)
        .style('left', d.x + 60 + 'px')
        .style('top', d.y + 15 + 'px')
        .style('z-index', 99)
    })
    .on('mouseout', function(d) {
      tooltip
        .transition()
        .duration(5000)
        .style('opacity', 0)
    })
  // .append('title')
  // .text(n => `title:  \n ${n.data.title}`)
  // .attr('fill', n => colorMap[n.id])

  const arrow = d3
    .symbol()
    .type(d3.symbolTriangle)
    .size((nodeRadius * nodeRadius) / 5.0)

  svg
    .append('g')
    .selectAll('path')
    .data(dag.links())
    .enter()
    .append('path')
    .attr('d', arrow)
    .attr('transform', ({ source, target, data }) => {
      const [end, start] = data.points.reverse()
      const dx = start.x - end.x
      const dy = start.y - end.y
      const scale = (nodeRadius * 1.15) / Math.sqrt(dx * dx + dy * dy)
      const angle = (Math.atan2(-dy, -dx) * 180) / Math.PI + 90
      return `translate(${end.x + offset + dx * scale}, ${end.y +
        offset +
        dy * scale}) rotate(${angle})`
    })
    .attr('fill', ({ target }) => colorMap[target.id])
    .attr('stroke', 'white')
    .attr('stroke-width', 1.5)

  // Add text to nodes
  // nodes
  //   .append('text')
  //   .text(d => d.id)
  //   .attr('font-weight', 'bold')
  //   .attr('font-family', 'sans-serif')
  //   .attr('text-anchor', 'middle')
  //   .attr('alignment-baseline', 'middle')
  //   .attr('fill', 'white')
}

module.exports = start
