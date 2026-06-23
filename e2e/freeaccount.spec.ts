import test, { TestInfo } from "@playwright/test";
import { CreateAccountPage  } from './fixtures/support/pages/freeAccount'
import data from './fixtures/FreeAccount.json'
import { RegisterUserModel  } from "./fixtures/registerModel";

let register: CreateAccountPage 

test.beforeEach(({ page }) =>{
    register = new CreateAccountPage (page)
})

test('Testando Registro gratis', async (testInfo) => {
    const reg = data.TesteAutomacaoFreeAccount as RegisterUserModel 

    await register.goTo()
    await register.registerFreeAccount(reg)
})
