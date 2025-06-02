import { test, expect } from "../../src/fixtures/genesys-fixtures"
import { annotate } from '../../src/utils/shared/annotate';

test("Bereavement Intennt", async ({ page, genesysSiteUtils, genesysSiteActions }) => {
    await page.goto('https://messenger-tests.mit-nonprod.ovotech.org.uk/test-pages/wm-deployment-test.html?deploymentId=eca22cee-eb5c-4376-bc81-509a1fc07ae5&env=prod-euw2');
    // await page.waitForTimeout(50000);
    //await page.waitForLoadState('networkidle');
    await page.waitForLoadState('domcontentloaded');
    const chatButton = await page.locator('iframe[name="MessengerLauncherFrame"]').contentFrame().getByRole('button', { name: 'Open Messenger' });
    //await page.waitForLoadState('networkidle');
    await chatButton.waitFor({ state:'visible'});
    await chatButton.click();
    const chatWindow = await page.frameLocator('iframe#genesys-mxg-container-frame');
    //await expect(chatWindow).toBeTruthy();
    await page.waitForLoadState('networkidle');
    
    //await chatWindow.waitFor({state:'visible'});
})




test.only('test', async ({ page }) => {
  await page.goto('https://messenger-tests.mit-nonprod.ovotech.org.uk/test-pages/wm-deployment-test.html');
  await page.getByRole('textbox', { name: 'Deployment ID' }).click();
  await page.getByRole('textbox', { name: 'Deployment ID' }).fill('eca22cee-eb5c-4376-bc81-509a1fc07ae5');
  await page.getByRole('button', { name: 'Load Deployment' }).click();
  await page.locator('iframe[name="MessengerLauncherFrame"]').contentFrame().getByRole('button', { name: 'Open Messenger' }).click();
  await page.locator('iframe[name="MessengerFrame"]').contentFrame().getByRole('button', { name: 'Yes. - Click to reply with' }).click();
   await page.waitForTimeout(2000)
  await page.locator('iframe[name="MessengerFrame"]').contentFrame().getByRole('textbox', { name: 'Send a message...' }).fill('I dont know');
  
  await page.locator('iframe[name="MessengerFrame"]').contentFrame().getByRole('button', { name: 'Send your message' }).click();
  await page.waitForTimeout(2000)
  await page.locator('iframe[name="MessengerFrame"]').contentFrame().getByRole('textbox', { name: 'Send a message...' }).fill('I have no idea');
  await page.locator('iframe[name="MessengerFrame"]').contentFrame().getByRole('button', { name: 'Send your message' }).click();
  await page.waitForTimeout(2000)
  await page.locator('iframe[name="MessengerFrame"]').contentFrame().getByRole('textbox', { name: 'Send a message...' }).fill('xyz@aob.com');
  await page.locator('iframe[name="MessengerFrame"]').contentFrame().getByRole('button', { name: 'Send your message' }).click();
 await page.waitForTimeout(2000)
  await page.locator('iframe[name="MessengerFrame"]').contentFrame().getByRole('textbox', { name: 'Send a message...' }).fill('#');
  await page.locator('iframe[name="MessengerFrame"]').contentFrame().getByRole('button', { name: 'Send your message' }).click();
  await page.waitForTimeout(2000)
  await page.locator('iframe[name="MessengerFrame"]').contentFrame().getByRole('textbox', { name: 'Send a message...' }).fill('df34rt');
  await page.locator('iframe[name="MessengerFrame"]').contentFrame().getByRole('button', { name: 'Send your message' }).click();
});
