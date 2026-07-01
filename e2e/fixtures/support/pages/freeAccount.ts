import { expect, Locator, Page } from "@playwright/test";
import dotenv from "dotenv"
import { RegisterUserModel } from "../../registerModel";
import { faker } from '@faker-js/faker';

dotenv.config()

const FREE_ACCOUNT_URL = process.env.FREE_ACCOUNT_URL

export class CreateFreeAccountPage {
    readonly page: Page;
    readonly inputName: Locator
    readonly inputEmail: Locator
    readonly inputCellphone: Locator
    readonly inputPassword: Locator
    readonly inputConfirmPassword: Locator
    readonly invalidName: Locator

    constructor(page: Page) {
        this.page = page;
        this.inputName = this.page.locator('input[id="Name"]')
        this.inputEmail = this.page.locator('input[id="Email"]')
        this.inputCellphone = this.page.locator('input[id="Cellphone"]')
        this.inputPassword = this.page.locator('input[id="Password"]')
        this.inputConfirmPassword = this.page.locator('input[id="ConfirmPassword"]')
        this.invalidName = this.page.locator('p[id="Name_msg"]')
    }

    async goTo() {
        if (!FREE_ACCOUNT_URL) {
            throw new Error('FREE_ACCOUNT is not defined in .env')
        }
        await this.page.goto(FREE_ACCOUNT_URL, { waitUntil: 'domcontentloaded' });
        await expect(this.page).toHaveTitle('Cadastre-se na Frenet')
        await expect(this.inputName).toBeVisible({ timeout: 10000 })
    }

    async fillCreateFreeAccountForm(reg: RegisterUserModel) {
        await this.inputName.fill(reg.name)
        await this.inputEmail.fill(reg.email)
        await this.inputCellphone.fill(reg.cellPhone)
        await this.inputPassword.fill(reg.password)
        await this.inputConfirmPassword.fill(reg.confirmPassword)
    }

    async createFreeAccountWithDynamicData(): Promise<RegisterUserModel> {
        const passwordFaker = faker.internet.password()

        const reg = {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            cellPhone: `11${faker.string.numeric(9)}`,
            password: passwordFaker,
            confirmPassword: passwordFaker
        }

        await this.fillCreateFreeAccountForm(reg)

        return reg
    }

    async createFreeAccountButton() {
        const target = this.page.locator('button[id="btnSubmit"]')
        await target.click()
    }
    async clickRecaptchaCheckbox() {
        const inputCaptchaButton = this.page.locator('div[class="recaptcha-checkbox-checkmark"]')
        await inputCaptchaButton.click()
    }

    async expectRegistrationFormFilled(reg: RegisterUserModel) {
        await expect(this.inputName).toHaveValue(reg.name)
        await expect(this.inputEmail).toHaveValue(reg.email)

        const cellphoneValue = await this.inputCellphone.inputValue()
        expect(cellphoneValue.replace(/\D/g, '')).toBe(reg.cellPhone)

        await expect(this.inputPassword).toHaveValue(reg.password)
        await expect(this.inputConfirmPassword).toHaveValue(reg.confirmPassword)
    }

    async expectInvalidName(reg: RegisterUserModel) {
        const form = this.page.locator('form#registerForm');

        const isValid = await this.inputName.evaluate((input: HTMLInputElement) => input.validity.valid);
        expect(isValid).toBe(false);

        await form.evaluate((element) => {
            element.classList.add('was-validated');
        });

        await expect(this.invalidName).toBeVisible();
        await expect(this.invalidName).toHaveText('Digite seu nome completo.');
    }
}
