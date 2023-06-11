import esbuild from "esbuild";
import { shimPlugin } from "../dist/esm/plugin.js";

const defaultConfig = {
    entryPoints: ["./test/fixtures/vanill.js"],
    bundle: true,
    write: false,
    format: "esm",
    plugins: [shimPlugin()],
    platform: "node",
    logLevel: "silent",
};

async function init() {
    const build = await esbuild.build(defaultConfig);
    console.log(build.outputFiles[0].text);
}

init();
