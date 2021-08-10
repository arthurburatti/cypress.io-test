/// <reference types="cypress" />

describe('Espera', () => {
    before(() => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()
    })


    it('aguardar elemento ficar disponivel', () => {
        cy.get('#novoCampo').should('not.exist')
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo').should('not.exist')
        cy.get('#novoCampo').should('exist')
        cy.get('#novoCampo').type('funciona')
    })

    it.only('fazer retrys', () => {
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo')
            //.should('not.exist')
            .should('exist')
            .type('funciona')
    })
})