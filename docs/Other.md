# Other 

## Sponsorship

Please consider sponsoring this project through [Github Sponsorship](https://github.com/sponsors/febe95) :pray:

## Development

```bash
# Clone repo
git clone https://github.com/febe95/vue-js-modal.git

# Run tests
npm run test

# Run linter
npm run lint:js

# Build main library for client & SSR
cd vue-js-modal
npm install
npm run build

# Build and run demo
cd demo
npm install
npm run dev
```

## IE support

This plugin uses arrow functions, resize observer and other modern features.

To be able to use this plugin in IE you need to make sure you transpile the code properly. Please read this [stackoverflow](https://stackoverflow.com/questions/56446904/transpiling-es6-for-ie11-with-babel).
