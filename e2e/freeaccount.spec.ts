import { test } from "@playwright/test";
import { CreateFreeAccountPage } from './fixtures/support/pages/freeAccount'
import data from './fixtures/accounts.json'
import { RegisterUserModel } from "./fixtures/registerModel";

let register: CreateFreeAccountPage

test.beforeEach(({ page }) => {
    register = new CreateFreeAccountPage(page)
})

test('Test: criando gratis', async () => {
    const reg = data.TesteAutomacaoCreateFreeAccount as RegisterUserModel

    await register.goTo()
    await register.fillCreateFreeAccountForm(reg)
    // await register.clickRecaptchaCheckbox()
    // await register.CreateFreeAccountButton()
})

test('Test: criando uma conta gratis com dados dinamicos', async () => {
    await register.goTo()
    await register.createFreeAccountWithDynamicData()
    // await register.clickRecaptchaCheckbox()
    // await register.CreateFreeAccountButton()

})
