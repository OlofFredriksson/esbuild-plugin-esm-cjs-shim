# esbuild-plugin-esm-cjs-shim

Shims ESM and CJS features, handy if you are building hybrid NPM modules.

[![Build](https://github.com/OlofFredriksson/esbuild-plugin-esm-cjs-shim/workflows/Build/badge.svg)](https://github.com/OlofFredriksson/sitevision-mock/actions) [![npm](https://img.shields.io/npm/v/esbuild-plugin-esm-cjs-shim)](https://www.npmjs.com/package/esbuild-plugin-esm-cjs-shim)

## Features

Shims when building ESM:

-   \_\_filename
-   \_\_dirname
-   require (require.resolve)

Shims when building CJS:

-   import.meta.url

### Getting Started

`npm install esbuild-plugin-esm-cjs-shim`

Load plugin

```javascript
const { shimPlugin } = require("esbuild-plugin-esm-cjs-shim)";
```

or if ESM:

```javascript
import { shimPlugin } = from "esbuild-plugin-esm-cjs-shim";
```

Add following to your esbuild-conf:

```diff
{
    entryPoints: ["./commonjs.entry.js"],
    bundle: true,
    write: false,
+    plugins: [shimPlugin()],
+    format: "esm", // or "cjs" depending on what you need to build
+    platform: "node",
};

```

### Known issues

-   All shims are included at this point.

### Credits

Idea from tsup, the primary reason for this lib is to create a separate esbuild-plugin.

-   https://github.com/egoist/tsup/

### Noteworthy libs

-   https://www.npmjs.com/package/babel-plugin-transform-import-meta
