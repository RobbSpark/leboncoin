const {defineConfig} = require('cypress')
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const browserify = require("@badeball/cypress-cucumber-preprocessor/browserify");

async function setupNodeEvents(on, config) {
  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
  await preprocessor.addCucumberPreprocessorPlugin(on, config);
  on("file:preprocessor", browserify.default(config));
  return config;
}

module.exports = defineConfig({
  e2e: {
    setupNodeEvents,
    specPattern: "cypress/e2e/features/**/*.feature",
    watchForFileChanges: false,
    chromeWebSecurity: false,
    video: true,
    experimentalModifyObstructiveThirdPartyCode: true,
    defaultCommandTimeout: 10000,
    videosFolder: "cypress/videos",
    screenshotsFolder: "cypress/screenshots",
  }
});