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

    it('fazer retrys', () => {
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo')
            //.should('not.exist')
            .should('exist')
            .type('funciona')
    })

    it('Uso do find', () => {
        cy.get('#buttonList').click()
        cy.get('#Lista li')
            .find('span')
            .should('contain', 'Item 1')
        cy.get('#Lista li span')
            //.find('span')
            .should('contain', 'Item 2')
    })

    it('Uso do find DOM', () => {
        cy.get('#buttonListDOM').click()
        cy.get('#Lista li')
            .find('span')
            .should('contain', 'Item 1')
        cy.get('#Lista li span')
            //.find('span')
            .should('contain', 'Item 2')
    })

    it('uso do timeout', () => {
        //cy.get('#buttonDelay').click()
        //cy.get('#novoCampo').should('exist')
        //cy.get('#novoCampo', { timeout: 1000 }).should('exist')
        //Timeout geral no sistema no arquivo cypress.json -paramento "defaultCommandTimeout" : 1000"
        cy.get('#buttonListDOM').click()
        cy.wait(5000)
        cy.get('#Lista li span')
            //.find('span')
            .should('contain', 'Item 2')
    })

    it.only('Click retry', () => {
        cy.get('#buttonCount')
            .click()
            .should('have.value', '1')
    })

    it.only('Should vc Then', () => {
        cy.get('#buttonListDOM').then($el => {
            expect($el).have.length(1)
            return 2
        }).and('not.have.id' , 'buttonListDOM')
    })
})