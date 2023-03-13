describe('Blog', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'testi',
      username: 'user12',
      password: 'salainensana'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user)
    cy.visit('')
  })

  it('Login form is shown', function() {
    cy.contains('blogs')
    cy.contains('username')
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('user12')
      cy.get('#password').type('salainensana')
      cy.get('#login-button').click()

      cy.contains('testi logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('user12')
      cy.get('#password').type('eioleoikea')
      cy.get('#login-button').click()

      cy.get('.message').contains('wrong username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'user12', password: 'salainensana' })
    })

    it('A blog can be created', function() {
      console.log(window.localStorage.getItem('loggedUser'))
      cy.contains('create new blog').click()
      cy.get('#title').type('title')
      cy.get('#author').type('author')
      cy.get('#url').type('https://www.test.com')
      cy.get('.create-button').contains('create').click()
      cy.contains('title author')
    })

    describe('A couple of blogs', function() {
      beforeEach(function() {
        cy.createBlog({ title: "Ensimmäinen", author: "Kirjoittaja", url: "http://www.test.com", likes: 7 })
        cy.createBlog({ title: "Toinen", author: "Kirjoittaja2", url: "http://www.test.com", likes: 0 })
        cy.createBlog({ title: "Kolmas", author: "Kirjoittaja3", url: "http://www.test.com", likes: 2 })
      })

      it('A blog can be liked', function() {
        cy.contains('Toinen').click()
        cy.contains('like').click()
        cy.contains('like').click()
        cy.contains('like').click()
        cy.contains('3 likes')
      })

      it('A blog can be deleted', function() {
        cy.contains('Ensimmäinen').click()
        cy.contains('remove').click()
        cy.contains('Ensimmäinen').should('not.exist')
      })
    })
  })
})

