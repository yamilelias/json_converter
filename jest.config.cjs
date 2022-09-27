module.exports = {
  testMatch: ["**/?(*.)+(spec.js)"],
  collectCoverageFrom: [`src/**/*.js`, `!src/**/*.spec.js`],
  clearMocks: true,
};
