import { expect, Locator, Page } from "@playwright/test";
import dotenv from "dotenv"
import { RegisterUserModel } from "../../registerModel";
import { CreateFreeAccountPage } from "./freeAccount"
import { faker } from "@faker-js/faker";

dotenv.config()

const BASE_URL = process.env.BASE_URL

export class CreateAccountPage {
    readonly page: Page;
    readonly inputName: Locator
    readonly inputEmail: Locator
    readonly inputPhoneNumber: Locator
    readonly inputPassword: Locator
    readonly inputConfirmPassword: Locator

    constructor(page: Page) {
        this.page = page;
        this.inputName = this.page.locator('input[id="Name"]')
        this.inputEmail = this.page.locator('input[id="Email"]')
        this.inputPhoneNumber = this.page.locator('input[id="PhoneNumber"]')
        this.inputPassword = this.page.locator('input[id="Password"]')
        this.inputConfirmPassword = this.page.locator('input[id="ConfirmPassword"]')
    }

    async goTo() {
        if (!BASE_URL) {
            throw new Error('BASE_URL is not defined in .env')
        }

        await this.page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
        await expect(this.page).toHaveTitle('Frenet: frete barato e descomplicado para a sua loja virtual')
        await expect(this.inputName).toBeVisible({ timeout: 10000 })
    }

    async fillCreateAccountForm(reg: RegisterUserModel) {
        await this.inputName.fill(reg.name)
        await this.inputEmail.fill(reg.email)
        await this.inputPhoneNumber.fill(reg.cellPhone)
        await this.inputPassword.fill(reg.password)
        await this.inputConfirmPassword.fill(reg.confirmPassword)
    }

    async newFreeAccount(reg: RegisterUserModel) {
        const freeAccount = new CreateFreeAccountPage(this.page)

        await freeAccount.inputName.fill(reg.name)
        await freeAccount.inputEmail.fill(reg.email)
        await freeAccount.inputCellphone.fill(reg.cellPhone)
        await freeAccount.inputPassword.fill(reg.password)
        await freeAccount.inputConfirmPassword.fill(reg.confirmPassword)
    }

    async newFreeAccountDynamicDatas() {
        const freeAccount = new CreateFreeAccountPage(this.page)
        const password = faker.internet.password()

        await freeAccount.inputName.fill(faker.person.fullName())
        await freeAccount.inputEmail.fill(faker.internet.email())
        await freeAccount.inputCellphone.fill(`11${faker.string.numeric(9)}`)
        await freeAccount.inputPassword.fill(password)
        await freeAccount.inputConfirmPassword.fill(password)
    }

    async ButtonRedirectCreateFreeAccount() {
        const target = this.page.locator('//a[contains(@class,"elementor-button-link") and normalize-space()="Criar conta grátis"]')
        await target.click()
    }

    async clickRecaptchaCheckbox() {
        const inputCaptchaButton = this.page.locator('div[class="recaptcha-checkbox-checkmark"]')
        await inputCaptchaButton.click()
    }

    async acceptCookies() {
        const cookieBanner = this.page.locator('#cmplz-cookiebanner-1-optin')
        const acceptButton = cookieBanner.locator('button.cmplz-accept')

        await acceptButton.waitFor({ state: 'visible', timeout: 10000 }).catch(() => null)

        if (!(await acceptButton.isVisible())) {
            return
        }

        await expect(acceptButton).toBeVisible({ timeout: 10000 })
        await expect(acceptButton).toBeEnabled({ timeout: 10000 })

        await acceptButton.click()

        await expect(cookieBanner).toBeHidden({ timeout: 10000 })
    }

    async createButton() {
        const target = this.page.locator('button[id="btnSubmit"]')
        await target.click()
    }

    async createFreeAccountButton() {
        const freeAccount = new CreateFreeAccountPage(this.page)
        await freeAccount.CreateFreeAccountButton()
    }
}