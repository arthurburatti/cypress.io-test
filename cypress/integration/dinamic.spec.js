/// <reference types="cypress" />

describe('dinamic test', () => {
    before(() => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()
    })

    const foods = ['Carne','Frango','Pizza','Vegetariano']
    foods.forEach(food => {
        it(`Cadastro com comida ${food}`, () => {
            cy.get('#formNome').type('usuario')
                cy.get('#formSobrenome').type('Teste')
                cy.get(`[name=formSexo][value=F]`).click()
                cy.xpath(`//label[contains(., '${food}')]/preceding-sibling::input`).click()
                cy.get('#formEscolaridade').select('Doutorado')
                cy.get('#formEsportes').select('Corrida')
                cy.get('#formCadastrar').click()
                cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado')
        })
    })

    it(`Deve selecionar todos usando each`, () => {
        cy.get('#formNome').type('usuario')
        cy.get('#formSobrenome').type('Teste')
        cy.get(`[name=formSexo][value=F]`).click()

        cy.get('[name=formComidaFavorita').each($el => {
            if($el.val() != 'vegetariano')
            cy.wrap($el).click()
        })

        cy.get('#formEscolaridade').select('Doutorado')
        cy.get('#formEsportes').select('Corrida')
        cy.get('#formCadastrar').click()
        cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado')
    })
})