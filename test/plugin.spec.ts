import esbuild from "esbuild";
import { shimPlugin } from "../dist/cjs/plugin.js";
const defaultConfig = {
    entryPoints: ["./test/fixtures/cjs.js"],
    bundle: true,
    write: false,
    plugins: [shimPlugin],
    platform: "node",
    logLevel: "silent",
};

describe("shim", () => {
    let config;
    beforeEach(() => {
        config = defaultConfig;
    });

    it("should throw error if format is missing", async () => {
        config = {
            ...config,
            entryPoints: ["./test/fixtures/cjs.js"],
        };

        await expect(esbuild.build(config)).rejects.toThrow(Error);
    });

    it("should be able to transform commonJs to ESM", async () => {
        config = {
            ...config,
            entryPoints: ["./test/fixtures/cjs.js"],
            format: "esm",
        };
        const result = await esbuild.build(config);
        expect(result.outputFiles[0].text).toMatchSnapshot();
    });

    it("should be able to transform esm to commonJs", async () => {
        config = {
            ...config,
            entryPoints: ["./test/fixtures/esm.mjs"],
            format: "cjs",
        };
        const result = await esbuild.build(config);
        expect(result.outputFiles[0].text).toMatchSnapshot();
    });
});
