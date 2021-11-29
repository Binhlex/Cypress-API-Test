// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import { AuthHelper } from '../utils/api-helpers/auth-helper'
require('cypress-skip-and-only-ui/support')

// Alternatively you can use CommonJS syntax:
require('./commands')

before(function () {
  AuthHelper.generateToken(Cypress.env('userName'), Cypress.env('password'))
})

// beforeEach(function () {
//   cy.log("mocha beforeEach");
// });

// after(function () {
//   cy.log("mocha after");
// });

// afterEach(function () {
//   cy.log("mocha afterEach");
// });
