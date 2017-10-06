Nano JSON Merge Patch
=====================

[![Build Status](https://travis-ci.org/QuentinRoy/nano-json-merge-patch.svg?branch=master)](https://travis-ci.org/QuentinRoy/nano-json-merge-patch)

An implementation of the JSON Merge Patch [RFC 7396](http://tools.ietf.org/html/rfc7396)

JSON Merge Patch [(RFC 7396)](http://tools.ietf.org/html/rfc7396) is a standard format that
allows you to update a JSON document by sending the changes rather than the whole document.
JSON Merge Patch plays well with the HTTP PATCH verb (method) and REST style programming.


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
  }
};

const patch = {
  a: 'z',
  c: {
    f: null
  }
};

console.assert(
  jsonMergePatch(doc, patch),
  {
    a: 'z',
    c: {
      d: 'e'
    }
  }
);


# License

  MIT
