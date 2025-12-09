/** @type {import('@playwright/test').PlaywrightTestConfig} */
module.exports = {
  timeout: 60000,
  use: {
    headless: false,       // visible browser
    browserName: 'firefox', // run tests in Firefox
    screenshot: "on",
    video: "on",
    trace: "on"
  }
};
