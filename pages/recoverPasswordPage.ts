import { Locator, Page } from "@playwright/test";

export class RecoverPasswordPage {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly recoverPasswordButton: Locator;
    readonly successMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.locator('#email');
        this.recoverPasswordButton = page.locator('[class*="btn btn-primary"]');
        this.successMessage = page.locator('#message');
    }

    async navigate(): Promise<void> {
        await this.page.goto('https://qa-practice.netlify.app/recover-password');
    }

    async recoverPassword(email: string): Promise<void> {
        await this.emailInput.fill(email);
        await this.recoverPasswordButton.click();
    }
}