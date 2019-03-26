# skilltree.js

### Add TODO

[ ] icon image node & if icon empty use default
[ ] click event open window
[ ] hover event show title
[ ] workshop json load data
[ ] workshop have different url

![](assets/demo.gif)

### run demo

```
npm install
npm start
```

### customized css

* you can add some css to make your own style.

### standard data structure

* parent
  * if it is a root node, parent is empty string.
  * otherwise parent should match with other node id.
* id
  * the word should be short.

```
const data = [
  {
    id: 'Solidity',
    parent: '',
    more: {
      title: '',
      version: '',
      icon: '',
      chat: '',
      lessons: [
        {
          lesson: '',
          tool: '',
        },
      ],
      needs: [],
      unlocks: [
        '',
      ],
    },
  },
  {
    id: 'Variables',
    parent: 'Solidity',
    more: {
      title: 'Variables',
      version: '',
      icon: '',
      chat: '',
      lessons: [
        {
          lesson: '',
          tool:
            '',
        },
      ],
      needs: [],
      unlocks: [
        '',
      ],
    },
  },
  {
    id: 'Events',
    parent: 'Solidity',
    more: {
      title: 'Events',
      version: '',
      icon: '',
      chat: '',
      lessons: [
        {
          lesson: '',
          tool:
            '',
          info: '',
        },
      ],
      needs: [
        '',
      ],
      unlocks: [
        '',
        '',
      ],
    }
  }
];
```


### html sample

```html
<!DOCTYPE html>
<html>

  <head>
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8">
    <title>Skill Tree Demo</title>
    <style type="text/css">
      .bigger {
        font-size: 20px;
      }
    </style>
  </head>

  <body>
    <script src="dist/bundle.js"></script>
    <div></div>
  </body>
</html>
```

### javascript example
```
const app = require('skilltree.js')
const data = [
  {
    id: 'Solidity',
    parent: '',
    more: {
      title: '',
      version: '',
      icon: '',
      chat: '',
      lessons: [
        {
          lesson: '',
          tool: '',
        },
      ],
      needs: [],
      unlocks: [
        '',
      ],
    },
  },
  {
    id: 'Variables',
    parent: 'Solidity',
    more: {
      title: 'Variables',
      version: '',
      icon: '',
      chat: '',
      lessons: [
        {
          lesson: '',
          tool:
            '',
        },
      ],
      needs: [],
      unlocks: [
        '',
      ],
    },
  },
  {
    id: 'Events',
    parent: 'Solidity',
    more: {
      title: 'Events',
      version: '',
      icon: '',
      chat: '',
      lessons: [
        {
          lesson: '',
          tool:
            '',
          info: '',
        },
      ],
      needs: [
        '',
      ],
      unlocks: [
        '',
        '',
      ],
    }
  }
];

window.onload = function() {
  app(data)
}
```

## License
MIT © [alincode](https://github.com/alincode/solcjs-lightweight)