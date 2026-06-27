import { expect, Locator, Page } from "@playwright/test";
import { RegisterUserModel } from "../../registerModel";
import { CreateFreeAccountPage } from "./freeAccount"
import { faker } from "@faker-js/faker";

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

    async fillRedirectedFreeAccountForm(reg: RegisterUserModel) {
        const freeAccount = new CreateFreeAccountPage(this.page)

        await freeAccount.fillCreateFreeAccountForm(reg)
    }

    async fillRedirectedFreeAccountFormWithDynamicData(): Promise<RegisterUserModel> {
        const freeAccount = new CreateFreeAccountPage(this.page)
        const password = faker.internet.password()

        const reg = {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            cellPhone: `11${faker.string.numeric(9)}`,
            password: password,
            confirmPassword: password
        }

        await freeAccount.fillCreateFreeAccountForm(reg)

        return reg
    }

    async createFreeAccountButton() {
        const freeAccount = new CreateFreeAccountPage(this.page)
        await freeAccount.createFreeAccountButton()
    }

    async createAccountWithDynamicData(): Promise<RegisterUserModel> {
        const password = faker.internet.password()

        const reg = {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            cellPhone: `11${faker.string.numeric(9)}`,
            password: password,
            confirmPassword: password
        }

        await this.fillCreateAccountForm(reg)

        return reg
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

        await acceptButton.waitFor({ state: 'visible', timeout: 30000 }).catch(() => null)

        if (!(await acceptButton.isVisible())) {
            return
        }

        await expect(acceptButton).toBeVisible({ timeout: 30000 })
        await expect(acceptButton).toBeEnabled({ timeout: 30000 })

        await acceptButton.click()

        await expect(cookieBanner).toBeHidden({ timeout: 30000 })
    }

    async createButton() {
        const target = this.page.locator('button[id="btnSubmit"]')
        await target.click()
    }

    async expectRegistrationFormFilled(reg: RegisterUserModel) {
        await expect(this.inputName).toHaveValue(reg.name)
        await expect(this.inputEmail).toHaveValue(reg.email)

        const cellphoneValue = await this.inputPhoneNumber.inputValue()
        expect(cellphoneValue.replace(/\D/g, '')).toBe(reg.cellPhone)

        await expect(this.inputPassword).toHaveValue(reg.password)
        await expect(this.inputConfirmPassword).toHaveValue(reg.confirmPassword)
    }

    async expectRedirectedFreeAccountFormFilled(reg: RegisterUserModel) {
        const freeAccount = new CreateFreeAccountPage(this.page)

        await freeAccount.expectRegistrationFormFilled(reg)
    }
}