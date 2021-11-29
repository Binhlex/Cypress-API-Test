describe('Alert test', () => {
  before(() => {
    // cy.visit('https://www.seleniumeasy.com/test/javascript-alert-box-demo.html')
  })

  it('cypress studio', () => {
    cy.visit('https://demoqa.com/login')
    /* ==== Generated with Cypress Studio ==== */
    cy.get('#userName').clear();
    cy.get('#userName').type('binhlex');
    cy.get('#password').clear();
    cy.get('#password').type('Binhtest@123');
    cy.get('#login').click();
    cy.get(':nth-child(6) > .element-list > .menu-list > #item-2 > .text').click();
    cy.get('#see-book-Understanding\\ ECMAScript\\ 6 > a').click();
    cy.get('.text-right > #addNewRecordButton').click();
    cy.get(':nth-child(6) > .element-list > .menu-list > #item-3 > .text').click();
    cy.get(':nth-child(4) > .rt-tr > :nth-child(2)').click();
    /* ==== End Cypress Studio ==== */
  })

  it.skip('Alert Box', () => {
    cy.contains('button', 'Click me!').click()
    cy.on('window:alert', (alertText) => {
      cy.log('abcxyz')
      expect(alertText).equal('I am an alert box!')
    })

    // cy.on('command:enqueued', (obj) => {
    //     cy.log(obj)
    // })

    // localStorage.debug = 'cypress:*'

    // Cypress.on('fail', (error, runnable) => {
    //     debugger

    //     // we now have access to the err instance
    //     // and the mocha runnable this failed on

    //     throw error // throw error to have test still fail
    // })
  })

  it.skip('Alert Box 1', () => {
    cy.on('window:alert', (alertText) => {
      expect(alertText).equal('I am an alert box!')
    })
    cy.contains('button', 'Click me!').click()
  })
})
