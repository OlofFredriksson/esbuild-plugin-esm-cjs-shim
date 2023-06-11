require("@html-validate/eslint-config/patch/modern-module-resolution");

module.exports = {
    root: true,
    extends: ["@html-validate"],

    rules: {
        "import/extensions": "off",
        "no-console": "off",
    },

    overrides: [
        {
            files: ["*.cjs", "*.mjs"],
        },
        {
            files: "**/*.ts",
            extends: ["@html-validate/typescript"],
        },
        {
            files: "*.spec.[jt]s",
            extends: ["@html-validate/jest"],
            rules: {
                "jest/prefer-expect-assertions": "off",
            },
        },
        {
            files: ["src/**/*.ts"],
            parserOptions: {
                tsconfigRootDir: __dirname,
                project: ["./tsconfig.json"],
            },
            extends: ["@html-validate/typescript-typeinfo"],
        },
    ],
};
