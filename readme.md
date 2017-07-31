# onloaded

> A tiny (350B) library to detect when images have loaded

[Demo](https://jsfiddle.net/lukeed/8njejbjz/)

This module exposes three module definitions:

* **ES Module**: `dist/onloaded.es.js`
* **CommonJS**: `dist/onloaded.js`
* **UMD**: `dist/onloaded.min.js`

If using the UMD bundle, the library is exposed as `onloaded` globally.


## Install

```
$ npm install --save onloaded
```


## Usage

```js
const onloaded = require('onloaded');

// passing a selector to `elem`
onloaded('#container > img', {
  onLoad(img) {
    img.className += ' loaded';
  },
  onError(img) {
    img.className += ' failed';
  },
  onProgress(val) {
    console.log(`I am ${ val * 100 }% complete!`);
  },
  onComplete(val, stats) {
    // val is always 1 ~~> 100%
    console.log('This callback always runs!');
    console.log(`  ${stats.loaded} loaded`);
    console.log(`  ${stats.failed} failed`);
    console.log(`  ${stats.total} total`);
  }
});
```

> **Note:** Visit [`elem`](#elem) for other possibilities!


## API

### onloaded(elem, options)

#### elem

Type: `String|Node|NodeList`

You have several options here:

1. Pass a selector string to `img` element(s);
    ```js
    onloaded('.container img', { ... });
    ```

2. Pass a reference to a specific `<img />` DOM Node;
    ```js
    var img = document.querySelector('.container img');
    onloaded(img, { ... });
    ```

3. Pass a reference to a multiple `<img />` DOM Nodes;
    ```js
    var imgs = document.querySelectorAll('.container img');
    onloaded(imgs, { ... });
    ```

4. Pass a reference to a container DOM Node that contains `<img />` elements;
    ```js
    var parent = document.querySelector('.container');
    onloaded(parent, { ... });
    ```

#### options.onError(node)

Type: `Function`

Callback whenever an image source failed to load. Receives the `<img />` DOM node;

#### options.onLoad(node)

Type: `Function`

Callback whenever an image source sucessfully loads. Receives the `<img />` DOM node;

#### options.onProgress(val, stats)

Type: `Function`

Callback whenever an image's network request has completed, regardless of success or failure.

Receives the current "progress" of completed requests as a decimal.

Also receives a `stats` object with `loaded`, `failed`, and `total` keys.

#### options.onComplete(val, stats)

Type: `Function`

Callback when _all_ network requests have completed, regardless of success or failure.

Receives the "progress" as its first parameter. This will always equal `1`.

Also receives a `stats` object with `loaded`, `failed`, and `total` keys.


## License

MIT © [Luke Edwards](https://lukeed.com)
