const locators = {
    LOGIN: {
        USER: '[data-test=email]',
        PASSWORD: '[data-test=passwd]',
        BTN_LOGIN: '.btn'
    },
    MENU: {
        HOME: '[data-test=menu-home]',
        SETTINGS: '[data-test=menu-settings]',
        CONTAS: '[href="/contas"]',
        RESET: '[href="/reset"]',
        MOVIMENTAÇÃO: '[data-test=menu-movimentacao]',
        EXTRATO: '[data-test=menu-extrato]',
    },
    CONTAS: {
        NOME: '[data-test=nome]',
        BTN_SALVAR: '.btn',
        FN_XP_BNT_ALTERAR: nome => `//table//td[contains(., '${nome}')]/..//i[@class=\'far fa-edit\']`,
    },
    MOVIMENTAÇÃO: {
        DESCRIÇÃO: '[data-test=descricao]',
        VALOR: '[data-test=valor]',
        INTERESSADO: '[data-test=envolvido]',
        STATUS: '[data-test=status]',
        BTN_SALVAR: '.btn-primary',
        CONTA: '[data-test=conta]',
    },
    EXTRATO: {
        LINHAS: '.list-group li',
        FN_XP_BUSCA_ELEMENTO: (desc, value) => `//span[contains(., '${desc}')]/following-sibling::small[contains(., '${value}')]`,
        FN_XP_REMOVER_ELEMENTO: conta => `//span[contains(., '${conta}')]/../../..//i[@class='far fa-trash-alt']`,
        FN_XP_ALTERAR_ELEMENTO: conta => `//span[contains(., '${conta}')]/../../..//i[@class='fas fa-edit']`
    },
    SALDO: {
        FN_XP_SALDO_CONTA: nome => `//td[contains(., '${nome}')]/../td[2]`
    },
    MESSAGE: '.toast-message'
}

export default locators;