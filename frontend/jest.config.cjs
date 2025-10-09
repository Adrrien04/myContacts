/** @type {import('jest').Config} */
module.exports = {
    testEnvironment: "jsdom",
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
    moduleNameMapper: {
        "\\.(css|less|scss|sass)$": "<rootDir>/styleMock.js",
        "react-phone-input-2/lib/bootstrap.css$": "<rootDir>/styleMock.js"
    },
    globals: {
        "ts-jest": {
            tsconfig: "tsconfig.test.json",
        },
    },
};
