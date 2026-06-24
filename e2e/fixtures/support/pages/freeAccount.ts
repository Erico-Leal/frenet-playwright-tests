import { expect, Locator, Page } from "@playwright/test";
import dotenv from "dotenv"
import { RegisterUserModel } from "../../registerModel";

dotenv.config()

const FREE_ACCOUNT_URL = process.env.FREE_ACCOUNT_URL

export class CreateFreeAccountPage {
    readonly page: Page;
    readonly inputName: Locator
    readonly inputEmail: Locator
    readonly inputCellphone: Locator
    readonly inputPassword: Locator
    readonly inputConfirmPassword: Locator

    constructor(page: Page) {
        this.page = page;
        this.inputName = this.page.locator('input[id="Name"]')
        this.inputEmail = this.page.locator('input[id="Email"]')
        this.inputCellphone = this.page.locator('input[id="Cellphone"]')
        this.inputPassword = this.page.locator('input[id="Password"]')
        this.inputConfirmPassword = this.page.locator('input[id="ConfirmPassword"]')
    }

    async goTo() {
        if (!FREE_ACCOUNT_URL) {
            throw new Error('FREE_ACCOUNT is not defined in .env')
        }
        await this.page.goto(FREE_ACCOUNT_URL);
        await expect(this.page).toHaveTitle('Cadastre-se na Frenet')
    }

    async fillCreateFreeAccountForm(reg: RegisterUserModel) {
        await this.inputName.fill(reg.name)
        await this.inputEmail.fill(reg.email)
        await this.inputCellphone.fill(reg.cellPhone)
        await this.inputPassword.fill(reg.password)
        await this.inputConfirmPassword.fill(reg.confirmPassword)
    }

    async clickRecaptchaCheckbox() {
        const inputCaptchaButton = this.page.locator('div[class="recaptcha-checkbox-checkmark"]')
        await inputCaptchaButton.click()
    }

    async CreateFreeAccountButton(){
        const target = this.page.locator('button[id="btnSubmit"]')
        await target.click()
    }
}