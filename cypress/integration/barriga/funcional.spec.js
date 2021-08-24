/// <reference types="cypress" />

describe('Funcional', () => {
    before(() => {
        cy.visit('https://barrigareact.wcaquino.me')
        cy.get('[data-test=email]').type('arthur@teste.com.br')
        cy.get('[data-test=passwd]').type('123456')
        cy.get('.btn').click()
        cy.get('.toast-message').should('contain', 'Bem vindo')
    })

    it('Inserir uma conta', () => {
        cy.get('[data-test=menu-settings]').click()
        cy.get('[href="/contas"]').click()
        cy.get('[data-test=nome]').type('Conta de Teste')
        cy.get('.btn').click()
        cy.get('.toast-message').should('contain', 'Conta inserida com sucesso')
    })

    it('Alterar uma conta', () => {
        cy.get('[data-test=menu-settings]').click()
        cy.get('[href="/contas"]').click()
        cy.xpath('//table//td[contains(., \'Conta de Teste\')]/..//i[@class=\'far fa-edit\']').click()
        cy.get('[data-test=nome]').clear().type('Conta alterada')
        cy.get('.btn').click()
        cy.get('.toast-message').should('contain', 'Conta atualizada com sucesso')
    })
})