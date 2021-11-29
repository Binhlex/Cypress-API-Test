## Pre-requisites
You should download and install these properly on your system. Visit the websites (linked) to find instructions on how to set them up.

* [Node.js](https://nodejs.org/en/) - An open-source, cross-platform, JavaScript runtime environment that executes JavaScript code outside of a web browser. Install Node.js from <https://nodejs.org/en/>.
* [npm](https://www.npmjs.com/) - A package manager for the JavaScript programming language. It is the default package manager for the JavaScript runtime environment Node.js. It is distributed with Node.js, which means that when you download Node.js, you automatically get npm installed on your computer.

## Libraries

- [cypress](https://www.cypress.io/) - A JavaScript-based end-to-end testing framework.
$ npm install cypress --save-dev

- [Mochawesome report] 
$ npm install mochawesome

- [cypress-cucumber-preprocessor](https://github.com/TheBrainFamily/cypress-cucumber-example) - Library used to support Behavior-Driven Development (BDD) using Cucumber.
$ npm install --save-dev cypress-cucumber-preprocessor
=> declare cucumber in plugins/index.js
const cucumber = require('cypress-cucumber-preprocessor').default
module.exports = (on, config) => {
on('file:preprocessor', cucumber())
}

[cucumber-html-reporter] (https://www.npmjs.com/package/cucumber-html-reporter):
$ npm install cucumber-html-reporter --save-dev

[install cypress-mochawesome-reporter] (https://www.npmjs.com/package/cypress-mochawesome-reporter)
$ npm i --save-dev cypress-mochawesome-reporter

## Run Tests
Open Cypress and run bookstore.feature:
$ npx cypress open

# run test script from package.json
$ npm run test_on_chrome
$ npm run test_on_electron

# Run a specific spec and generate mochawesome report
$ npx cypress run --reporter mochawesome --spec ".\cypress\integration\ui\student-form\register-student.spec.js"
# Run Feature file (Cucumber)

## Generate HTML report from cucumer json report
After perform test, run script in terminal to generate report:
$ node cypress\generate_report.js

# cypress-skip-and-only-ui
https://github.com/bahmutov/cypress-skip-and-only-ui

# install prettier
https://prettier.io/docs/en/install.html
- npm install --save-dev --save-exact prettier
- create .prettierrc.json in root folder
- create .prettierignore in root folder
- set default formatter in settings.json of VS Code(File/Preferrences/Setting)
- checks that files are already formatted : npx prettier --check .
- run formater from CI: npx prettier --write .
