module.exports = {
  browser: false,
  testEnvironment: 'jest-environment-node',
  testMatch: [
    // https://github.com/isaacs/node-glob
    '<rootDir>**/*.test.(js|ts)'
  ],
  moduleFileExtensions: ['js', 'ts'],
  transform: {
    '\\.(js|ts)$': ['ts-jest', 'babel-jest']
  },
  verbose: true,
  collectCoverageFrom: ['**/*.(js|ts)'],
  coverageReporters: ['text']
};
