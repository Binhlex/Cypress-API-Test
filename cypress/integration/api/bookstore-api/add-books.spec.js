/// <reference types="cypress"/>
import { getHeaders } from '../../../utils/api-helpers/headers-helper'
import { BookstoreHelper } from '../../../utils/api-helpers/bookstore-helper'
import { STATUS_CODE } from '../../../utils/api-helpers/api-constants'
import { ERROR_MESSAGE } from '../../../utils/api-helpers/api-constants'

describe('Add books tests', () => {
  const isbn = Cypress.env('isbn')
  const userId = Cypress.env('userId')
  let token
  let addBookHeaders
  let deleteHeaders
  let body = {
    userId: userId,
    collectionOfIsbns: [
      {
        isbn: isbn,
      },
    ],
  }

  before(() => {
    token = Cypress.env('token')
    deleteHeaders = getHeaders(false, token)
    addBookHeaders = getHeaders(true, token)
  })

  beforeEach(() => {
    BookstoreHelper.deleteAllBooks(userId, deleteHeaders)
  })

  it('Add a book to collection successfully', () => {
    BookstoreHelper.addBooksToCollection(addBookHeaders, body)
    cy.get('@response').then((response) => {
      expect(response.status).equal(STATUS_CODE.RESPONSE_CODE_CREATE_SUCCESSFUL)
      expect(response.body.books[0].isbn).equal(isbn)
    })
  })

  it('Add a book with a wrong isbn and verify the error', () => {
    var bodyWrongISBN = {
      userId: userId,
      collectionOfIsbns: [
        {
          isbn: '11111111111',
        },
      ],
    }
    BookstoreHelper.addBooksToCollection(addBookHeaders, bodyWrongISBN)
    cy.get('@response').then((response) => {
      expect(response.status).equal(STATUS_CODE.RESPONSE_CODE_BAD_REQUEST)
      expect(response.body.code).equal(
        ERROR_MESSAGE.ERROR_CODE_BOOKS_NOT_AVAILABLE_ON_COLLECTION
      )
      expect(response.body.message).equal(
        ERROR_MESSAGE.ERROR_MSG_BOOKS_NOT_AVAILABLE_ON_COLLECTION
      )
    })
  })

  it('Add a existing book to collection and verify the error', () => {
    BookstoreHelper.addBooksToCollection(addBookHeaders, body)
    BookstoreHelper.addBooksToCollection(addBookHeaders, body)
    cy.get('@response').then((response) => {
      expect(response.status).equal(STATUS_CODE.RESPONSE_CODE_BAD_REQUEST)
      expect(response.body.code).equal(
        ERROR_MESSAGE.ERROR_CODE_BOOKS_ALREADY_PRESENT_IN_COLLECTION
      )
      expect(response.body.message).equal(
        ERROR_MESSAGE.ERROR_MSG_BOOKS_ALREADY_PRESENT_IN_COLLECTION
      )
    })
  })

  it('Add a book with incorrect userId and verify the unauthorized error', () => {
    var bodyWrongUserId = {
      userId: 'c1f70dca-fa15-4efe-8b5c-0f73a797wrong',
      collectionOfIsbns: [
        {
          isbn: isbn,
        },
      ],
    }
    BookstoreHelper.addBooksToCollection(addBookHeaders, bodyWrongUserId)
    cy.get('@response').then((response) => {
      expect(response.status).equal(STATUS_CODE.RESPONSE_CODE_UNAUTHORIZED)
      expect(response.body.code).equal(
        ERROR_MESSAGE.ERROR_CODE_INCORRECT_USERID
      )
      expect(response.body.message).equal(
        ERROR_MESSAGE.ERROR_MSG_INCORRECT_USERID
      )
    })
  })
})
