
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'name_str',
      username: 'root',
      password: '1234'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login from is shown', function() {
    cy.get('#loginForm')
    cy.get('#usernameInput')
    cy.get('#passwordInput')
    cy.get('#loginButton')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#usernameInput').type('root')
      cy.get('#passwordInput').type('1234')
      cy.get('#loginButton').click()
      cy.contains('name_str logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#usernameInput').type('root')
      cy.get('#passwordInput').type('wrongpassword')
      cy.get('#loginButton').click()

      cy.get('.error').should('contain', 'invalid username or password')
      cy.get('html').should('not.contain', 'name_str logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#usernameInput').type('root')
      cy.get('#passwordInput').type('1234')
      cy.get('#loginButton').click()
    })

    it('A blog can be created', function() {
      cy.get('#togglableButton').click()
      cy.get('#urlInput').type('test-url')
      cy.get('#titleInput').type('test-title')
      cy.get('#authorInput').type('test-author')
      cy.get('#blogSubmitButton').click()

      cy.contains('test-title')
      cy.contains('test-author')

      cy.get('#viewButton').click()
      cy.contains('test-url')
    })
  })

  describe('After creating a blog', function() {
    beforeEach(function() {
      cy.get('#usernameInput').type('root')
      cy.get('#passwordInput').type('1234')
      cy.get('#loginButton').click()

      cy.get('#togglableButton').click()
      cy.get('#urlInput').type('test-url')
      cy.get('#titleInput').type('test-title')
      cy.get('#authorInput').type('test-author')
      cy.get('#blogSubmitButton').click()
    })

    it('A blog can be liked', function() {
      cy.get('#viewButton').click()
      cy.get('#likeBlogButton').click()
      cy.contains('likes: 1')
    })

    it('A blog can be removed by the user who added it', function() {
      cy.get('#viewButton').click()
      cy.get('html').should('contain', 'test-title test-author')
      cy.get('#removeBlogButton').click()
      cy.get('html').should('not.contain', 'test-title test-author')
    })

    it('A blog can not be removed by other user', function() {
      const newUser = {
        name: 'name-str',
        username: 'other-user',
        password: 'lol'
      }
      cy.request('POST', 'http://localhost:3003/api/users', newUser)

      cy.get('#logoutButton').click()
      cy.get('#usernameInput').type('other-user')
      cy.get('#passwordInput').type('lol')
      cy.get('#loginButton').click()

      cy.get('#viewButton').click()
      cy.get('#removeBlogButton').should('not.visible')
    })

    it('Blogs are sorted by likes', function() {
      cy.get('#togglableButton').click()
      cy.get('#urlInput').type('1-url')
      cy.get('#titleInput').type('title-most-liked')
      cy.get('#authorInput').type('author-most-liked')
      cy.get('#blogSubmitButton').click()

      cy.get('#togglableButton').click()
      cy.get('#urlInput').type('2-url')
      cy.get('#titleInput').type('title-second-most-liked')
      cy.get('#authorInput').type('author-second-most-liked')
      cy.get('#blogSubmitButton').click()

      cy.get('#blogs').contains('title-most-liked').find('#viewButton').click()
      cy.get('#blogs').contains('title-most-liked').find('#likeBlogButton').click().click()

      cy.get('#blogs').contains('title-second-most-liked').find('#viewButton').click()
      cy.get('#blogs', { timeout: 10000 }).contains('title-second-most-liked').find('#likeBlogButton').click()

      cy.wait(1000)

      cy.get('#blogs', { timeout: 10000 }).children().then( items => {
        expect(items[0]).to.contain.text('title-most-liked')
        expect(items[1]).to.contain.text('title-second-most-liked')
        expect(items[2]).to.contain.text('test-title')
      })
    })
  })
})