/// <reference types="cypress" />

describe('Basico cypress', () => {
    it.only('Visitar uma pagina e acertar o título', () => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html')

        /* const title = cy.title
        console.log(title) */

        //cy.pause()

        cy.title().should('to.be.equal', 'Campo de Treinamento')
        cy.title().should('contain', 'Campo')

        cy.title()
            .should('to.be.equal', 'Campo de Treinamento')
            .should('contain', 'Campo')
        
        let synctitle

        cy.title().then(title => {
            console.log(title)

            //cy.get('#formNome').type(title)

            synctitle = title
        })

        cy.get('[data-cy=dataSobrenome]').then($el => {
           $el.val(synctitle)
        })

        cy.get('#elementosForm\\:sugestoes').then($el => {
            cy.wrap($el).type(synctitle)
        })
    })

    it('Encontrar e interagir com o elemento', () => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html')
        cy.get('#buttonSimple')
            .click()
            .should('have.value', 'Obrigado!')
    })
})