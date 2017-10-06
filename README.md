Tiny Merge Patch
===============

[![Build Status](https://travis-ci.org/QuentinRoy/tiny-merge-patch.svg?branch=master)](https://travis-ci.org/QuentinRoy/tiny-merge-patch)
[![codecov](https://codecov.io/gh/QuentinRoy/tiny-merge-patch/branch/master/graph/badge.svg)](https://codecov.io/gh/QuentinRoy/tiny-merge-patch)
[![dependencies Status](https://david-dm.org/quentinroy/tiny-merge-patch/status.svg)](https://david-dm.org/quentinroy/tiny-merge-patch)
[![devDependencies Status](https://david-dm.org/quentinroy/tiny-merge-patch/dev-status.svg)](https://david-dm.org/quentinroy/tiny-merge-patch?type=dev)

An implementation of the JSON Merge Patch
[RFC 7396](http://tools.ietf.org/html/rfc7396): a standard format used to
describe modifications to JSON documents. Passes all [RFC 7396](http://tools.ietf.org/html/rfc7396) tests.

This library complies with the functional programming style: it does not mutate
the original target, but recycle what it can.

## Install

Install the current version (and save it as a dependency):

### npm

```sh
npm install tiny-merge-patch --save
```

## Import

### CommonJs with node

```js
// Fetch `apply` from the module.
const mergePatch = require('tiny-merge-patch').apply;
```

### ES modules in the browser

```js
// `apply` is also the default export.
import mergePatch from 'https://unpkg.com/tiny-merge-patch/esm/index.js'
```

## Usage

```js
const doc = {
  a: 'b',
  c: {
    d: 'e',
    f: 'g'
  },
  h: {
    i: 0
  }
};

const patch = {
  a: 'z',
  c: {
    f: null
  }
};

const patchedDoc = mergePatch(doc, patch);

// Apply JSON merge patches.
console.assert(
  patchedDoc,
  {
    a: 'z',
    c: {
      d: 'e'
    },
    h: {
      i: 0
    }
  }
);

// Does not mutate the original document...
console.assert(
  patchedDoc !== doc
);

// ...nor its content...
console.assert(
  patchedDoc.c !== doc.c
);

// ...But recycle what it can.
console.assert(
  patchedDoc.h === doc.h
);
```

## Alternatives

- [`json-merge-patch`](https://github.com/pierreinglebert/json-merge-patch) (from which this library is forked)

- [`merge-patch`](https://github.com/krisnye/merge-patch)

- [`json8-merge-patch`](https://github.com/JSON8/merge-patch)

All are in-place.
To avoid mutations of the original object, one can deep-clone beforehand, but it can be expensive.
At the contrary, `tiny-merge-patch` does not alter any of its arguments—but
recycles what it can.
Recycling also allows efficient memoization based on strict identity
(used by [React](https://reactjs.org)'s [PureComponent](https://reactjs.org/docs/react-api.html#reactpurecomponent) for example).

All of them also embed additional functionalities, such as patch generation from two objects or merge of patches.
This library only focuses on the IETF standard and on patch applications.

(None of the above libraries are particularly big.
Still, this is smaller if you only need to apply patches.
It is also worth mentioning that unlike [JSON patches](https://tools.ietf.org/html/rfc6902), there is no way
to implement merge of merge patches that reliably preserves deletion.)

- [`immutable-merge-patch`](https://www.npmjs.com/package/immutable-merge-patch)

JSON merge patch implementation for [Immutable.js](https://facebook.github.io/immutable-js/).

# License

[MIT](./LICENSE)
