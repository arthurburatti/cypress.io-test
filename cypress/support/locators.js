const locators = {
    LOGIN: {
        USER: '[data-test=email]',
        PASSWORD: '[data-test=passwd]',
        BTN_LOGIN: '.btn'
    },
    MENU: {
        SETTINGS: '[data-test=menu-settings]',
        CONTAS: '[href="/contas"]'

    },
    CONTAS: {
        NOME: '[data-test=nome]',
        BTN_SALVAR: '.btn',
        XP_BNT_ALTERAR: '//table//td[contains(., \'Conta de Teste\')]/..//i[@class=\'far fa-edit\']',
    },
    MESSAGE: '.toast-message'
}

export default locators;