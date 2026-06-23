import test, { TestInfo } from "@playwright/test";
import { Registration } from './fixtures/support/pages/freeAccount'
import data from './fixtures/FreeAccount.json'
import { RegisterModel } from "./fixtures/registerModel";

let register: Registration

test.beforeEach(({ page }) =>{
    register = new Registration(page)
})

test('Testando Register', async (testInfo) => {
    const reg = data.TesteAutomacaoFreeAccount as RegisterModel

    await register.goTo()
    await register.registerFreeAccount(reg)
})
