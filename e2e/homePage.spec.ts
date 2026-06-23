import { test } from '@playwright/test';
import { CreateAccountPage } from './fixtures/support/pages/homePage'
import data from './fixtures/accounts.json'
import { RegisterUserModel } from "./fixtures/registerModel";

let register: CreateAccountPage

test.beforeEach(({ page }) => {
  register = new CreateAccountPage(page)
})

test('Testando Registro na pagina inicial', async () => {
  const reg = data.TesteAutomacaoCreateAccount as RegisterUserModel

  await register.goTo()
  await register.acceptCookies()
  await register.fillCreateAccountForm(reg)
})

test('Testando Registro indo para tela FreeAccount', async () => {
  const reg = data.TesteAutomacaoCreateAccount as RegisterUserModel

  await register.goTo()
  await register.acceptCookies()
  await register.ButtonRedirectCreateFreeAccount()
  await register.newFreeAccount(reg)
})
