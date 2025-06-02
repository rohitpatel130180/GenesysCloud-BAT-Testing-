import { test, expect } from "../../src/fixtures/genesys-fixtures"

test('test', async ({ page }) => {

    await page.goto('https://login.euw2.pure.cloud/#/authenticate-adv/org/ovodev');
    await page.getByRole('textbox', { name: 'Email Address' }).click();
    await page.getByRole('textbox', { name: 'Email Address' }).fill('rohit.patel2@ovo.com');
    await page.getByRole('textbox', { name: 'Password' }).click();

    await page.getByRole('textbox', { name: 'Password' }).fill('chairHONOR741!');
    await page.getByRole('button', { name: 'Log In' }).click();
    await page.getByRole('link', { name: 'Collaborate/ Communicate' }).click();
    await page.goto('https://apps.euw2.pure.cloud/directory/#/activity');

    await expect.poll(
        async () => {
            await page.getByRole('tab', { name: 'Dialpad' }).click();
            await page.getByRole('textbox', { name: 'Number or contact' }).click();
            await page.getByRole('textbox', { name: 'Number or contact' }).fill('443330341566');
            const svgElement = page.locator('gux-icon >> div.gux-icon-container >> svg');
            await page.locator("svgElement").click();
        },
        {
            timeout: 200000,
            intervals: [50000],
        },
    ).toBeTruthy();
});


test.only('test1', async ({ page }) => {

    await page.goto('https://login.euw2.pure.cloud/#/authenticate-adv/org/ovodev');
    await page.getByRole('textbox', { name: 'Email Address' }).click();
    await page.getByRole('textbox', { name: 'Email Address' }).fill('rohit.patel2@ovo.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('chairHONOR741!');
    await page.getByRole('button', { name: 'Log In' }).click();
    await page.getByRole('link', { name: 'Collaborate/ Communicate' }).click();
    await page.goto('https://apps.euw2.pure.cloud/directory/#/activity');
    await page.waitForLoadState('domcontentloaded');
    // await expect.poll(
    //     async () => {
            //await page.getByRole('link', { name: 'Calls Panel Toggle, Panel Is' }).waitFor({ state: "visible" });
            //await page.screenshot({ path: 'screenshot.png' });
            await page.getByRole('link', { name: 'Calls Panel Toggle, Panel Is' }).click();
            await page.waitForLoadState('load');
            //  await expect(page.getByRole('tab', { name: 'Dialpad' })).toBeVisible();
            await page.getByRole('tab', { name: 'Dialpad' }).waitFor({ state: "visible" });

    //     },
    //     {
    //         timeout: 200000,
    //         intervals: [50000],
    //     },
    // ).toBeTruthy();
    await page.getByRole('tab', { name: 'Dialpad' }).click();
    await page.getByRole('textbox', { name: 'Number or contact' }).click();
    await page.getByRole('textbox', { name: 'Number or contact' }).fill('44333034566');
    await page.locator("css=div.target-dropdown.no-header.ember-view").dispatchEvent("blur");
    //await page.getByRole('textbox', { name: 'Number or contact' }).dispatchEvent('blur');

    //await page.getByRole('textbox', { name: 'Number or contact' }).click();
    //await expect(page.locator('#ember3055').getByRole('button', { name: 'Start a new call' })).toBeVisible();
    //div.dialpad-numbers-container.responsive-dial-pad + button
    ////*[local-name()='svg']
    //const enableButton = await page.locator('css =div.dialpad-numbers-container.responsive-dial-pad + button.dialpad-number.make-call');
    //await expect(enableButton).toBeVisible();

    //const shadowHostLocator = page.locator('css =div.dialpad-numbers-container.responsive-dial-pad + button.dialpad-number.make-call').locator('GUX-ICON[icon-name="phone"]');
    //const svgLocator = shadowHostLocator.locator('.gux-icon-container').locator('svg');
    // const svgPathLocator = page.locator(
    //     'div.dialpad-numbers-container.responsive-dial-pad + button.dialpad-number.make-call ' +
    //     'GUX-ICON[icon-name="phone"] .gux-icon-container svg path' // Added ' path' at the end
    // );
    await page.waitForLoadState('domcontentloaded');
    await page.waitForLoadState('load');
    const button = await page.locator("css=button.dialpad-number.make-call:not([disabled])");
    await button.click();
    // const parentLocator = page.locator('div.dialpad-numbers-container.responsive-dial-pad + button.dialpad-number.make-call');
    // await parentLocator.waitFor({ state: "attached" });
    // const guxIconLocator = parentLocator.locator('GUX-ICON[icon-name="phone"]');
    // const iconContainerLocator = guxIconLocator.locator('.gux-icon-container');
    // const svgPathLocator = iconContainerLocator.locator('svg path');
    // await page.waitForSelector('svgPathLocator');
    // await page.screenshot({ path: 'screenshot.png' });
    // await svgPathLocator.waitFor({ state: "visible" });
    // await page.screenshot({ path: 'screenshot.png' });
    // // Targeting th

    // await expect.poll(
    //     async () => {
    // await parentLocator.hover();
    // await parentLocator.click();
    // await expect(parentLocator).toBeVisible();
    // await svgPathLocator.hover();
    // await svgPathLocator.click();
    // await expect(svgPathLocator).toBeVisible();
    // //     }, {
    //     timeout: 200000,
    //     intervals: [50000],
    // },
    // ).toBeTruthy();


    //   await page.locator('#ember3055').getByRole('button', { name: 'Start a new call' }).click();
    //   await expect(page.getByRole('button', { name: 'Profile panel, Available' })).toBeVisible();
    //   await page.getByRole('button', { name: 'Profile panel, Available' }).click();
    //   await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();
    //   await page.getByRole('button', { name: 'Logout' }).click();

});



test('test2', async ({ page }) => {
    await page.goto('https://login.euw2.pure.cloud/#/authenticate-adv/org/ovodev');
    await page.getByRole('textbox', { name: 'Email Address' }).click();
    await page.getByRole('textbox', { name: 'Email Address' }).fill('rohit.patel2@ovo.com');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('chairHONOR741!');
    await page.getByRole('button', { name: 'Log In' }).click();
    await page.getByRole('link', { name: 'Collaborate/ Communicate' }).click();
    await page.goto('https://apps.euw2.pure.cloud/directory/#/activity');
    await page.getByRole('link', { name: 'Interactions Panel Toggle,' }).click();

    await page.waitForLoadState('domcontentloaded');
    await page.getByRole('button', { name: 'Start a conversation' }).click();

    await page.waitForLoadState('domcontentloaded');

    await page.getByRole('textbox', { name: 'On behalf of queue' }).fill('PHONE_OVO_AccMgmt_Squad2');
    await page.getByRole('textbox', { name: 'On behalf of queue' }).dispatchEvent('blur');

    await page.getByRole('textbox', { name: 'Number or contact' }).fill('443330341566');
    // await page.getByRole('textbox', { name: 'Number or contact' }).dispatchEvent('keydown', {key:'Escape'});
    await page.locator('css=div.dialpad-dialog.dialpad-dropdown.add-participants').click();
    await page.waitForLoadState('load');
    //await page.getByRole('textbox', { name: 'Number or contact' }).dispatchEvent('blur');
    //await page.getByRole('textbox', { name: 'Number or contact' }).dispatchEvent('change');

    //await page.getByRole('textbox', { name: 'Number or contact' }).press('Enter');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForLoadState('load');
    //await page.pause();
    // const button = await page.getByRole('button', { name: 'Start a new call' });
    // await button.waitFor({ state: 'visible', timeout: 50000 })
    const button = await page.locator("css=button.dialpad-number.make-call:not([disabled])");
    //await page.getByRole('button', { name: 'Start a new call' }).click();
    await page.waitForLoadState('domcontentloaded');
    await button.click();
    await page.getByRole('button', { name: 'End Call' }).click();
});

