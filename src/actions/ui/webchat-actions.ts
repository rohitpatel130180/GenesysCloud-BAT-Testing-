import { Page, expect } from '@playwright/test'
import { WebChatUtils } from '../../utils/ui/webchat-utils'
import { webChatTestData } from '../../test-data/web-chat';
const webChatData = webChatTestData[0];

export class WebChatActions {
    readonly webChatUtils: WebChatUtils;
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
        this.webChatUtils = new WebChatUtils(this.page);

    }
    /**
     * This method is used to initiate the web chat by navigating to the web chat URL, entering credentials, and loading the deployment.
     * It also verifies that the Open Messenger button is displayed and opens the web messenger.
     */
    async userInitiateWebchat() {
        await this.webChatUtils.goToWebChatUrl();
        await this.webChatUtils.enterWebChatCredentials();
        await this.webChatUtils.clickLoadDeploymentButton();
        // await this.page.waitForTimeout(3000);
        await this.webChatUtils.verifyOpenMessengerButton();
        // await this.page.waitForTimeout(3000);
        await this.webChatUtils.openWebMessenger();
    }
    /**
     * This method checks the current time and day to determine if the user is within business hours.
     * If within business hours, it verifies the greetings for opening hours; otherwise, it verifies the greetings for outside opening hours.
     */
    async checkIsUserWithinBusinessHours() {
        const now = new Date();
        const dayOfWeek = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
        const currentHour = now.getHours();
        let isBusinessHours = false;
        console.log(`Current Day: ${dayOfWeek}, Current Hour: ${currentHour}`);
        // Check for standard business hours // Check if it's a weekday (Monday to Friday)
        if (dayOfWeek >= 1 && dayOfWeek <= 5) {
            if (currentHour >= 8 && currentHour < 18) { // 8 AM to 5:59 PM (before 6 PM)
                isBusinessHours = true;
            }
        }
        // Check if it's Saturday
        else if (dayOfWeek === 6) {
            if (currentHour >= 9 && currentHour < 14) { // 9 AM to 1:59 PM (before 2 PM)
                isBusinessHours = true;
            }
        }
        return isBusinessHours;
    }
    async checkIsUserWithinPaygoBusinessHours() {
        const now = new Date();
        const dayOfWeek = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
        const currentHour = now.getHours();
        let isPaygoBusinessHours = false;
        console.log(`Current Day: ${dayOfWeek}, Current Hour: ${currentHour}`);
        //Check for Paygo business hours  // Check if it's a weekday (Monday to Friday)
        if (dayOfWeek >= 1 && dayOfWeek <= 5) {
            if (currentHour >= 8 && currentHour < 20) { // 8 AM to 7:59 PM (before 8 PM)
                isPaygoBusinessHours = true;
            }
        }
        // Check if it's Saturday
        else if (dayOfWeek === 6 || dayOfWeek === 7) {
            if (currentHour >= 9 && currentHour < 17) { // 9 AM to 4:59 PM (before 5 PM)
                isPaygoBusinessHours = true;
            }
        }
        return isPaygoBusinessHours;
    }
    async userVerifyGreetings() {
        const isBusinessHours = await this.checkIsUserWithinBusinessHours();
        const isPaygoBusinessHours = await this.checkIsUserWithinPaygoBusinessHours();
        /*const now = new Date();
        const dayOfWeek = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
        const currentHour = now.getHours();
        let isBusinessHours = false;
        let isSmartBusinessHours = false;
        console.log(`Current Day: ${dayOfWeek}, Current Hour: ${currentHour}`);
        // Check for standard business hours
        // Check if it's a weekday (Monday to Friday)
        if (dayOfWeek >= 1 && dayOfWeek <= 5) {
            if (currentHour >= 8 && currentHour < 18) { // 8 AM to 5:59 PM (before 6 PM)
                isBusinessHours = true;
            }
        }
        // Check if it's Saturday
        else if (dayOfWeek === 6) {
            if (currentHour >= 9 && currentHour < 14) { // 9 AM to 1:59 PM (before 2 PM)
                isBusinessHours = true;
            }
        }
        //Check for smart business hours
        // Check if it's a weekday (Monday to Friday)
        if (dayOfWeek >= 1 && dayOfWeek <= 5) {
            if (currentHour >= 8 && currentHour < 20) { // 8 AM to 7:59 PM (before 8 PM)
                isSmartBusinessHours = true;
            }
        }
        // Check if it's Saturday
        else if (dayOfWeek === 6 || dayOfWeek === 7) {
            if (currentHour >= 9 && currentHour < 17) { // 9 AM to 4:59 PM (before 5 PM)
                isSmartBusinessHours = true;
            }
        }
            */
        if (isBusinessHours) {
            await this.userVerifyGreetingsInBusinessHours();

        }
        else {
            await this.userVerifyGreetingsOutsideBusinessHours(isPaygoBusinessHours);
        }
    }
    /**
     * This method verifies the greetings displayed to the user when they are within business hours.
     * It checks the chatbot's responses for the initial greeting and the security questions prompt.
     */
    async userVerifyGreetingsInBusinessHours() {
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(("Hi there, I'm OVO's Digital assistant, I'm here to help you or point you in the right direction.").trim());
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(("We need to ask you some security questions so we can get you a response as quickly as possible.").trim());
    }
    /**
     * This method verifies the greetings displayed to the user when they are outside business hours.
     * It checks the chatbot's responses for the initial greeting and a specific question about Pay As You Go meters.
     */
    async userVerifyGreetingsOutsideBusinessHours(isPaygoBusinessHours: boolean) {
        console.log(`isPaygoBusinessHours: ${isPaygoBusinessHours}`);
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(("Hi there, I'm OVO's Digital assistant, I'm here to help you or point you in the right direction.").trim());
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(("Do you have a Pay As You Go meter that you top up to add credit?").trim());
        await this.webChatUtils.userClickYesButton();
        if (await this.webChatUtils.verifyChatBoatYouSaidResponse() === "Yes") {
            expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(("Do you have a smart meter?").trim());
            await this.webChatUtils.userClickYesButton();
            //if (await this.webChatUtils.verifyChatBoatYouSaidResponse() === "Yes" || await this.webChatUtils.verifyChatBoatYouSaidResponse() === "No") {
            if (isPaygoBusinessHours) {
                console.log("Inside Smart Business Hours");
                expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(("We need to ask you some security questions so we can get you a response as quickly as possible.").trim());
            }
            else {
                console.log("Outside Smart Business Hours");
                expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(("You've reached us outside of our opening hours (weekdays 8am to 8pm, Saturday and Sunday 9am to 5pm).Our support team aren't around right now, but I can help..").trim());
                expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(("We need to ask you some security questions so we can get you a response as quickly as possible.").trim());
            }
            //}
        }
        else {
            expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(("You've reached us outside of our opening hours (weekdays 8am to 6pm, Saturday 9am to 2pm).Our support team aren't around right now, but I can help..").trim());
            expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(("We need to ask you some security questions so we can get you a response as quickly as possible.").trim());
        }
    }
    /**
     * This method simulates a user interaction where they confirm they are an existing OVO customer
     * and provide their personal details such as first name, last name, email, account number, postcode, and date of birth.
     */
    async userExistingCustomerAndProvidePersonalDetails() {
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(("Are you an OVO customer?").trim());
        await this.webChatUtils.userClickYesButton();
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(("What is your first name?").trim());
        await this.webChatUtils.sendMessage(webChatData.firstName);
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(("What is your last name?").trim());
        await this.webChatUtils.sendMessage(webChatData.lastName);
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(("Please confirm the email address of your account. If you don't know your email address, enter #").trim());
        await this.webChatUtils.sendMessage(webChatData.email);
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(("Please confirm your account number. If you don't know your account number, enter #").trim());
        await this.webChatUtils.sendMessage(webChatData.accountNumber);
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(("Please confirm your postcode.").trim());
        await this.webChatUtils.sendMessage(webChatData.postCode);
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(("Please confirm your date of birth using DD-MM-YYYY format. For example, 01-05-1972.").trim());
        await this.webChatUtils.sendMessage(webChatData.dateOfBirth);
    }
    /**
     * This method simulates a user interaction where they confirm they are not an existing OVO customer
     * and provide their personal details such as first name, last name, and email.
     */
    async userNotExistingCustomerAndProvidePersonalDetails() {
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(("Are you an OVO customer?").trim());
        await this.webChatUtils.userClickNoButton();
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(("What is your first name?").trim());
        await this.webChatUtils.sendMessage(webChatData.firstName);
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(("What is your last name?").trim());
        await this.webChatUtils.sendMessage(webChatData.lastName);
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(("What is your email, so we can keep track of our chat? If you don't have an email, enter #").trim());
        await this.webChatUtils.sendMessage(webChatData.email);
    }
}

