/// <reference types="cypress" />

import loc from '../../support/locators'
import '../../support/commandsContas'

describe('Funcional', () => {
    before(() => {
        cy.login('arthur@teste.com.br', '123456')
    })
    
    beforeEach(() => {
        cy.get(loc.MENU.HOME).click()
        cy.resetApp()
        cy.wait(1000)
    })

    it('Inserir uma conta', () => {
        cy.acessarMenuConta()
        cy.inserirConta('Conta de Teste')
        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso')
    })

    it('Alterar uma conta', () => {
        cy.acessarMenuConta()
        cy.xpath(loc.CONTAS.FN_XP_BNT_ALTERAR('Conta para alterar')).click()
        cy.get(loc.CONTAS.NOME).clear().type('Conta alterada')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso')
    })

    it('Não deve criar uma conta com mesmo nome', () => {
        cy.acessarMenuConta()
        cy.get(loc.CONTAS.NOME).clear().type('Conta mesmo nome')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'status code 400')
    })

    it('deve criar uma transação', () => {
        cy.get(loc.MENU.MOVIMENTAÇÃO).click()
        cy.get(loc.MOVIMENTAÇÃO.DESCRIÇÃO).clear().type('Teste')
        cy.get(loc.MOVIMENTAÇÃO.VALOR).clear().type(100)
        cy.get(loc.MOVIMENTAÇÃO.INTERESSADO).clear().type('Teste')
        cy.get(loc.MOVIMENTAÇÃO.CONTA).select('Conta para movimentacoes')
        cy.get(loc.MOVIMENTAÇÃO.STATUS).click()
        cy.get(loc.MOVIMENTAÇÃO.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')

        cy.get(loc.EXTRATO.LINHAS).should('have.length', 7)
        cy.xpath(loc.EXTRATO.FN_XP_BUSCA_ELEMENTO('Teste', 100)).should('exist')
    })

    it('deve pegar o balanço', () => {
        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta para saldo')).should('contain', '534,00')

        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_ALTERAR_ELEMENTO('Movimentacao 1, calculo saldo')).click()
        //cy.wait(1000)
        cy.get(loc.MOVIMENTAÇÃO.DESCRIÇÃO).should('have.value', 'Movimentacao 1, calculo saldo')

        cy.get(loc.MOVIMENTAÇÃO.STATUS).click()
        cy.get(loc.MOVIMENTAÇÃO.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')
        cy.wait(1000)
        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta para saldo')).should('contain', '4.034,00')


    })

    it('deve remover uma movimentação', () => {
        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_REMOVER_ELEMENTO('Movimentacao para exclusao')).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')
    })
})