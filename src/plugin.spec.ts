import { build, type BuildOptions } from "esbuild";
import { shimPlugin } from "./plugin";

const defaultConfig: BuildOptions = {
    entryPoints: ["./test/fixtures/cjs.js"],
    bundle: true,
    write: false,
    plugins: [shimPlugin()],
    platform: "node",
    logLevel: "silent",
};

describe("shim", () => {
    let config: BuildOptions;
    beforeEach(() => {
        config = defaultConfig;
    });

    it("should throw error if format is missing", async () => {
        config = {
            ...config,
            entryPoints: ["./test/fixtures/cjs.js"],
        };

        await expect(build(config)).rejects.toThrow(Error);
    });

    describe("CJS -> ESM", () => {
        it("should not add any shims when not needed", async () => {
            config = {
                ...config,
                entryPoints: ["./test/fixtures/vanilla.js"],
                format: "esm",
            };
            const result = await build(config);
            expect(result.outputFiles?.[0].text).toMatchInlineSnapshot(`
                "// test/fixtures/vanilla.js
                function foo() {
                  return "bar";
                }
                foo();
                "
            `);
        });

        it("should be able to shim __dirname & __filename", async () => {
            config = {
                ...config,
                entryPoints: ["./test/fixtures/dirname-filename.js"],
                format: "esm",
            };
            const result = await build(config);
            expect(result.outputFiles?.[0].text).toMatchSnapshot();
        });

        it("should be able to shim require", async () => {
            config = {
                ...config,
                entryPoints: ["./test/fixtures/require.resolve.js"],
                format: "esm",
            };
            console.log(config);
            const result = await build(config);
            expect(result.outputFiles?.[0].text).toMatchSnapshot();
        });
    });

    describe("ESM -> CJS", () => {
        it("should not add any shims when not needed", async () => {
            config = {
                ...config,
                entryPoints: ["./test/fixtures/vanilla.js"],
                format: "cjs",
            };
            const result = await build(config);
            expect(result.outputFiles?.[0].text).toMatchInlineSnapshot(`
                ""use strict";

                // test/fixtures/vanilla.js
                function foo() {
                  return "bar";
                }
                foo();
                "
            `);
        });
        it("should be able to shim import.meta.url", async () => {
            config = {
                ...config,
                entryPoints: ["./test/fixtures/esm.mjs"],
                format: "cjs",
            };
            const result = await build(config);
            expect(result.outputFiles?.[0].text).toMatchSnapshot();
        });
    });
});
