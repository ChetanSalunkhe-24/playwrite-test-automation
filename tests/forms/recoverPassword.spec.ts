import { test, expect, Page } from "@playwright/test";
import { RecoverPasswordPage } from '../../Pages/recoverPasswordPage';

test.describe('Recover Password Functionality', () => {

    let recoverPasswordRecoverPage: RecoverPasswordPage;

    test.beforeEach(async ({ page }) => {
        recoverPasswordRecoverPage = new RecoverPasswordPage(page);
        await recoverPasswordRecoverPage.navigate();
    });

    test('validate email fiel is required', async () => {
        await recoverPasswordRecoverPage.recoverPassword('');
        const validationMessage = await recoverPasswordRecoverPage.emailInput.evaluate((input: HTMLInputElement) => input.validationMessage);
        expect(validationMessage).toBe('Please fill out this field.');
    });

    test('validate recover password with valid email address', async () => {
        const email = 'test@gmail.com';
        await recoverPasswordRecoverPage.recoverPassword(email);
        await expect(recoverPasswordRecoverPage.successMessage).toBeVisible();
        const actualMessage = await recoverPasswordRecoverPage.successMessage.textContent();
        const expectedMessage = `An email with the new password has been sent to ${email}. Please verify your inbox!`;
        expect(actualMessage).toBe(expectedMessage);
    });
});