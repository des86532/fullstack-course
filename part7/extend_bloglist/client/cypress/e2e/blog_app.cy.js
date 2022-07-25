describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'neil yang',
      username: 'neil',
      password: 'qwer1234'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  describe('Init', function() {
    it('front page can be opened', function() {
      cy.contains('log in to application')
    })

    it('login form can be opened', function() {
      cy.get('button').contains('log in').click()
      cy.contains('cancel')
    })
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('button').contains('log in').click()
      cy.get('#username').type('neil')
      cy.get('#password').type('qwer1234')
      cy.get('#login-button').click()

      cy.contains('neil logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('button').contains('log in').click()
      cy.get('#username').type('neil')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.contains('Wrong credentials')
    })

    describe('When logged in', function() {
      beforeEach(function() {
        cy.login({ username: 'neil', password: 'qwer1234' })
      })

      describe('Create Blog', function() {
        it('create blog success', function() {
          cy.contains('create new blog').click()
          cy.get('#title').type('test title')
          cy.get('#author').type('test author')
          cy.get('#url').type('test url')
          cy.get('#submit-button').click()
    
          cy.contains('blog added success')
          cy.contains('test title')  
        })
      })

      describe('When created a blog', function() {
        beforeEach(function() {
          cy.createBlog({ title: 'test title1', author: 'test author1', url: 'test url1', likes: 0 } )
          cy.createBlog({ title: 'test title2', author: 'test author2', url: 'test url2', likes: 8 } )
          cy.createBlog({ title: 'test title3', author: 'test author3', url: 'test url3', likes: 20 } )
        })

        describe('Update blog', function() {
          it('click like button', function() {
            cy.contains('test title1 test author1').parent().find('button').click()
            cy.contains('test title1 test author1').parent().next('.detail').get('.like-button').click()
            cy.contains('likes1')
          })
        })
  
        describe('Remove blog', function() {
          it('click remove button', function() {
            cy.contains('test title2 test author2').parent().find('button').click()
            cy.contains('test title2 test author2').parent().next('.detail').get('.remove-button').click()
            cy.contains('blog removed success')
          })
        })

        describe.only('Sort by blog likes', function() {
          it('click all visible button', function() {
            cy.get('.visible-button').click({ multiple: true })
            cy.get('.detail').eq(0).should('contain', 'test url3')
            cy.get('.detail').eq(1).should('contain', 'test url2')
            cy.get('.detail').eq(2).should('contain', 'test url1')
          })
        })
      })
    })
  })
})