// Prepare folder structure
const fs = require('fs-extra')
const dir = 'cypress/cucumber_report/html'

if (fs.existsSync(dir)) {
  fs.removeSync(dir)
}
fs.mkdirSync(dir)

// Report configuration
const reporter = require('cucumber-html-reporter')
const options = {
  theme: 'bootstrap',
  jsonDir: 'cypress/cucumber_report',
  output: 'cypress/cucumber_report/html/cucumber_report.html',
  screenshotsDirectory: 'cypress/cucumber_report/screenshots/',
  storeScreenshots: true,
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: true,
  metadata: {
    'App Version': '1.0.0',
    'Test Environment': 'Local',
    Browser: 'Chrome  91',
    Platform: 'Windows 10',
  },
}
// Generate report
reporter.generate(options)
