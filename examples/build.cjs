const esbuild = require("esbuild");
const { shimPlugin } = require("../dist/cjs/plugin.js");

const defaultConfig = {
    entryPoints: ["./test/fixtures/cjs.js"],
    bundle: true,
    write: false,
    format: "esm",
    plugins: [shimPlugin],
    platform: "node",
    logLevel: "silent",
};

async function init() {
    const build = await esbuild.build(defaultConfig);
    console.log(build.outputFiles[0].text);
}

init();
