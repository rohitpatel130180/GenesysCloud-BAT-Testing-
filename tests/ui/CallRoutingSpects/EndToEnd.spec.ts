import { test, expect } from "../../../src/fixtures/genesys-fixtures"



test.only('test1', async ({ page }) => {
    test.setTimeout(60000);
    await page.goto('https://login.euw2.pure.cloud/#/authenticate-adv/org/ovodev');
    await page.getByRole('textbox', { name: 'Email Address' }).click();
    await page.getByRole('textbox', { name: 'Email Address' }).fill('rohit.patel2@ovo.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('chairHONOR741!');
    await page.getByRole('button', { name: 'Log In' }).click();
    await page.getByRole('link', { name: 'Collaborate/ Communicate' }).click();
    await page.goto('https://apps.euw2.pure.cloud/directory/#/activity');
    await page.waitForLoadState('domcontentloaded');
    await page.getByRole('link', { name: 'Calls Panel Toggle, Panel Is' }).click();
    await page.waitForLoadState('domcontentloaded');
    // await page.waitForLoadState('load');
    // await expect.poll(
    //     async () => {
    //await page.getByRole('tab', { name: 'Dialpad' }).waitFor({ state: "visible" });
    //     },
    //     {
    //         timeout: 5000,
    //         intervals: [500],
    //     },
    // ).toBeTruthy();
    await page.getByRole('tab', { name: 'Dialpad' }).waitFor({ state: "visible" , timeout: 5000 });
    await page.getByRole('tab', { name: 'Dialpad' }).click();
    await page.getByRole('textbox', { name: 'Number or contact' }).click();
    await page.getByRole('textbox', { name: 'Number or contact' }).fill('07878665434');
    await page.locator("css=div.target-dropdown.no-header.ember-view").dispatchEvent("blur");
    await page.waitForLoadState('domcontentloaded');
    await page.waitForLoadState('load');
    
    //await page.waitForLoadState('networkidle');
    await page.waitForTimeout(20000);
    const button = await page.locator("css=button.dialpad-number.make-call:not([disabled])");
    await button.click();

});



