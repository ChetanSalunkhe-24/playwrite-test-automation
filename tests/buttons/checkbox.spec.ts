import { test, expect} from '@playwright/test'
import { endpoint } from '../../Utilities/endpoints'

test('Verify checkbox button and reset button functionality', async({ page }) => {
    // Navigate to the checkbox page
    await page.goto(endpoint.checkbox);
    
    // Locator Checkboxes
    const firstCheckBox = page.locator('#checkbox1');
    const secondCheckBox = page.locator('#checkbox2');
    const thirdCheckBox = page.locator('#checkbox3');
    const resetButton = page.locator('[class*="btn btn-primary"]');

    // Click on all checkboxes and verify they are selected
        await firstCheckBox.click();
        await secondCheckBox.click();
        await thirdCheckBox.click();

       //Asert all checkbox are selected or not
       expect(firstCheckBox).toBeChecked();
       expect(secondCheckBox).toBeChecked();
       expect(thirdCheckBox).toBeChecked();

    // test('Verify reset checkbox functionality', async()=> {
        await resetButton.click();

        expect(firstCheckBox).not.toBeChecked();
        expect(secondCheckBox).not.toBeChecked();
        expect(thirdCheckBox).not.toBeChecked();
});
