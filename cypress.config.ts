import { defineConfig } from "cypress";

export default defineConfig({
  chromeWebSecurity: false,
  experimentalModifyObstructiveThirdPartyCode: true,
  experimentalMemoryManagement: true,
  e2e: {
    baseUrl: "https://qualityminds.com/",
    experimentalRunAllSpecs: true,
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 7000,
    requestTimeout: 7000,
    // projectId: "",
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
    },
    reporter: "cypress-mochawesome-reporter",
    reporterOptions: {
      charts: true,
      reportPageTitle: "Quality Minds report",
      embeddedScreenshots: true,
      inlineAssets: true,
      saveAllAttempts: false,
    },
    screenshotOnRunFailure: true,
    video: true,
  },
});
