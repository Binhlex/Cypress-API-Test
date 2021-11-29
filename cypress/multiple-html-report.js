// Prepare folder structure
const fs = require('fs-extra')
const dir = 'cypress/cucumber_report/multiple_html'

if (fs.existsSync(dir)) {
  fs.removeSync(dir)
}

const report = require('multiple-cucumber-html-reporter')

report.generate({
  jsonDir: 'cypress/cucumber_report',
  reportPath: 'cypress/cucumber_report/multiple_html',
  metadata: {
    browser: {
      name: 'chrome',
      version: '90',
    },
    device: 'Local test machine',
    platform: {
      name: 'Window',
      version: '10',
    },
  },
  customData: {
    title: 'Run info',
    data: [
      { label: 'Project', value: 'Custom project' },
      { label: 'Release', value: '1.2.3' },
      { label: 'Cycle', value: 'B11221.34321' },
      { label: 'Execution Start Time', value: 'Nov 19th 2017, 02:31 PM EST' },
      { label: 'Execution End Time', value: 'Nov 19th 2017, 02:56 PM EST' },
    ],
  },
})
