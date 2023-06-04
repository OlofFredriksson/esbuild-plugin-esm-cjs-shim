module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    collectCoverage: true,
    testPathIgnorePatterns: ["/node_modules/", "integration"],
    collectCoverageFrom: ["./src/**/*.js", "!**/node_modules/**"],
};
