import type { Page } from "@playwright/test"
import { expect } from "@playwright/test"
import { webChatTestData } from "../../test-data/web-chat";     
import exp from "constants";
 const webChatData = webChatTestData[0];
//GenesySiteSelectors class will identify selectors for login and logout
export class WebChatSelectors {
    private readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    getDeploymentId() {
        return this.page.getByRole('textbox', { name: 'Deployment ID' });
    }
    getEnvironmentName() {
        return this.page.getByLabel('Default select');
    }
    getLoadDeploymentButton() {
        return this.page.getByRole('button', { name: 'Load Deployment' });
    }
    getOpenMessengerButton() {
        return this.page.locator('iframe[name="MessengerLauncherFrame"]').contentFrame().getByRole('button', { name: 'Open Messenger' })
    }
    getFrameLocator() {
        return this.page.locator('iframe[name="MessengerFrame"]');
    }
    getMessengerFrame() {
        return this.page.locator('iframe[name="MessengerFrame"]').contentFrame();
        //return this.page.locator('iframe[name="MessengerFrame"]');
    }
    getChatBotMessageYouSaid() {
        return this.page.locator('iframe[name="MessengerFrame"]').contentFrame().locator('css=div.aria-name.cx-messenger-screen-reader[aria-label="You said"]+ p');
    }
    getChatbotMessagesRoboSaid() {

        return this.page.locator('iframe[name="MessengerFrame"]').contentFrame().locator('css=div.aria-name.cx-messenger-screen-reader[aria-label="Robot Friend said"]+ p');
        //return this.page.frameLocator('iframe[name="MessengerFrame"]').locator('css=div.aria-name.cx-messenger-screen-reader[aria-label="Robot Friend said"]+ p');
    }
    getYesButton() {
        return this.page.locator('iframe[name="MessengerFrame"]').contentFrame().getByRole('button', { name: 'Yes. - Click to reply with' });
    }
    getNoButton() {
        return this.page.locator('iframe[name="MessengerFrame"]').contentFrame().getByRole('button', { name: 'No. - Click to reply with' });
    }
    getSendMessage() {
        return this.page.locator('iframe[name="MessengerFrame"]').contentFrame().getByRole('textbox', { name: 'Send a message...' });
    }
    getSendMessageButton() {
        return this.page.locator('iframe[name="MessengerFrame"]').contentFrame().getByRole('button', { name: 'Send your message' });
    }


}

//GenesysSitesUtils class will be holding common utilities methods that can be used across test case

export class WebChatUtils {
    private readonly page: Page;
    readonly webChatSelectors: WebChatSelectors;
   
    constructor(page: Page) {
        this.page = page;
        this.webChatSelectors = new WebChatSelectors(this.page);
        
        // This locator targets the <p> tag inside the iframe using the direct contentFrame() approach

    }
    async goToWebChatUrl() {
        //await this.page.goto('https://messenger-tests.mit-nonprod.ovotech.org.uk/test-pages/wm-deployment-test.html');
        //const webChatData = webChatTestData[0];
        await this.page.goto(webChatData.url);
    }

    async enterWebChatCredentials() {
       // await this.webChatSelectors.getDeploymentId().fill("eca22cee-eb5c-4376-bc81-509a1fc07ae5");
           await this.webChatSelectors.getDeploymentId().fill(webChatData.deploymentId);          
    }
    async clickLoadDeploymentButton() {
        await this.webChatSelectors.getLoadDeploymentButton().click();
    }
    async verifyOpenMessengerButton() {
        await expect(this.webChatSelectors.getOpenMessengerButton()).toBeVisible();
    }
    async openWebMessenger() {
        await this.webChatSelectors.getOpenMessengerButton().click();
    }
    async verifyWebchatFrameOpen() {
        expect(this.webChatSelectors.getFrameLocator()).toBeVisible();
    }
    async sendMessage(msg: string) {
        await this.webChatSelectors.getSendMessage().fill(msg);       
        await this.webChatSelectors.getSendMessageButton().click();
        await this.webChatSelectors.getChatBotMessageYouSaid().last().waitFor({ state: 'visible' });
        //await this.page.waitForTimeout(2000);
    }
    //Do Not Delete below method as it is can be used in future
    /*async getChatbotRoboResponse() {
        await this.page.waitForTimeout(2000);        
        await expect(this.webChatSelectors.getChatbotMessagesRoboSaid().last()).toBeVisible({ timeout: 10000 });
        const LastMessageText = await this.webChatSelectors.getChatbotMessagesRoboSaid().last().textContent();
        console.log(LastMessageText);        
        return LastMessageText?.trim();

    }*/
    async getChatbotRoboResponse() {
        const messagesLocator = this.webChatSelectors.getChatbotMessagesRoboSaid();
        const beforeCount = await messagesLocator.count();
        // Wait for a new message to appear (polling)
        await expect.poll(async () => await messagesLocator.count(), {
            timeout: 5000,
            // intervals: [500, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000 , 11000, 12000, 13000, 14000, 15000, 16000, 17000, 18000, 19000, 20000]
            intervals: [500]
        }).toBeGreaterThan(beforeCount);

        // Now get the last message's text
        const lastMessage = messagesLocator.last();
        await expect(lastMessage).toBeVisible({ timeout: 5000 });
        const text = await lastMessage.textContent();
        console.log(text);
        return text?.trim();
    }

    // async verifyChatBotYouSaidResponse() {
    //     const replyMessage = await this.webChatSelectors.getChatBotMessageYouSaid().textContent();
    //     return replyMessage;
    // }
    async verifyChatBoatYouSaidResponse() {
        // const replyMessage = await this.webChatSelectors.getChatbotMessagesRoboSaid().textContent();
        // return replyMessage;
        const messagesLocator = this.webChatSelectors.getChatBotMessageYouSaid();
        const beforeCount = await messagesLocator.count();  
        // Wait for a new message to appear (polling)
        await expect.poll(async () => await messagesLocator.count(), {
            timeout: 5000,
            // intervals: [500, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000 , 11000, 12000, 13000, 14000, 15000, 16000, 17000, 18000, 19000, 20000]
            intervals: [500]
        }).toBeGreaterThan(beforeCount);
        // Now get the last message's text
        const lastMessage = messagesLocator.last();
        await expect(lastMessage).toBeVisible({ timeout: 5000 });   
        const text = await lastMessage.textContent();
        console.log(text);
        return text?.trim();
    }
    async userClickYesButton() {
        await this.webChatSelectors.getYesButton().waitFor({ state: 'visible' });
        await this.webChatSelectors.getYesButton().click();
    }
    async userClickNoButton() {
        await this.webChatSelectors.getNoButton().waitFor({ state: 'visible' });
        await this.webChatSelectors.getNoButton().click();
    }
    //Below methods are commented as they are transferred in Action page as action method
    /*async userVerifyGreetingsWithinOpeningHours() {
        expect(await this.getChatbotRoboResponse()).toBe(("Hi there, I'm OVO's Digital assistant, I'm here to help you or point you in the right direction.").trim());
        expect(await this.getChatbotRoboResponse()).toBe(("We need to ask you some security questions so we can get you a response as quickly as possible.").trim());
    }
    async userVerifyGreetingsOutsideOpeningHours() {
        expect(await this.getChatbotRoboResponse()).toBe(("Hi there, I'm OVO's Digital assistant, I'm here to help you or point you in the right direction.").trim());
        expect(await this.getChatbotRoboResponse()).toBe(("Do you have a Pay As You Go meter that you top up to add credit?").trim());
    }
    async userExistingCustomerAndProvidePersonalDetails() {
        expect(await this.getChatbotRoboResponse()).toBe(("Are you an OVO customer?").trim());
        await this.userClickYesButton();
        expect(await this.getChatbotRoboResponse()).toBe(("What is your first name?").trim());
        await this.sendMessage('Rohit');
        expect(await this.getChatbotRoboResponse()).toBe(("What is your last name?").trim());
        await this.sendMessage('Patel');
        expect(await this.getChatbotRoboResponse()).toBe(("Please confirm the email address of your account. If you don't know your email address, enter #").trim());
        await this.sendMessage('#');
        expect(await this.getChatbotRoboResponse()).toBe(("Please confirm your account number. If you don't know your account number, enter #").trim());
        await this.sendMessage('#');
        expect(await this.getChatbotRoboResponse()).toBe(("Please confirm your postcode.").trim());
        await this.sendMessage('ab1 4bc');
        expect(await this.getChatbotRoboResponse()).toBe(("Please confirm your date of birth using DD-MM-YYYY format. For example, 01-05-1972.").trim());
        await this.sendMessage('01-04-2000');
    }*/





}


