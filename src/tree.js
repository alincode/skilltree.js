const d3 = require('d3')

module.exports = function(data) {
  const dataStructure = d3
    .stratify()
    .id(d => d.id)
    .parentId(d => d.parent)(data)

  const treeStructure = d3.tree().size([650, 300])
  const information = treeStructure(dataStructure)

  // console.log(information.descendants());
  // console.log(information.links());

  const svg = d3
    .select('body')
    .append('svg')
    .attr('class', 'skilltree')
    .attr('width', 650)
    .attr('height', 400)
    .call(
      d3.zoom().on('zoom', function() {
        svg.attr('transform', d3.event.transform)
      })
    )
    .append('g')
    .attr('transform', 'translate(20, 20)')
  const connections = svg
    .append('g')
    .selectAll('path')
    .data(information.links())

  connections
    .enter()
    .append('path')
    .attr('fill', 'none')
    .attr('stroke', 'silver')
    .attr('stroke-width', 2)
    .attr('d', function(d) {
      return `M ${d.source.x},${d.source.y} v 30 H
      ${d.target.x} V${d.target.y}`
    })

  const rectangles = svg
    .append('g')
    .selectAll('rect')
    .data(information.descendants())

  rectangles
    .enter()
    .append('rect')
    .attr('fill', 'white')
    .attr('opacity', '1')
    .attr('width', '80px')
    .attr('height', '40px')
    .attr('stroke-width', 2)
    .attr('x', d => d.x - 40)
    .attr('y', d => d.y - 20)
  // .attr('r', 5)
  // .attr('fill', '#DCDCDC')
  // .attr('stroke', 'silver')

  const detail = d3
    .select('body')
    .append('div')
    .attr('class', 'detail')

  const names = svg
    .append('g')
    .selectAll('text')
    .data(information.descendants())

  names
    .enter()
    .append('text')
    .text(function(d) {
      return d.data.id
    })
    .attr('dominant-baseline', 'middle')
    .attr('text-anchor', 'middle')
    .attr('x', function(d) {
      return d.x
    })
    .attr('y', function(d) {
      return d.y
    })
    .classed('bigger', true)
    .on('mouseover', function(event) {
      if (detail.select('p').text != event.data.more.title) {
        detail.selectAll('p').remove()
        detail.selectAll('div').remove()
      }

      detail.append('p').text(event.data.more.title)
      detail.append('p').text(event.data.more.version)
      detail.append('p').text(event.data.more.icon)
      detail.append('p').text(event.data.more.chat)

      detail.append('p').text('lessons')
      let lessons
      for (let item of event.data.more.lessons) {
        lessons = detail.append('div').attr('class', 'lesson')
        if (item.lesson) lessons.text(item.lesson)
        if (item.tool) lessons.text(item.tool)
        if (item.info) lessons.text(item.info)
      }

      subDetail(detail, 'needs', event.data.more.needs)
      subDetail(detail, 'unlocks', event.data.more.unlocks)
    })
  // .on('mouseout', function(event) {})
}

function subDetail(detail, name, datas) {
  detail.append('p').text(name)
  let group = detail.append('div').attr('class', name)
  for (let item of datas) {
    group.text(item)
  }
}
