import { test, expect} from "../../src/fixtures/genesys-fixtures"
import { annotate } from '../../src/utils/shared/annotate';

test("Gnesys Login Logout Test", async ({ page }) => {
    
    annotate('Given I visit the Genesys') //await page.goto('https://login.euw2.pure.cloud/#/authenticate-adv/org/ovodev');
    await page.goto('https://login.euw2.pure.cloud/#/authenticate-adv/org/ovodev')
    annotate('When I enter valid username and password');
    await page.getByRole('textbox', { name: 'Email Address' }).fill('rohit.patel2@ovo.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('chairHONOR741!');
    annotate('And Click on Login Button');
    await page.getByRole('button', { name: 'Log In' }).click();
    annotate('Then I should have option for MyAccount');
    await expect(page.getByRole('link', { name: 'My Account My Account' })).toBeVisible();
    await page.getByRole('link', { name: ' Logout' }).click();

})


