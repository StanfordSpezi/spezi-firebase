/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
  moduleNameMapper: {
    '^@stanfordspezi/spezi-firebase-utils$':
      '<rootDir>/../spezi-firebase-utils/src',
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  extensionsToTreatAsEsm: ['.ts'],
  transformIgnorePatterns: ['/node_modules/(?!(@stanfordspezi)/)'],
  collectCoverage: false,
  testMatch: ['**/test/**/*.test.ts'],
  setupFilesAfterEnv: ['<rootDir>/test/jest.setup.js'],
}
