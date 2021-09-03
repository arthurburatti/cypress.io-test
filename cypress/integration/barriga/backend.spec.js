/// <reference types="cypress" />

//import loc from '../../support/locators'

describe('API', () => {
    //let token

    before(() => {
        //cy.login('arthur@teste.com.br', '123456')
        cy.getToken('arthur@teste.com.br', '123456')
            /* .then(tkn => {
                token = tkn
            }) */
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
            //headers: { Authorization: `JWT ${token}` },
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
        cy.getContaByName('Conta para alterar').then(contaId => {
            cy.request({
                method: 'PUT',
                url: `/contas/${contaId}`,
                //headers: { Authorization: `JWT ${token}` },
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
            //headers: { Authorization: `JWT ${token}` },
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

    it('deve criar uma transação', () => {
        cy.getContaByName('Conta para movimentacoes').then(contaId => {
            cy.request({
                method: 'POST',
                //headers: { Authorization: `JWT ${token}` },
                url: '/transacoes',
                body: {
                    conta_id: contaId,
                    data_pagamento: Cypress.moment().add({days: 1}).format('DD/MM/YYYY'),
                    data_transacao: Cypress.moment().format('DD/MM/YYYY'),
                    descricao: "teste",
                    envolvido: "teste",
                    status: true,
                    tipo: "REC",
                    valor: "123",
                }
            }).as('response')
        })
        cy.get('@response').its('status').should('be.equal', 201)
    })

    it('deve pegar o balanço', () => {
        cy.request({
            method: 'GET',
            //headers: { Authorization: `JWT ${token}` },
            url: '/saldo',
        }).then(res => {
            let saldoConta = null
            res.body.forEach(c => {
                if (c.conta === 'Conta para saldo') saldoConta = c.saldo
            })
            expect(saldoConta).to.be.equal('534.00')
        })

        cy.request({
            method: 'GET',
            //headers: { Authorization: `JWT ${token}` },
            url: '/transacoes',
            qs: {
                descricao: 'Movimentacao 1, calculo saldo'
            }
        }).then(res => {
            cy.request({
                method: 'PUT',
               // headers: { Authorization: `JWT ${token}` },
                url: `/transacoes/${res.body[0].id}`,
                body: {
                    status: true,
                    data_transacao: Cypress.moment(res.body[0].data_transacao).format('DD/MM/YYYY'),
                    data_pagamento: Cypress.moment(res.body[0].data_pagamento).format('DD/MM/YYYY'),
                    descricao: res.body[0].descricao,
                    envolvido: res.body[0].envolvido,
                    valor: res.body[0].valor,
                    conta_id: res.body[0].conta_id
                }
            }).its('status').should('be.equal', 200)
        })

        cy.request({
            method: 'GET',
            //headers: { Authorization: `JWT ${token}` },
            url: '/saldo',
        }).then(res => {
            let saldoConta = null
            res.body.forEach(c => {
                if (c.conta === 'Conta para saldo') saldoConta = c.saldo
            })
            expect(saldoConta).to.be.equal('4034.00')
        })

    })

    it('deve remover uma movimentação', () => {
        cy.request({
            method: 'GET',
            //headers: { Authorization: `JWT ${token}` },
            url: '/transacoes',
            qs: { descricao: 'Movimentacao para exclusao' }
        }).then(res => {
            cy.request({
                method: 'DELETE',
               // headers: { Authorization: `JWT ${token}` },
                url: `/transacoes/${res.body[0].id}`,
            }).its('status').should('be.equal', 204)
        })
    })
})