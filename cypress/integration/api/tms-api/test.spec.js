describe('', () => {
  it('Get token TMS', () => {
    cy.request({
      method: 'POST',
      url: 'http://192.168.237.10:3000/#!/login',
      body: {
        username: 'Admin2',
        password: 'qp$#tGu^',
      },
    })
      .its('body')
      .then((body) => {
        cy.log('token: ', body.id_token)
        expect(body.id_token).is.not.null
      })
  })
})
