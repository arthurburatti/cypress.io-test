/// <reference types="cypress" />

import loc from '../../support/locators'
import '../../support/commandsContas'

describe('Funcional', () => {
    before(() => {
        cy.login('arthur@teste.com.br', '123456')
        cy.resetApp()
        })

    it('Inserir uma conta', () => {
        cy.acessarMenuConta()
        cy.inserirConta('Conta de Teste')
        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso')
    })

    it('Alterar uma conta', () => {
        cy.acessarMenuConta()
        cy.xpath(loc.CONTAS.XP_BNT_ALTERAR).click()
        cy.get(loc.CONTAS.NOME).clear().type('Conta alterada')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso')
    })

    it('Não deve criar uma conta com mesmo nome', () => {
        cy.acessarMenuConta()
        cy.get(loc.CONTAS.NOME).clear().type('Conta alterada')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'status code 400')
    })
})