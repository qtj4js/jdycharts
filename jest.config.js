module.exports = {
    verbose: true,
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['jest-canvas-mock', './jest.setup.js'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    testPathIgnorePatterns: ['/node_modules/', '/lib/', '/es/'],
    testRegex: "./tests/.*\\.(ts|tsx|js)$",
    collectCoverage: false,
    transform: {
        '^.+\\.(tsx|ts)?$': 'ts-jest',
        '\\.(less|css)$': 'jest-less-loader',
    },
    collectCoverageFrom: ['packages/**/*.ts', 'packages/**/*.tsx', '!**/node_modules/**'],
    moduleNameMapper: {
        '^lodash-es$': 'lodash',
        '^.+\\.(css|less)$': 'identity-obj-proxy',
        "^d3-(.*)$": "d3-$1/dist/d3-$1"
    }
};
