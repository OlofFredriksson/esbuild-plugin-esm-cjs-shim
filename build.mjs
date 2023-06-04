import esbuild from "esbuild";
import fs from "fs-extra";

fs.emptyDirSync("./dist");
fs.copySync("src", "build");

fs.renameSync("build/plugin.ts", "build/plugin.cjs.ts");

const shim = fs.readFileSync("./build/shims/esm.mjs");
let file = fs.readFileSync("./build/plugin.cjs.ts");

file = `
${shim}
${file}
`;

fs.writeFileSync("build/plugin.esm.ts", file);

const formats = ["cjs", "esm"];

for (const format of formats) {
    esbuild.buildSync({
        entryPoints: [`build/plugin.${format}.ts`],
        format: format,
        outfile: `dist/${format}/plugin.js`,
    });
}

fs.writeJSONSync("./dist/esm/package.json", { type: "module" });
fs.ensureDirSync("./dist/shims");
fs.copyFileSync("./src/shims/cjs.js", "./dist/shims/cjs.js");
fs.copyFileSync("./src/shims/esm.mjs", "./dist/shims/esm.mjs");

fs.removeSync("./build");
