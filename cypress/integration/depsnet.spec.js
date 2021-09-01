/// <reference types="cypress" />

describe('Teste', () => {
    it.only('Teste', () => {
        cy.visit('http://192.168.1.245:81/')
        cy.get('#txtLogin').type('arthur')
        cy.get('#txtSenha').type('123123')
        cy.get('#cmdEntrar_input').click()
        cy.wait(2000)
        if(cy.contains('#RadWindowWrapper')){
        cy.xpath(`//span[contains(., 'Sim')][@class='rwInnerSpan']`).click()
        }else{
            
        }
    })
})