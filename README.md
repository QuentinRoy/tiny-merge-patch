Nano JSON Merge Patch
=====================

[![Build Status](https://travis-ci.org/QuentinRoy/nano-json-merge-patch.svg?branch=master)](https://travis-ci.org/QuentinRoy/nano-json-merge-patch)
[![Test Coverage](https://codecov.io/gh/QuentinRoy/nano-json-merge-patch/branch/master/graph/badge.svg)](https://codecov.io/gh/QuentinRoy/nano-json-merge-patch)
[![dependencies Status](https://david-dm.org/quentinroy/nano-json-merge-patch/status.svg)](https://david-dm.org/quentinroy/nano-json-merge-patch)
[![devDependencies Status](https://david-dm.org/quentinroy/nano-json-merge-patch/dev-status.svg)](https://david-dm.org/quentinroy/nano-json-merge-patch?type=dev)

An implementation of the JSON Merge Patch [RFC 7396](http://tools.ietf.org/html/rfc7396): a standard format used
to describe modifications to a JSON document.

This library complies with the functional programming style: it does not mutate the original target, but
recycle what it can.

It is originally forked from Pierre Inglebert's 
[json-merge-patch](https://github.com/pierreinglebert/json-merge-patch).

## Install

Install the current version (and save it as a dependency):

### npm

```sh
npm install nano-json-merge-patch --save
```

## Import

### CommonJs with node

```js
// Fetch `apply` from the module.
const jsonMergePatch = require('nano-json-merge-patch').apply;
```

### ES modules in the browser

```js
// `apply` is also the default export.
import jsonMergePatch from 'https://unpkg.com/nano-json-merge-patch/esm/index.js'
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

const patchedDoc = jsonMergePatch(doc, patch);

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

# License

  [MIT](./LICENSE)
