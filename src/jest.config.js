module.exports = {
  browser: true,
  testMatch: [
    // https://github.com/isaacs/node-glob
    '<rootDir>**/*.test.(js|jsx|ts|tsx)'
  ],
  moduleFileExtensions: ['jsx', 'js', 'ts', 'tsx'],
  transform: {
    '\\.(js|jsx|ts|tsx)$': ['ts-jest', 'babel-jest']
  },
  moduleNameMapper: {
    '^.+\\.(css|less|scss)$': 'babel-jest'
  },
  verbose: true,
  collectCoverageFrom: ['**/*.(js|ts|jsx|tsx)'],
  coverageReporters: ['text']
};
