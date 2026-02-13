import {test, expect} from '@playwright/test';
import { LoginPage } from '../../Pages/LoginPage';

test.describe('Login Functionality', () => {

    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigate();
    });

    test('verify page title', async ({ page }) => {
         await expect(page).toHaveTitle('QA Practice | Learn with RV');
    });

    test('validate login for invalid email format', async () => {
        await loginPage.login('invalid-email', 'admin123');
        await loginPage.submitButton.click();
        const validationMessage = await loginPage.emailInput.evaluate((input: HTMLInputElement) => input.validationMessage);
        expect(validationMessage).toBe("Please include an '@' in the email address. 'invalid-email' is missing an '@'.");
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toBe("Bad credentials! Please try again! Make sure that you've registered.");
    });

    test('Validate login for invalid password', async () => {
        await loginPage.login('admin@admin.com', 'wrongpassword');
        await loginPage.submitButton.click();
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toBe("Bad credentials! Please try again! Make sure that you've registered.");
    });

    test('verify login with valid credentials', async () => {
        await loginPage.login('admin@admin.com', 'admin123');
        const shopingCart = await loginPage.page.locator('text=Shopping Cart');
        await expect(shopingCart).toBeVisible();
        expect(await shopingCart.textContent()).toBe('SHOPPING CART');
    });

});