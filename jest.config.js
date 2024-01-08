module.exports = {
    transform: {
        "^.+\\.(t|j)sx?$": "@swc/jest",
    },
    extensionsToTreatAsEsm: ['.ts', '.tsx'],
    "testMatch": [
        "/**/*.test.{ts,tsx,js,jsx}",
        "/*.test.{ts,tsx,js,jsx}"
    ],
};