---
"tiny-merge-patch": major
---

Drop CommonJS package exports and publish ESM-only output from `dist/index.mjs`.

This is a breaking change for consumers using `require("tiny-merge-patch")`. Migrate to ESM imports:

```js
import mergePatch from "tiny-merge-patch";
```
