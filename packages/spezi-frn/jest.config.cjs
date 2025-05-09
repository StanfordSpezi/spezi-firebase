/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.(ts|tsx)$': ['babel-jest', { rootMode: 'upward' }],
  },
  moduleNameMapper: {
    '^@stanfordbdhg/spezi-firebase-utils$': '<rootDir>/../spezi-firebase-utils/src',
    '^(\\.{1,2}/.*)\\.js$': '$1'
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(@stanfordbdhg)/)'
  ],
  collectCoverage: false,
  testMatch: ['**/test/**/*.test.ts'],
  setupFilesAfterEnv: ['<rootDir>/test/jest.setup.js']
};