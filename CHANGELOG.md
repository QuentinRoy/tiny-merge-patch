# Change Log

## 1.0.0

### Major Changes

- f039776: Drop CommonJS package exports and publish ESM-only output from `dist/index.mjs`.

  This is a breaking change for consumers using `require("tiny-merge-patch")`. Migrate to ESM imports:

  ```js
  import mergePatch from "tiny-merge-patch";
  ```

### Minor Changes

- d191da1: Add TypeScript typings so patch results are inferred accurately.

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="0.1.2"></a>

## [0.1.2](https://github.com/QuentinRoy/tiny-merge-patch/compare/v0.1.1...v0.1.2) (2017-10-09)

<a name="0.1.1"></a>

## [0.1.1](https://github.com/QuentinRoy/tiny-merge-patch/compare/v0.1.0...v0.1.1) (2017-10-06)

<a name="0.1.0"></a>

# 0.1.0 (2017-10-06)

### Features

- start tiny-merge-patch
