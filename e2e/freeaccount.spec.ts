import { test } from "@playwright/test";
import { CreateFreeAccountPage } from './fixtures/support/pages/freeAccount'
import data from './fixtures/accounts.json'
import { RegisterUserModel } from "./fixtures/registerModel";

let register: CreateFreeAccountPage

test.beforeEach(({ page }) => {
    register = new CreateFreeAccountPage(page)
})

test.describe('Cadastros', () => {

    test('Test: criando uma conta gratis', async () => {
        const reg = data.TesteAutomacaoCreateFreeAccount as RegisterUserModel

        await register.goTo()
        await register.fillCreateFreeAccountForm(reg)
        await register.expectRegistrationFormFilled(reg)
        // await register.clickRecaptchaCheckbox()
        // await register.CreateFreeAccountButton()
    })

    test('Test: criando uma conta gratis com dados dinamicos', async () => {
        await register.goTo()
        const reg = await register.createFreeAccountWithDynamicData()
        await register.expectRegistrationFormFilled(reg)
        // await register.clickRecaptchaCheckbox()
        // await register.CreateFreeAccountButton()

    })
})

test.describe('Validacoes', () => {

    test('Test: Nome invalido', async () => {
        const reg = data.NomeInvalido as RegisterUserModel

        await register.goTo()
        await register.fillCreateFreeAccountForm(reg)
        await register.expectRegistrationFormFilled(reg)
        await register.expectInvalidName(reg)
    })

    test('Test: Email invalido', async () => {
        const reg = data.EmailInvalido as RegisterUserModel

        await register.goTo()
        await register.fillCreateFreeAccountForm(reg)
        await register.expectRegistrationFormFilled(reg)
        await register.expectInvalidEmail(reg)
    })

    test('Test: Numero de Telefone invalido', async () => {
        const reg = data.NumeroDeTelefoneInvalido as RegisterUserModel

        await register.goTo()
        await register.fillCreateFreeAccountForm(reg)
        await register.expectRegistrationFormFilled(reg)
        await register.expectInvalidCellPhone(reg)
    })
    
    test('Test: Campo Obrigatório ', async () => {
        const reg = data.CampoObrigatorio as RegisterUserModel

        await register.goTo()
        await register.fillCreateFreeAccountForm(reg)
        await register.expectRegistrationFormFilled(reg)
        await register.expectInvalidPassword(reg)
    })
    
    test('Test: Senhas divergentes ', async () => {
        const reg = data.SenhasDivergentes as RegisterUserModel

        await register.goTo()
        await register.fillCreateFreeAccountForm(reg)
        await register.expectRegistrationFormFilled(reg)
        await register.expectInvalidConfirmPassword(reg)
    })

})

