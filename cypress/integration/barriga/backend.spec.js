/// <reference types="cypress" />

//import loc from '../../support/locators'

describe('API', () => {
    let token

    before(() => {
        //cy.login('arthur@teste.com.br', '123456')
        cy.getToken('arthur@teste.com.br', '123456')
            .then(tkn => {
                token = tkn
            })
    })

    beforeEach(() => {
        cy.resetRest()
        //cy.get(loc.MENU.HOME).click()
        //cy.resetApp()
        //cy.wait(1000)
    })

    it('Inserir uma conta', () => {
        cy.request({
            method: 'POST',
            headers: { Authorization: `JWT ${token}` },
            url: '/contas',
            body: {
                nome: "Conta via rest 4",
            }
        }).as('response')

        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.property('id')
            expect(res.body).to.have.property('nome', 'Conta via rest 4')
        })
    })

    it('Alterar uma conta', () => {
        cy.request({
            method: 'GET',
            url: '/contas',
            headers: { Authorization: `JWT ${token}` },
            qs: {
                nome: "Conta para alterar",
            }
        }).then(res => {
            cy.request({
                method: 'PUT',
                url: `/contas/${res.body[0].id}`,
                headers: { Authorization: `JWT ${token}` },
                body: {
                    nome: "Conta para alterar 3",
                }
            }).as('response')
        })
        cy.get('@response').its('status').should('be.equal', 200)
    })

    it('Não deve criar uma conta com mesmo nome', () => {
        cy.request({
            method: 'POST',
            headers: { Authorization: `JWT ${token}` },
            url: '/contas',
            body: {
                nome: "Conta mesmo nome",
            },
            failOnStatusCode: false
        }).as('response')

        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(400)
            expect(res.body).to.have.property('error')
            expect(res.body).to.have.property('error', 'Já existe uma conta com esse nome!')
        })
    })

    it.only('deve criar uma transação', () => {
        cy.getContaByName('Conta para movimentacoes').then(contaId => {
            cy.request({
                method: 'POST',
                headers: { Authorization: `JWT ${token}` },
                url: '/transacoes',
                body: {
                    conta_id: contaId,
                    data_pagamento: Cypress.moment().format('DD/MM/YYYY'),
                    data_transacao: Cypress.moment().add({days: 1}).format('DD/MM/YYYY'),
                    descricao: "teste",
                    envolvido: "tes",
                    status: true,
                    tipo: "REC",
                    valor: "123",
                }
            }).as('response')
        })
        cy.get('@response').its('status').should('be.equal', 201)
    })

    it('deve pegar o balanço', () => {

    })

    it('deve remover uma movimentação', () => {

    })
})