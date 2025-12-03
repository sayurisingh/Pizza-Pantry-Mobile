/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',         // <-- tells Jest to handle TS files
  testEnvironment: 'jsdom',  // for React Native / browser environment
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',  // <-- TS/TSX transformer
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
