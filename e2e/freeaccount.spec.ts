import { test } from "@playwright/test";
import { CreateFreeAccountPage } from './fixtures/support/pages/freeAccount'
import data from './fixtures/accounts.json'
import { RegisterUserModel } from "./fixtures/registerModel";

let register: CreateFreeAccountPage

test.beforeEach(({ page }) => {
    register = new CreateFreeAccountPage(page)
})

test('Testando Registro gratis', async () => {
    const reg = data.TesteAutomacaoCreateAccount as RegisterUserModel

    await register.goTo()
    await register.fillCreateFreeAccountForm(reg)
})
