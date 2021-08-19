/// <reference types="cypress" />

describe('elementos basicos', () => {
    before(() => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()
    })

    it('usando fixture', () => {
        cy.get('#formNome').type()
        cy.get('#formNome').type()
        cy.get('[name=formSexo][value=F]').click()
        cy.get('[name=formComidaFavorita][value=pizza]').click()
        cy.get('[data-test=dataEscolaridade]')
        cy.get('[data-test=dataEscolaridade]')
    })
})