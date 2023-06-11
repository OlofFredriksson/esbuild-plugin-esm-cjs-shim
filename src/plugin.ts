import { type PluginBuild, type Plugin } from "esbuild";

export const shimPlugin = (): Plugin => ({
    name: "shimPlugin",
    setup(build: PluginBuild) {
        const options = build.initialOptions;

        if (!options.format) {
            throw new Error(
                `options.format needs to be defined in order to use plugin`
            );
        }
        if (options.format === "esm") {
            options.inject = [`${__dirname}/../shims/esm.mjs`];
            options.define = {
                ...options.define,
                ...{
                    require: "shimRequire",
                },
            };
        }

        if (options.format === "cjs") {
            options.inject = [`${__dirname}/../shims/cjs.js`];
            options.define = {
                ...options.define,
                ...{
                    "import.meta.url": "importMetaUrl",
                },
            };
        }
    },
});
