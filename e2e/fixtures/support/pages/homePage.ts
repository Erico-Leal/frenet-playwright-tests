import { expect, Locator, Page } from "@playwright/test";
import dotenv from "dotenv"
import { RegisterUserModel } from "../../registerModel";

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

        await this.page.goto(BASE_URL);
        await expect(this.page).toHaveTitle('Frenet: frete barato e descomplicado para a sua loja virtual')
    }

    async fillCreateAccountForm(reg: RegisterUserModel) {
        await this.inputName.fill(reg.name)
        await this.inputEmail.fill(reg.email)
        await this.inputPhoneNumber.fill(reg.cellPhone)
        await this.inputPassword.fill(reg.password)
        await this.inputConfirmPassword.fill(reg.confirmPassword)
    }

    async clickRecaptchaCheckbox() {
        const inputCaptchaButton = this.page.locator('div[class="recaptcha-checkbox-checkmark"]')
        await inputCaptchaButton.click()
    }

    async acceptCookies() {
        const cookieBanner = this.page.locator('#cmplz-cookiebanner-1-optin')
        const acceptButton = this.page.locator('//button[contains(@class,"cmplz-accept") and normalize-space()="Aceitar"]')
        await acceptButton.click()
    }
}