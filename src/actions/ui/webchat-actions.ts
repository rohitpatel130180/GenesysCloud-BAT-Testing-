import { Page, expect } from '@playwright/test'
import { WebChatUtils } from '../../utils/ui/webchat-utils'
import { inHoursOpeningJourneyMsg, webChatTestData, existingCustomerData,nonCustomerData } from '../../test-data/web_chat_data';
const webChatData = webChatTestData[0];
const inHoursMessages = inHoursOpeningJourneyMsg[0];
const existingCustomer = existingCustomerData[0];
const nonCustomer = nonCustomerData[0];

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
        await this.webChatUtils.verifyOpenMessengerButton();
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
    async userNavigatesThroughPreIntentJourney() {
        const isBusinessHours = await this.checkIsUserWithinBusinessHours();
        const isPaygoBusinessHours = await this.checkIsUserWithinPaygoBusinessHours();
        if (isBusinessHours) {
            await this.userJourneyInBusinessHours();
        }
        else {
            await this.userJourneyOutsideBusinessHours(isPaygoBusinessHours);
        }
    }
    /**
     * This method verifies the greetings displayed to the user when they are within business hours.
     * It checks the chatbot's responses for the initial greeting and the security questions prompt.
     */
    async userJourneyInBusinessHours() {
        //expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(("Hello, I’m OVO’s digital assistant and I’m here to help.").trim());
        //expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(("I just need a few details first for security. Providing this will help me get you the right support quickly, whether it's self-serve you're after or connecting you with the right team").trim());
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe((inHoursMessages['HelloMessage']).trim());
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe((inHoursMessages['IJustNeedMessage']).trim());

    }
    /**
     * This method verifies the greetings displayed to the user when they are outside business hours.
     * It checks the chatbot's responses for the initial greeting and a specific question about Pay As You Go meters.
     */
    async userJourneyOutsideBusinessHours(isPaygoBusinessHours: boolean) {
        console.log(`isPaygoBusinessHours: ${isPaygoBusinessHours}`);
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(("Hi there, I'm OVO's Digital assistant, I'm here to help you or point you in the right direction.").trim());
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(("Do you have a Pay As You Go meter that you top up to add credit?").trim());
        await this.webChatUtils.userClickYesButton();
        if (await this.webChatUtils.verifyChatBotYouSaidResponse() === "Yes") {
            expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(("Do you have a smart meter?").trim());
            await this.webChatUtils.userClickYesButton();
            //if (await this.webChatUtils.verifyChatBoatYouSaidResponse() === "Yes" || await this.webChatUtils.verifyChatBoatYouSaidResponse() === "No") {
            if (isPaygoBusinessHours) {
                console.log("Inside Paygo Business Hours");
                expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(("We need to ask you some security questions so we can get you a response as quickly as possible.").trim());
            }
            else {
                console.log("Outside Paygo Business Hours");
                expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(("You've reached us outside of our opening hours (weekdays 8am to 8pm, Saturday and Sunday 9am to 5pm).Our support team aren't around right now, but I can help..").trim());
                expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(("We need to ask you some security questions so we can get you a response as quickly as possible.").trim());
            }
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
        await this.webChatUtils.sendMessage(existingCustomer.firstName);
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(("What is your last name?").trim());
        await this.webChatUtils.sendMessage(existingCustomer.lastName);
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(("Please confirm the email address of your account. If you don't know your email address, enter #").trim());
        await this.webChatUtils.sendMessage(existingCustomer.email);
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(("Please confirm your account number. If you don't know your account number, enter #").trim());
        await this.webChatUtils.sendMessage(existingCustomer.accountNumber);
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(("Please confirm your postcode.").trim());
        await this.webChatUtils.sendMessage(existingCustomer.postCode);
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(("Please confirm your date of birth using DD-MM-YYYY format. For example, 01-05-1972.").trim());
        await this.webChatUtils.sendMessage(existingCustomer.dateOfBirth);
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe("Please tell me what type of query you have so I can help you find the right information, e.g. billing query, my online account, meter readings");
    }
    /**
     * This method simulates a user interaction where they confirm they are not an existing OVO customer
     * and provide their personal details such as first name, last name, and email.
     */
    async userNotExistingCustomerAndProvidePersonalDetails() {
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(("Are you an OVO customer?").trim());
        await this.webChatUtils.userClickNoButton();
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(("What is your first name?").trim());
        await this.webChatUtils.sendMessage(nonCustomer.firstName);
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(("What is your last name?").trim());
        await this.webChatUtils.sendMessage(nonCustomer.lastName);
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(("What is your email, so we can keep track of our chat? If you don't have an email, enter #").trim());
        await this.webChatUtils.sendMessage(nonCustomer.email);
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe("Please tell me what type of query you have so I can help you find the right information, e.g. billing query, my online account, meter readings");
    }

    async preIntent_1_1() {
        await this.userInitiateWebchat();
        await this.userJourneyInBusinessHours();
        await this.userExistingCustomerAndProvidePersonalDetails();

    }
    async preIntent_1_2() {
        await this.userInitiateWebchat();
        await this.userJourneyInBusinessHours();
        await this.userNotExistingCustomerAndProvidePersonalDetails();

    }
    async preIntent_2_1() {
        await this.userInitiateWebchat();
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(("Hello, I’m OVO’s digital assistant and I can help point you in the right direction.").trim());
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(("Do you have a Pay As You Go meter that you top up?").trim());
        await this.webChatUtils.userClickYesButton();
        expect(await this.webChatUtils.verifyChatBotYouSaidResponse()).toBe("Yes");
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(("Do you have a smart meter?").trim());
        await this.webChatUtils.userClickYesButton();
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(("We need to ask you some security questions so we can get you a response as quickly as possible.").trim());
        await this.userExistingCustomerAndProvidePersonalDetails();
    }
    async preIntent_2_2() {
        await this.userInitiateWebchat();
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(("Hello, I’m OVO’s digital assistant and I can help point you in the right directin.").trim());
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(("Do you have a Pay As You Go meter that you top up to add credit?").trim());
        await this.webChatUtils.userClickYesButton();
        expect(await this.webChatUtils.verifyChatBotYouSaidResponse()).toBe("Yes");
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(("Do you have a smart meter?").trim());
        await this.webChatUtils.userClickYesButton();
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(("We need to ask you some security questions so we can get you a response as quickly as possible.").trim());
        await this.userNotExistingCustomerAndProvidePersonalDetails();
    }
    async preIntent_2_3() {
        await this.userInitiateWebchat();
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(("Hello, I’m OVO’s digital assistant and I can help point you in the right directin.").trim());
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(("Do you have a Pay As You Go meter that you top up to add credit?").trim());
        await this.webChatUtils.userClickYesButton();
        expect(await this.webChatUtils.verifyChatBotYouSaidResponse()).toBe("Yes");
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(("Do you have a smart meter?").trim());
        await this.webChatUtils.userClickYesButton();
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(("You've reached us outside of our opening hours (weekdays 8am to 8pm, Saturday and Sunday 9am to 5pm).Our support team aren't around right now, but I can help..").trim());
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(("We need to ask you some security questions so we can get you a response as quickly as possible.").trim());
        await this.userExistingCustomerAndProvidePersonalDetails();
    }
    async preIntent_2_4() {
        await this.userInitiateWebchat();
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(("Hello, I’m OVO’s digital assistant and I can help point you in the right directin.").trim());
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(("Do you have a Pay As You Go meter that you top up to add credit?").trim());
        await this.webChatUtils.userClickYesButton();
        expect(await this.webChatUtils.verifyChatBotYouSaidResponse()).toBe("Yes");
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(("Do you have a smart meter?").trim());
        await this.webChatUtils.userClickYesButton();
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(("You've reached us outside of our opening hours (weekdays 8am to 8pm, Saturday and Sunday 9am to 5pm).Our support team aren't around right now, but I can help..").trim());
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(("We need to ask you some security questions so we can get you a response as quickly as possible.").trim());
        await this.userNotExistingCustomerAndProvidePersonalDetails();
    }
    async preIntent_2_5() {
        await this.userInitiateWebchat();
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(("Hello, I’m OVO’s digital assistant and I can help point you in the right directin.").trim());
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(("Do you have a Pay As You Go meter that you top up to add credit?").trim());
        await this.webChatUtils.userClickNoButton();
        expect(await this.webChatUtils.verifyChatBotYouSaidResponse()).toBe("No");
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(("You've reached us outside of our opening hours (weekdays 8am to 6pm, Saturday 9am to 2pm).Our support team aren't around right now, but I can help..").trim());
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(("We need to ask you some security questions so we can get you a response as quickly as possible.").trim());
        await this.userExistingCustomerAndProvidePersonalDetails();
    }
    async preIntent_2_6() {
        await this.userInitiateWebchat();
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(("Hello, I’m OVO’s digital assistant and I can help point you in the right directin.").trim());
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(("Do you have a Pay As You Go meter that you top up to add credit?").trim());
        await this.webChatUtils.userClickNoButton();
        expect(await this.webChatUtils.verifyChatBotYouSaidResponse()).toBe("No");
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(("You've reached us outside of our opening hours (weekdays 8am to 6pm, Saturday 9am to 2pm).Our support team aren't around right now, but I can help..").trim());
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(("We need to ask you some security questions so we can get you a response as quickly as possible.").trim());
        await this.userNotExistingCustomerAndProvidePersonalDetails();
    }



}


