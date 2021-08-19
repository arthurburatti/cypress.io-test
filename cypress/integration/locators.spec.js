/// <reference types="cypress" />

describe('elementos basicos', () => {
    before(() => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()
    })

    it('...', () => {
       
    })

    it('usando xpath', () => {
        cy.xpath('//input[contains(@onclick, \'Francisco\')]')   
        cy.get()    
        cy.xpath('//table[@id=\'tabelaUsuarios\']//td[contains(., \'Francisco\')]/following-sibling::td/input')       
        cy.xpath('//table[@id=\'tabelaUsuarios\']//td[contains(., \'Francisco\')]/..//input')     
    })
})