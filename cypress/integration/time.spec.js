/// <reference types="cypress" />

describe('elementos basicos', () => {
    before(() => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()
    })


    it('Voltar', () => {
        cy.get('#buttonNow').click()
        cy.get('#resultado').should('contain', '23/08/2021')

/*         cy.clock()
        cy.get('#buttonNow').click()
        cy.get('#resultado').should('contain', '23/08/2021') */

        const dt = new Date(2012, 3, 10, 15, 23, 50)
        cy.clock(dt.getTime())
        cy.get('#buttonNow').click()
        cy.get('#resultado').should('contain', '10/04/2012')
    })

    it.only('Futuro', () => {
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').should('contain', '1630')
        cy.get('#resultado > span').invoke('text').should('gt', 1630415332343)

        cy.clock()
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').invoke('text').should('lte', 0)
        cy.wait(1000)
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').invoke('text').should('lte', 1000)

        cy.tick(5000)
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').invoke('text').should('gte', 5000)

        cy.tick(10000)
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').invoke('text').should('gte', 15000)
    })
})