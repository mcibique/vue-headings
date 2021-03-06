module.exports = {
  moduleFileExtensions: [
    "js",
    "jsx",
    "json",
    "vue",
  ],
  transform: {
    "^.+\\.vue$": "vue-jest",
    ".+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$": "jest-transform-stub",
    "^.+\\.jsx?$": "babel-jest",
  },
  transformIgnorePatterns: [
    "/node_modules/",
  ],
  snapshotSerializers: [
    "jest-serializer-vue",
  ],
  testMatch: [
    "<rootDir>/src/**/*.spec.(js|jsx|ts|tsx)",
  ],
  testURL: "http://localhost/",
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname",
  ],
  setupFilesAfterEnv: [
    "<rootDir>/tests/setup.js",
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{js,vue}",
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  clearMocks: true,
};
