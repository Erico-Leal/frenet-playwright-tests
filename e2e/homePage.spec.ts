import { test } from '@playwright/test';
import { CreateAccountPage } from './fixtures/support/pages/homePage'
import data from './fixtures/accounts.json'
import { RegisterUserModel } from "./fixtures/registerModel";

let register: CreateAccountPage

test.beforeEach(({ page }) => {
  register = new CreateAccountPage(page)
})

test('Test: Criando uma conta na pagina inicial', async () => {
  const reg = data.TesteAutomacaoCreateAccount as RegisterUserModel

  await register.goTo()
  await register.acceptCookies()
  await register.fillCreateAccountForm(reg)
  // await register.clickRecaptchaCheckbox()
  // await register.createButton()
})

test('Test: Criar uma conta utilizando botão de ir para tela de cadastro', async () => {
  const reg = data.TesteAutomacaoCreateAccount as RegisterUserModel

  await register.goTo()
  await register.acceptCookies()
  await register.ButtonRedirectCreateFreeAccount()
  await register.newFreeAccount(reg)
  //await register.clickRecaptchaCheckbox()
  // await register.createFreeAccountButton()
})

test('Test: Criar uma conta utilizando botão de ir para tela de cadastro utilizando dados dinamicos', async () => {

  await register.goTo()
  await register.acceptCookies()
  await register.ButtonRedirectCreateFreeAccount()
  await register.newFreeAccountDynamicDatas()
  //await register.clickRecaptchaCheckbox()
  // await register.createFreeAccountButton()
})
