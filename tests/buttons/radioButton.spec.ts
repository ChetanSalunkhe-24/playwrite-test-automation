import { test, expect} from '@playwright/test'
import { endpoint } from '../../Utilities/endpoints'
import { assert } from 'node:console';

test('Verify radio button functionality', async({ page }) => {
    //Navigate to the radio button screen
    page.goto(endpoint.radioButtons);

    //Locators
    const radioBtn1 = page.locator('#radio-button1');
    const radioBtn2 = page.locator('#radio-button2');
    const radioBtn3 = page.locator('#radio-button3');
    const radioBtn4 = page.locator('#radio-button4'); //Disabled Button

    await radioBtn1.click();
    expect(radioBtn1).toBeChecked;

    await radioBtn2.click();
    expect(radioBtn2).toBeChecked;

    await radioBtn3.click();
    expect(radioBtn3).toBeChecked;

    await expect(radioBtn4).toBeDisabled;
});