const version = require('../../package.json').version

export default [
  {
    text: 'Guide',
    children: [
      '/Installation',
      '/Intro',
      '/Usage',
      '/Properties',
      '/Events',
      '/Slots',
      '/Other'
    ]
  },
  { text: 'Demo', link: 'https://febe95.github.io/vue-js-modal/demo/' },
  {
    text: `v${version}`,
    children: [
      {
        text: 'v2.x',
        link: 'https://euvl.github.io/vue-js-modal/'
      }
    ]
  },
  { text: 'Github', link: 'https://github.com/febe95/vue-js-modal' }
]
