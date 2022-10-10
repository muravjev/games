const nextJest = require('next/jest');

const createJestConfig = nextJest({
    dir: './'
});

/** @type {import('jest').Config} */
const customJestConfig = {
    moduleDirectories: ['node_modules', 'src'],
    testEnvironment: 'jest-environment-jsdom',
    verbose: false,
    collectCoverage: false,
    coverageDirectory: '.coverage',
    collectCoverageFrom: ['src/**/*.{ts}', '!node_modules/**']
};

module.exports = createJestConfig(customJestConfig);
