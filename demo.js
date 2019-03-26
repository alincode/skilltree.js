const faker = require('faker')
const app = require('./src/tree')

const data = [
  {
    id: 'Solidity',
    parent: '',
    more: {
      title: 'Solidity',
      version: '1.0.0',
      icon: faker.image.avatar(),
      chat: 'https://gitter.im/ethereum/play',
      lessons: [
        {
          lesson: 'https://www.youtube.com/watch?v=v_hU0jPtLto',
          tool: 'https://solidity.readthedocs.io/en/v0.4.24/',
        },
      ],
      needs: [],
      unlocks: [
        'https://raw.githubusercontent.com/ninabreznik/CryptoLife/master/json_s/1.json',
      ],
    },
  },
  {
    id: 'Variables',
    parent: 'Solidity',
    more: {
      title: 'Variables',
      version: '1.0.0',
      icon: faker.image.avatar(),
      chat: 'https://gitter.im/ethereum/play',
      lessons: [
        {
          lesson: 'https://www.youtube.com/watch?v=n9yzr5ved_k',
          tool:
            'https://solidity.readthedocs.io/en/v0.4.24/structure-of-a-contract.html#state-variables',
        },
      ],
      needs: [],
      unlocks: [
        'https://raw.githubusercontent.com/ninabreznik/CryptoLife/master/json_s/2.json',
      ],
    },
  },
  {
    id: 'Events',
    parent: 'Solidity',
    more: {
      title: 'Events',
      version: '1.0.0',
      icon: faker.image.avatar(),
      chat: 'https://gitter.im/ethereum/play',
      lessons: [
        {
          lesson: 'https://www.youtube.com/watch?v=jXjYu8wNuTA',
          tool:
            'https://solidity.readthedocs.io/en/v0.4.24/structure-of-a-contract.html#events',
          info: './solidity-types.md',
        },
      ],
      needs: [
        'https://raw.githubusercontent.com/ninabreznik/CryptoLife/master/json_s/1.json',
      ],
      unlocks: [
        'https://raw.githubusercontent.com/ninabreznik/CryptoLife/master/json_s/3.json',
        'https://raw.githubusercontent.com/ninabreznik/CryptoLife/master/json_s/5.json',
      ],
    },
  },
  {
    id: 'Mappings',
    parent: 'Events',
    more: {
      title: 'Mappings',
      version: '1.0.0',
      icon: faker.image.avatar(),
      chat: 'https://gitter.im/ethereum/play',
      lessons: [
        {
          lesson: 'https://www.youtube.com/watch?v=gfXewa4xmYE',
          tool:
            'https://solidity.readthedocs.io/en/v0.4.24/types.html#mappings',
        },
      ],
      needs: [
        'https://raw.githubusercontent.com/ninabreznik/CryptoLife/master/json_s/1.json',
        'https://raw.githubusercontent.com/ninabreznik/CryptoLife/master/json_s/2.json',
      ],
      unlocks: [
        'https://raw.githubusercontent.com/ninabreznik/CryptoLife/master/json_s/5.json',
      ],
    },
  },
  {
    id: 'Types',
    parent: 'Events',
    more: {
      title: 'Types',
      version: '1.0.0',
      icon: faker.image.avatar(),
      chat: 'https://gitter.im/ethereum/play',
      lessons: [
        {
          lesson: 'https://www.youtube.com/watch?v=QdG9xsOolJ4',
          tool: 'https://solidity.readthedocs.io/en/v0.4.24/types.html',
          info: './solidity-types.md',
        },
      ],
      needs: [
        'https://raw.githubusercontent.com/ninabreznik/CryptoLife/master/json_s/2.json',
      ],
      unlocks: [''],
    },
  },
  {
    id: 'Modifiers',
    parent: 'Events',
    more: {
      title: 'Modifiers',
      version: '1.0.0',
      icon: faker.image.avatar(),
      chat: 'https://gitter.im/ethereum/play',
      lessons: [
        {
          lesson: 'https://www.youtube.com/watch?v=U-5FHKq7weo',
          tool:
            'https://solidity.readthedocs.io/en/v0.4.24/structure-of-a-contract.html#function-modifiers',
          info: './solidity-functions-modifiers.md',
        },
      ],
      needs: [
        'https://raw.githubusercontent.com/ninabreznik/CryptoLife/master/json_s/1.json',
        'https://raw.githubusercontent.com/ninabreznik/CryptoLife/master/json_s/2.json',
        'https://raw.githubusercontent.com/ninabreznik/CryptoLife/master/json_s/3.json',
      ],
      unlocks: [
        'https://raw.githubusercontent.com/ninabreznik/CryptoLife/master/json_s/5.json',
      ],
    },
  },
  {
    id: 'Imports',
    parent: 'Events',
    more: {
      title: 'Imports',
      version: '1.0.0',
      icon: faker.image.avatar(),
      chat: 'https://gitter.im/ethereum/play',
      lessons: [
        {
          lesson: 'https://www.youtube.com/watch?v=0Lyf_3kA3Ms',
          tool: 'http://remix.ethereum.org',
          info: './solidity-types.md',
        },
      ],
      needs: [
        'https://raw.githubusercontent.com/ninabreznik/CryptoLife/master/json_s/1.json',
        'https://raw.githubusercontent.com/ninabreznik/CryptoLife/master/json_s/2.json',
        'https://raw.githubusercontent.com/ninabreznik/CryptoLife/master/json_s/3.json',
        'https://raw.githubusercontent.com/ninabreznik/CryptoLife/master/json_s/4.json',
        'https://raw.githubusercontent.com/ninabreznik/CryptoLife/master/json_s/5.json',
      ],
      unlocks: [''],
    },
  },
  {
    id: 'Source File',
    parent: 'Imports',
    more: {
      title: 'Solidity Source File',
      version: '1.0.0',
      icon: faker.image.avatar(),
      chat: 'https://gitter.im/ethereum/play',
      lessons: [
        {
          lesson: 'https://www.youtube.com/watch?v=QdG9xsOolJ4',
          tool: 'https://solidity.readthedocs.io/en/v0.4.24/types.html',
          info: './solidity-types.md',
        },
      ],
      needs: [
        'https://raw.githubusercontent.com/ninabreznik/CryptoLife/master/json_s/6.json',
      ],
      unlocks: [''],
    },
  },
  {
    id: 'Remix',
    parent: 'Source File',
    more: {
      title: 'Remix',
      version: '1.0.0',
      icon: faker.image.avatar(),
      chat: 'https://gitter.im/ethereum/play',
      lessons: [
        {
          lesson: 'https://www.youtube.com/watch?v=QdG9xsOolJ4',
          tool: 'http://remix.ethereum.org',
          info: './solidity-types.md',
        },
      ],
      needs: [
        'https://raw.githubusercontent.com/ninabreznik/CryptoLife/master/json_s/7.json',
      ],
      unlocks: [''],
    },
  },
  {
    id: 'Deploying',
    parent: 'Variables',
    more: {
      title: 'Deploying to the network',
      version: '1.0.0',
      icon: faker.image.avatar(),
      chat: 'https://gitter.im/ethereum/play',
      lessons: [
        {
          lesson: 'https://www.youtube.com/watch?v=QdG9xsOolJ4',
          tool: 'https://solidity.readthedocs.io/en/v0.4.24/types.html',
          info: './solidity-types.md',
        },
      ],
      needs: [
        'https://raw.githubusercontent.com/ninabreznik/CryptoLife/master/json_s/8.json',
        'https://raw.githubusercontent.com/ninabreznik/CryptoLife/master/json_s/1.json',
        'https://raw.githubusercontent.com/ninabreznik/CryptoLife/master/json_s/10.json',
      ],
      unlocks: [''],
    },
  },
  {
    id: 'Networks',
    parent: 'Imports',
    more: {
      title: 'Test networks',
      version: '1.0.0',
      icon: faker.image.avatar(),
      chat: 'https://gitter.im/ethereum/play',
      lessons: [
        {
          lesson: 'https://www.youtube.com/watch?v=QdG9xsOolJ4',
          tool: 'https://solidity.readthedocs.io/en/v0.4.24/types.html',
          info: './solidity-types.md',
        },
      ],
      needs: [
        'https://raw.githubusercontent.com/ninabreznik/CryptoLife/master/json_s/7.json',
      ],
      unlocks: [''],
    },
  },
]

window.onload = function() {
  app(data)
}
