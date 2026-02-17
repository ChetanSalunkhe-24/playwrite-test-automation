import { Page, test } from "@playwright/test";

export class RegisterPage {
    readonly page: Page;
    readonly firstNameInput;
    readonly lastNameInput
    readonly phoneInput;
    readonly countryDropdown;
    readonly emailInput;
    readonly passwordInput;
    readonly termCheckbox
    readonly submitButton;
    readonly sucessMessage;

    constructor(page : Page) {
        this.page = page;
        this.firstNameInput = page.locator('#firstName');
        this.lastNameInput = page.locator('#lastName');
        this.phoneInput = page.locator('#phone');
        this.countryDropdown = page.locator('#countries_dropdown_menu');
        this.emailInput = page.locator('#emailAddress');
        this.passwordInput = page.locator('#password');
        this.termCheckbox = page.locator('#exampleCheck1');
        this.submitButton = page.locator('#registerBtn');
        this.sucessMessage = page.locator('#message');
    }

    async navigate(): Promise<void> {
        await this.page.goto('https://qa-practice.netlify.app/register');
    }

    async fillRegistrationForm(firstName: string, lastName: string, phoneNumber: any, country: string, email: string, password: string, checkBox: boolean): Promise<void> {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.phoneInput.fill(phoneNumber);
        await this.countryDropdown.selectOption(country);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);;
        await this.termCheckbox.setChecked(checkBox);
    }

    async submitForm(): Promise<void> {
        await this.submitButton.click();
    }
}