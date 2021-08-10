/// <reference types="cypress" />

describe('Basico cypress', () => {
    it.only('Visitar uma pagina e acertar o título', () => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html')

        /* const title = cy.title
        console.log(title) */

        cy.pause()

        cy.title().should('to.be.equal', 'Campo de Treinamento')
        cy.title().should('contain', 'Campo').debug()

        cy.title()
            .should('to.be.equal', 'Campo de Treinamento')
            .should('contain', 'Campo')
    })

    it('Encontrar e interagir com o elemento', () => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html')
        cy.get('#buttonSimple')
            .click()
            .should('have.value', 'Obrigado!')
    })
})