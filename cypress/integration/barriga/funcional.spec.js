/// <reference types="cypress" />

import loc from '../../support/locators'

describe('Funcional', () => {
    before(() => {
        cy.visit('https://barrigareact.wcaquino.me')
        cy.get(loc.LOGIN.USER).type('arthur@teste.com.br')
        cy.get(loc.LOGIN.PASSWORD).type('123456')
        cy.get(loc.LOGIN.BTN_LOGIN).click()
        cy.get(loc.MESSAGE).should('contain', 'Bem vindo')
    })

    it('Inserir uma conta', () => {
        cy.get(loc.MENU.SETTINGS).click()
        cy.get(loc.MENU.CONTAS).click()
        cy.get(loc.CONTAS.NOME).type('Conta de Teste')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso')
    })

    it('Alterar uma conta', () => {
        cy.get(loc.MENU.SETTINGS).click()
        cy.get(loc.MENU.CONTAS).click()
        cy.xpath(XP_BNT_ALTERAR).click()
        cy.get(loc.CONTAS.NOME).clear().type('Conta alterada')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso')
    })
})