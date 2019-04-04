const faker = require('faker')
const start = require('./src')

const dag_data = [
  {
    id: '0',
    parentIds: [],
    title: 'Chrome Browser',
    url: 'https://play.ethereum.org/play-workshop/',
  },
  {
    id: '1',
    parentIds: ['0'],
    title: 'Github',
    url: 'https://play.ethereum.org/play-workshop/',
  },
  {
    id: '2',
    parentIds: ['0'],
    title: 'Metamask',
    url: 'https://play.ethereum.org/play-workshop/',
  },
  {
    id: '3',
    parentIds: [],
    title: 'Solidity',
    url: 'https://play.ethereum.org/play-workshop/',
  },
  {
    id: '4',
    parentIds: ['2', '3'],
    title: 'Remix',
    url: 'https://play.ethereum.org/play-workshop/',
  },
  {
    id: '5',
    parentIds: ['1'],
    title: 'Github Pages',
    url: 'https://play.ethereum.org/play-workshop/',
    // icon: 'faker.image.imageUrl(32, 32)',
  },
  {
    id: '6',
    parentIds: ['4', '5'],
    title: 'DAPPs',
    url: 'https://play.ethereum.org/play-workshop/',
    // icon: 'faker.image.imageUrl(32, 32)',
  },
]

start('body', dag_data)

// const id = '2'
// start('body', dag_data, id)
