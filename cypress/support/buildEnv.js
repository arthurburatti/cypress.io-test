const buildEnv = () => {
    cy.server()

    cy.route({
        method: 'POST',
        url: '/signin',
        response: {
            id: 1000,
            nome: 'Usuario Falso',
            token: 'TESTETESTESTSETSFAFASDFASFA'
        }
    })

    cy.route({
        method: 'GET',
        url: '/saldo',
        response: [
            {
                conta_id: 999,
                conta: "movimentacao",
                saldo: "1500.00"
            },
            {
                conta_id: 9999,
                conta: "saldo",
                saldo: "900000.00"
            }
        ]
    })

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
            }
        ]
    })

    cy.route({
        method: 'GET',
        url: '/extrato/**',
        response: 'fixture:movimentacaoSalva.json'
    })
}

export default buildEnv