/* eslint-env node */
module.exports = {
    extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
    root: true,
    overrides: [
        {
            files: "*.spec.ts",
            env: {
                jest: true,
            },
            plugins: ["jest"],
            rules: {
                "jest/no-disabled-tests": "warn",
                "jest/no-focused-tests": "warn",
                "jest/no-identical-title": "error",
                "jest/no-test-prefixes": "warn",
                "jest/prefer-to-have-length": "error",
                "jest/prefer-to-be": "error",
                "jest/valid-describe-callback": "error",
                "jest/valid-expect": "error",
                "jest/valid-expect-in-promise": "error",
            },
        },
    ],
};
