/// <reference types = "cypress" />
let accessToken =
  '7f490d2c0a77815ec42b92eb335857995e46aa7af61db3ca63834603192ae800'
Cypress.config('baseUrl', 'https://gorest.co.in')
let userEndPoint = '/public-api/users'

let chars = 'abcdefghijklmnopqrstuvwxyz1234567890'
let string = ''
for (var i = 0; i < 10; i++) {
  string += chars[Math.floor(Math.random() * chars.length)]
}

let randomEmail = string + '@cypress.io'
let userName = 'cytestTest'
let userUpdateID = 55
let userID

let requestHeaders = {
  'Content-Type': 'application/json',
  Authorization: 'Bearer ' + accessToken,
}

let addUser = (body) =>
  cy.request({
    method: 'POST',
    url: userEndPoint,
    headers: requestHeaders,
    body: body,
  })

///////////////////////////////////////////////////////////////////////////

describe('API tests for user endpoint', () => {
  before(function () {
    cy.updateUserEmail(randomEmail)
    cy.fixture('users').then((user) => {
      this.user = user
    })
  })

  context('Create a new user tests', () => {
    it('Create a new user successfully', function () {
      cy.request({
        method: 'POST',
        url: '/public-api/users',
        headers: requestHeaders,
        body: this.user,
      }).then((res) => {
        expect(res.status).equal(200)
        expect(res.body.code).equal(201)
        expect(res.body.data.id).is.not.null
        expect(res.body.data.name).equal(this.user.name)
        expect(res.body.data.email).equal(this.user.email)
        expect(res.body.data.gender).equal(this.user.gender)
        expect(res.body.data.status).equal(this.user.status)
        userID = res.body.data.id
      })
    })

    it('Create a new user using an existing email', function () {
      cy.request({
        method: 'POST',
        url: userEndPoint,
        headers: requestHeaders,
        body: this.user,
      }).then((res) => {
        expect(res.status).equal(200)
        expect(res.body.code).equal(422)
        expect(res.body.data[0].field).equal('email')
        expect(res.body.data[0].message).equal('has already been taken')
      })
    })

    it('Authentication failed when inputting a wrong token', function () {
      cy.request({
        method: 'POST',
        url: userEndPoint,
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer wrongtokenabcd3424234234',
        },
        body: this.user,
      }).then((res) => {
        expect(res.status).equal(200)
        expect(res.body.code).equal(401)
        expect(res.body.data.message).equal('Authentication failed')
      })
    })

    it('Internal server error when inputting wrong body format', () => {
      cy.request({
        method: 'POST',
        url: userEndPoint,
        headers: requestHeaders,
        body: 'wrong format of body',
        failOnStatusCode: false,
      }).then((res) => {
        expect(res.status).equal(200)
        expect(res.body.code).equal(400)
        expect(res).to.have.property('headers')
        expect(res.headers['content-type']).equal(
          'application/json; charset=utf-8'
        )
        expect(res.body.data.message).equal(
          "783: unexpected token at 'wrong format of body'"
        )
        // expect(res.body).equal(
        //   "500 Internal Server Error\nIf you are the administrator of this website, then please read this web application's log file and/or the web server's log file to find out what went wrong."
        // )
      })
    })

    it('Data validation failed - using an emply email', () => {
      cy.request({
        method: 'POST',
        url: userEndPoint,
        headers: requestHeaders,
        body: {
          name: userName,
          email: '',
          gender: 'Male',
          status: 'Active',
        },
        failOnStatusCode: false,
      }).then((res) => {
        expect(res.status).equal(200)
        expect(res).to.have.property('headers')
        expect(res.headers['content-type']).equal(
          'application/json; charset=utf-8'
        )
        expect(res.body.code).equal(422)
        expect(res.body.data[0]).to.have.property('field').equal('email')
        expect(res.body.data[0].message).equal("can't be blank")
      })
    })
  })
})
