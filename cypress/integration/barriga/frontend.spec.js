/// <reference types="cypress" />

import loc from '../../support/locators'
import '../../support/commandsContas'
import buildEnv from '../../support/buildEnv'

describe('FrontEnd', () => {
    after(() => {
        cy.clearLocalStorage()
    })

    beforeEach(() => {
        buildEnv()
        cy.login('arthur@teste.com.br', 'senha errada')
        cy.get(loc.MENU.HOME).click()
        //cy.resetApp()
        //cy.wait(1000)
    })

    it('Inserir uma conta', () => {
        cy.route({
            method: 'POST',
            url: '/contas',
            response: [
                {
                    id: 3,
                    nome: "Conta de teste",
                    visivel: true,
                    usuario_id: 1
                }
            ]
        })

        cy.acessarMenuConta()

        cy.route({
            method: 'GET',
            url: '/contas',
            response: [
                {
                    id: 1,
                    nome: "Carteira",
                    visivel: true,
                    usuario_id: 1
                },
                {
                    id: 2,
                    nome: "Banco",
                    visivel: true,
                    usuario_id: 1
                },
                {
                    id: 3,
                    nome: "Conta de teste",
                    visivel: true,
                    usuario_id: 1
                }
            ]
        })

        cy.inserirConta('Conta de Teste')
        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso')
    })

    it('Alterar uma conta', () => {
        cy.route({
            method: 'PUT',
            url: '/contas/2',
            response: [
                {
                    id: 2,
                    nome: "Conta alterada",
                    visivel: true,
                    usuario_id: 1
                }
            ]
        })

        cy.acessarMenuConta()
        cy.xpath(loc.CONTAS.FN_XP_BNT_ALTERAR('Conta para alterar')).click()
        cy.get(loc.CONTAS.NOME).clear().type('Conta alterada')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso')
    })

    it('Não deve criar uma conta com mesmo nome', () => {

        cy.route({
            method: 'POST',
            url: '/contas',
            response:
            {
                "error": "Ja existe uma conta com esse nome!"
            },
            status: 400

        })

        cy.acessarMenuConta()
        cy.get(loc.CONTAS.NOME).clear().type('Conta mesmo nome')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'status code 400')
    })

    it('deve criar uma transação', () => {
        cy.route({
            method: 'POST',
            url: '/transacoes',
            response:
                { "id": 733156, "descricao": "teste", "envolvido": "teste", "observacao": null, "tipo": "REC", "data_transacao": "2021-09-06T03:00:00.000Z", "data_pagamento": "2021-09-06T03:00:00.000Z", "valor": "123.00", "status": false, "conta_id": 790246, "usuario_id": 24472, "transferencia_id": null, "parcelamento_id": null }
        })


        cy.get(loc.MENU.MOVIMENTAÇÃO).click()
        cy.get(loc.MOVIMENTAÇÃO.DESCRIÇÃO).clear().type('Teste')
        cy.get(loc.MOVIMENTAÇÃO.VALOR).clear().type(100)
        cy.get(loc.MOVIMENTAÇÃO.INTERESSADO).clear().type('Teste')
        cy.get(loc.MOVIMENTAÇÃO.CONTA).select('Carteira')
        cy.get(loc.MOVIMENTAÇÃO.STATUS).click()
        cy.get(loc.MOVIMENTAÇÃO.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')

        cy.get(loc.EXTRATO.LINHAS).should('have.length', 6)
        cy.xpath(loc.EXTRATO.FN_XP_BUSCA_ELEMENTO('teste', 123)).should('exist')
    })

    it('deve pegar o balanço', () => {
        cy.route({
            method: 'GET',
            url: '/transacoes/**',
            response:
            {
                "conta": "Conta para saldo",
                "id": 733151,
                "descricao": "Movimentacao 1, calculo saldo",
                "envolvido": "CCC",
                "observacao": null,
                "tipo": "REC",
                "data_transacao": "2021-09-06T03:00:00.000Z",
                "data_pagamento": "2021-09-06T03:00:00.000Z",
                "valor": "3500.00",
                "status": false,
                "conta_id": 790250,
                "usuario_id": 24472,
                "transferencia_id": null,
                "parcelamento_id": null
            }
        })

        cy.route({
            method: 'PUT',
            url: '/transacoes/**',
            response:
            {
                "conta": "Conta para saldo",
                "id": 733151,
                "descricao": "Movimentacao 1, calculo saldo",
                "envolvido": "CCC",
                "observacao": null,
                "tipo": "REC",
                "data_transacao": "2021-09-06T03:00:00.000Z",
                "data_pagamento": "2021-09-06T03:00:00.000Z",
                "valor": "3500.00",
                "status": false,
                "conta_id": 790250,
                "usuario_id": 24472,
                "transferencia_id": null,
                "parcelamento_id": null
            }
        })


        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('saldo')).should('contain', '900')

        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_ALTERAR_ELEMENTO('Movimentacao 1, calculo saldo')).click()
        //cy.wait(1000)
        cy.get(loc.MOVIMENTAÇÃO.DESCRIÇÃO).should('have.value', 'Movimentacao 1, calculo saldo')

        cy.get(loc.MOVIMENTAÇÃO.STATUS).click()
        cy.get(loc.MOVIMENTAÇÃO.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')
        cy.wait(1000)

        cy.route({
            method: 'GET',
            url: '/saldo',
            response: [
                {
                    conta_id: 999,
                    conta: "movimentacao",
                    saldo: "4034.00"
                },
                {
                    conta_id: 9999,
                    conta: "saldo",
                    saldo: "900000.00"
                }
            ]
        })

        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('movimentacao')).should('contain', '4.034,00')


    })

    it('deve remover uma movimentação', () => {

        cy.route({
            method: 'DELETE',
            url: '/transacoes/**',
            response: {},
            status: 204
        })

        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_REMOVER_ELEMENTO('teste')).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')
    })

    it('Inserir uma conta 2', () => {
        const reqStub = cy.stub()
        cy.route({
            method: 'POST',
            url: '/contas',
            response:
            {
                id: 3,
                nome: "Conta de teste",
                visivel: true,
                usuario_id: 1
            },
            /* onRequest: req => {
                console.log(req)
                expect(req.request.body.nome).to.be.empty
                expect(req.request.headers).to.have.property('Authorization')
            }, */
            onRequest: reqStub

        }).as('saveConta')

        cy.acessarMenuConta()

        cy.route({
            method: 'GET',
            url: '/contas',
            response: [
                {
                    id: 1,
                    nome: "Carteira",
                    visivel: true,
                    usuario_id: 1
                },
                {
                    id: 2,
                    nome: "Banco",
                    visivel: true,
                    usuario_id: 1
                },
                {
                    id: 3,
                    nome: "Conta de teste",
                    visivel: true,
                    usuario_id: 1
                }
            ]
        })

        cy.inserirConta('{CONTROL}')
        //cy.wait('@saveConta').its('request.body.nome').should('not.be.empty')
        cy.wait('@saveConta').then(() => {
            console.log(reqStub.args[0][0])
            expect(reqStub.args[0][0].request.body.nome).to.be.empty
            expect(reqStub.args[0][0].request.headers).to.have.property('Authorization')
        })
        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso')
    })


    it('Should test colors', () => {
        cy.route({
            method: 'GET',
            url: '/extrato/**',
            response: [
                { "conta": "Conta para movimentacoes", "id": 31434, "descricao": "Receita paga", "envolvido": "AAA", "observacao": null, "tipo": "REC", "data_transacao": "2019-11-13T03:00:00.000Z", "data_pagamento": "2019-11-13T03:00:00.000Z", "valor": "-1500.00", "status": true, "conta_id": 42077, "usuario_id": 1, "transferencia_id": null, "parcelamento_id": null },
                { "conta": "Conta com movimentacao", "id": 31435, "descricao": "Receita pendente", "envolvido": "BBB", "observacao": null, "tipo": "REC", "data_transacao": "2019-11-13T03:00:00.000Z", "data_pagamento": "2019-11-13T03:00:00.000Z", "valor": "-1500.00", "status": false, "conta_id": 42078, "usuario_id": 1, "transferencia_id": null, "parcelamento_id": null },
                { "conta": "Conta para saldo", "id": 31436, "descricao": "Despesa paga", "envolvido": "CCC", "observacao": null, "tipo": "DESP", "data_transacao": "2019-11-13T03:00:00.000Z", "data_pagamento": "2019-11-13T03:00:00.000Z", "valor": "3500.00", "status": true, "conta_id": 42079, "usuario_id": 1, "transferencia_id": null, "parcelamento_id": null },
                { "conta": "Conta para saldo", "id": 31437, "descricao": "Despesa pendente", "envolvido": "DDD", "observacao": null, "tipo": "DESP", "data_transacao": "2019-11-13T03:00:00.000Z", "data_pagamento": "2019-11-13T03:00:00.000Z", "valor": "-1000.00", "status": false, "conta_id": 42079, "usuario_id": 1, "transferencia_id": null, "parcelamento_id": null }
            ]
        })

        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_LINHA('Receita paga')).should('have.class', 'receitaPaga')
        cy.xpath(loc.EXTRATO.FN_XP_LINHA('Receita pendente')).should('have.class', 'receitaPendente')
        cy.xpath(loc.EXTRATO.FN_XP_LINHA('Despesa paga')).should('have.class', 'despesaPaga')
        cy.xpath(loc.EXTRATO.FN_XP_LINHA('Despesa pendente')).should('have.class', 'despesaPendente')
    })

    it.only('Resposividade', () => {
        cy.get('[data-test=menu-home]').should('exist')
        .and('be.visible')
        cy.viewport(500,700)

        cy.get('[data-test=menu-home]').should('exist')
        .and('be.not.visible')
        cy.viewport('iphone-5')

        cy.get('[data-test=menu-home]').should('exist')
        .and('be.not.visible')
    })
})