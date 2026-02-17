import { test, expect } from '@playwright/test';
import { RegisterPage } from '../../Pages/RegisterPage';
import { faker } from '@faker-js/faker';

test.describe('Registration Functionality', () => {
    let registerPage: RegisterPage;

    test.beforeEach(async ({ page }) => {
        registerPage = new RegisterPage(page);
        await registerPage.navigate();
    });

    test('validate error message for empty form', async () => {
        await registerPage.submitForm();
        const errorMessage = await registerPage.emailInput.evaluate((input: HTMLInputElement) => input.validationMessage);

        expect(errorMessage).toBe('Please fill out this field.');
    });

    test('Validate error message for invalid email ID',async () => {
        await registerPage.fillRegistrationForm(
            faker.person.firstName(),
            faker.person.lastName(),
            faker.phone.number(),
            'India',
            'invalid-email',
            '',  //Empty password
            true
        );
        await registerPage.submitForm();
        const errorMessage = await registerPage.emailInput.evaluate((input: HTMLInputElement) => input.validationMessage);
        const expectedMessage = "Please include an '@' in the email address. 'invalid-email' is missing an '@'.";
        expect(errorMessage).toBe(expectedMessage);

        if(await registerPage.sucessMessage.isVisible()){
            console.log(`User Should Not Register with invalid Email ID. Error message should be "${ expectedMessage }"`);
            test.fail();
        }
    });

    test('validate successful registration', async () => {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const phoneNumber = faker.phone.number();
        const email = faker.internet.email();
        const password = faker.internet.password();

        await registerPage.fillRegistrationForm(firstName, lastName, phoneNumber, 'India', email, password, true);
        await registerPage.submitForm();

        const successMessage = await registerPage.sucessMessage.textContent();
        expect(successMessage).toBe('The account has been successfully created!');
    });
});