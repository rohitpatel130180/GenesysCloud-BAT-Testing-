import { Page, expect } from "@playwright/test";
import { toppingUp_Data, didYouGetHelpYouNeedSection_Data } from "../../../test-data/pay_as_you_go_intent_data/topping_up_data.ts";
import { WebChatUtils } from "../webchat-utils.ts";
import { PayAsYouGoSelectors } from "./pay_as_you_go_utils.ts";
import { payAsYouGo_endpoints, common_endpoits } from "../../../test-data/intent_endpoint_messages_data/intent_endpoint.ts";


export class ToppingUpSelectors {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    getIHaveFinished() {
        return this.page.locator('iframe[name="MessengerFrame"]').contentFrame().getByRole('button', { name: 'I\'ve finished. - Click to' });
    }
    getINeedMoreHelp() {
        return this.page.locator('iframe[name="MessengerFrame"]').contentFrame().getByRole('button', { name: 'I need more help. - Click to' });
    }
    getIssueWithApp() {
        return this.page.locator('iframe[name="MessengerFrame"]').contentFrame().getByRole('button', { name: 'Issue with app. - Click to' });
    }
    getDontHaveFunds() {
        return this.page.locator('iframe[name="MessengerFrame"]').contentFrame().getByRole('button', { name: 'Don\'t have funds. - Click to' });
    }
    getINeedMoreTime() {
        return this.page.locator('iframe[name="MessengerFrame"]').contentFrame().getByRole('button', { name: 'I need more time. - Click to' });
    }
    getIMStuck() {
        return this.page.locator('iframe[name="MessengerFrame"]').contentFrame().getByRole('button', { name: '\'m stuck. - Click to reply' });
    }
}

export class ToppingUpUtils {
    private readonly page: Page;
    readonly payAsYouGoSelectors: PayAsYouGoSelectors;
    readonly webChatUtils: WebChatUtils
    readonly toppingUpSelectors: ToppingUpSelectors;

    constructor(page: Page) {
        this.page = page;
        this.payAsYouGoSelectors = new PayAsYouGoSelectors(page);
        this.webChatUtils = new WebChatUtils(page);
        this.toppingUpSelectors = new ToppingUpSelectors(page);
    }

    async toppingUpJourney() {
        await this.payAsYouGoSelectors.getToppingUpOption().click();
        expect(await this.webChatUtils.verifyChatBotYouSaidResponse()).toBe("Topping up");
    }

    async areYouUnableToTopUpNoJourney() {
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(toppingUp_Data[0]["QUE-Are You unable to top up?"]);
        await this.webChatUtils.sendMessage("random text");
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(toppingUp_Data[0]["MSG-Sorry Say Yes or NO to top up question"]);
        await this.webChatUtils.userClickNoButton();
        expect(await this.webChatUtils.verifyChatBotYouSaidResponse()).toBe("No");
    }
    async areYouUnableToTopUpYesJourney() {
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(toppingUp_Data[0]["QUE-Are You unable to top up?"]);
        await this.webChatUtils.sendMessage("random text");
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(toppingUp_Data[0]["MSG-Sorry Say Yes or NO to top up question"]);
        await this.webChatUtils.userClickYesButton();
        expect(await this.webChatUtils.verifyChatBotYouSaidResponse()).toBe("Yes");
    }
    async doYouHaveASmartMeterNoJourney() {
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(toppingUp_Data[0]["QUE-Do you have a smart meter?"]);
        await this.webChatUtils.sendMessage("random text");
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(toppingUp_Data[0]["MSG-Sorry Say Yes or NO to smart meter question"]);
        await this.webChatUtils.userClickNoButton();
        expect(await this.webChatUtils.verifyChatBotYouSaidResponse()).toBe("No");
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(toppingUp_Data[0]["MSG-Top Up Instructions"]);
    }
    async doYouHaveASmartMeterYesJourney() {
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(toppingUp_Data[0]["QUE-Do you have a smart meter?"]);
        await this.webChatUtils.sendMessage("random text");
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(toppingUp_Data[0]["MSG-Sorry Say Yes or NO to smart meter question"]);
        await this.webChatUtils.userClickYesButton();
        expect(await this.webChatUtils.verifyChatBotYouSaidResponse()).toBe("Yes");
    }
    ///////////////////////////// Below methods are for second section of Topping Up Journey where user got question "Did you get the help you needed?" /////////////////////////////
    async didYouGetTheHelpYouNeededNoJourney() {
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(didYouGetHelpYouNeedSection_Data[0]["QUE-Did you get the help you need?"]);
        await this.webChatUtils.sendMessage("random text");
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(didYouGetHelpYouNeedSection_Data[0]["MSG-Sorry Say Yes or NO to want to proceed"]);
        await this.webChatUtils.userClickNoButton();
        expect(await this.webChatUtils.verifyChatBotYouSaidResponse()).toBe("No");
    }
    async didYouGetTheHelpYouNeededYesJourney() {
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(didYouGetHelpYouNeedSection_Data[0]["QUE-Did you get the help you need?"]);
        await this.webChatUtils.sendMessage("random text");
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(didYouGetHelpYouNeedSection_Data[0]["MSG-Sorry Say Yes or NO to want to proceed"]);
        await this.webChatUtils.userClickYesButton();
        expect(await this.webChatUtils.verifyChatBotYouSaidResponse()).toBe("Yes");

    }
    async isThereAnythingElseICanHelpYouWithNoJourney() {
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(didYouGetHelpYouNeedSection_Data[0]["QUE-Is there anything else I can help?"]);
        await this.webChatUtils.sendMessage("random text");
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(didYouGetHelpYouNeedSection_Data[0]["MSG-Sorry Say Yes or NO to want to proceed"]);
        await this.webChatUtils.userClickNoButton();
        expect(await this.webChatUtils.verifyChatBotYouSaidResponse()).toBe("No");
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(payAsYouGo_endpoints[0]["BOT_Survey"]);
    }
    async isThereAnythingElseICanHelpYouWithYesJourney() {
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(didYouGetHelpYouNeedSection_Data[0]["QUE-Is there anything else I can help?"]);
        await this.webChatUtils.sendMessage("random text");
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(didYouGetHelpYouNeedSection_Data[0]["MSG-Sorry Say Yes or NO to want to proceed"]);
        await this.webChatUtils.userClickYesButton();
        expect(await this.webChatUtils.verifyChatBotYouSaidResponse()).toBe("Yes");
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(common_endpoits[0]["FAQ_Bot_Intent_Recognition"]);
    }
    async doYouWantToChatAnAdvisorNoJourney() {
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(didYouGetHelpYouNeedSection_Data[0]["QUE-Do you want to chat?"]);
        await this.webChatUtils.sendMessage("random text");
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(didYouGetHelpYouNeedSection_Data[0]["MSG-Sorry Say Yes or NO to want to proceed"]);
        await this.webChatUtils.userClickNoButton();
        expect(await this.webChatUtils.verifyChatBotYouSaidResponse()).toBe("No");
    }
    async doYouWantToChatAnAdvisorYesJourney() {
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(didYouGetHelpYouNeedSection_Data[0]["QUE-Do you want to chat?"]);
        await this.webChatUtils.sendMessage("random text");
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(didYouGetHelpYouNeedSection_Data[0]["MSG-Sorry Say Yes or NO to want to proceed"]);
        await this.webChatUtils.userClickYesButton();
        expect(await this.webChatUtils.verifyChatBotYouSaidResponse()).toBe("Yes");

    }
    async smartMeterNoJourney_DidYouGetTheHelpNeededSection() {
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(didYouGetHelpYouNeedSection_Data[0]["QUE-Do you have a smart meter?"]);
        await this.webChatUtils.sendMessage("random text");
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(didYouGetHelpYouNeedSection_Data[0]["MSG-Sorry Say Yes or NO to want to proceed"]);
        await this.webChatUtils.userClickNoButton();
        expect(await this.webChatUtils.verifyChatBotYouSaidResponse()).toBe("No");
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(payAsYouGo_endpoints[0]["Connect_To_PAYG_Orion_TRAD_Team_Msg1"]);
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(payAsYouGo_endpoints[0]["Connect_To_PAYG_Orion_TRAD_Team_Msg2"]);
    }
    async smartMeterYesJourney_DidYouGetTheHelpNeededSection() {
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(didYouGetHelpYouNeedSection_Data[0]["QUE-Do you have a smart meter?"]);
        await this.webChatUtils.sendMessage("random text");
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(didYouGetHelpYouNeedSection_Data[0]["MSG-Sorry Say Yes or NO to want to proceed"]);
        await this.webChatUtils.userClickYesButton();
        expect(await this.webChatUtils.verifyChatBotYouSaidResponse()).toBe("Yes");
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(payAsYouGo_endpoints[0]["Connect_To_PAYG_Team_Msg1"]);
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(payAsYouGo_endpoints[0]["Connect_To_PAYG_Team_Msg2"]);
    }
    async doYouHaveAnotherPayGoQuestionNoJourney() {
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(didYouGetHelpYouNeedSection_Data[0]["QUE-Do you have another PayGo Question?"]);
        await this.webChatUtils.sendMessage("random text");
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(didYouGetHelpYouNeedSection_Data[0]["MSG-Sorry Say Yes or NO to want to proceed"]);
        await this.webChatUtils.userClickNoButton();
        expect(await this.webChatUtils.verifyChatBotYouSaidResponse()).toBe("No");
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(common_endpoits[0]["FAQ_Bot_Intent_Recognition"]);

    }
    async doYouHaveAnotherPayGoQuestionYesJourney() {
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(didYouGetHelpYouNeedSection_Data[0]["QUE-Do you have another PayGo Question?"]);
        await this.webChatUtils.sendMessage("random text");
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(didYouGetHelpYouNeedSection_Data[0]["MSG-Sorry Say Yes or NO to want to proceed"]);
        await this.webChatUtils.userClickYesButton();
        expect(await this.webChatUtils.verifyChatBotYouSaidResponse()).toBe("Yes");
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(payAsYouGo_endpoints[0]["Pay_As_You_Go_Intent"]);
    }

    //////////////////////////////// End of Methods for second section of Topping Up Journey where user got question "Did you get the help you needed?" ////////////////////////////////
    async areYouUnsureHowToTopUpNoJourney() {
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(toppingUp_Data[0]["QUE-Are you unsure how to top up on App?"]);
        await this.webChatUtils.sendMessage("random text");
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(toppingUp_Data[0]["MSG-Sorry Say Yes or NO to unsure how to top up on App question"]);
        await this.webChatUtils.userClickNoButton();
        expect(await this.webChatUtils.verifyChatBotYouSaidResponse()).toBe("No");
    }
    async areYouUnsureHowToTopUpYesJourney() {
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(toppingUp_Data[0]["QUE-Are you unsure how to top up on App?"]);
        await this.webChatUtils.sendMessage("random text");
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(toppingUp_Data[0]["MSG-Sorry Say Yes or NO to unsure how to top up on App question"]);
        await this.webChatUtils.userClickYesButton();
        expect(await this.webChatUtils.verifyChatBotYouSaidResponse()).toBe("Yes");
    }
    async doYouNeedHelpAddingTopupNoJourney() {
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(toppingUp_Data[0]["QUE-Do you need help adding a top up?"]);
        await this.webChatUtils.sendMessage("random text");
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(toppingUp_Data[0]["MSG-Sorry Say Yes or NO to topped up the meter question"]);
        await this.webChatUtils.userClickNoButton();
        expect(await this.webChatUtils.verifyChatBotYouSaidResponse()).toBe("No");
    }
    async doYouNeedHelpAddingTopupYesJourney() {
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(toppingUp_Data[0]["QUE-Do you need help adding a top up?"]);
        await this.webChatUtils.sendMessage("random text");
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(toppingUp_Data[0]["MSG-Sorry Say Yes or NO to topped up the meter question"]);
        await this.webChatUtils.userClickYesButton();
        expect(await this.webChatUtils.verifyChatBotYouSaidResponse()).toBe("Yes");
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(toppingUp_Data[0]["MSG-You can add the credit yourself manually"]);
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(toppingUp_Data[0]["MSG-Take your time to follow the instructions"]);
        expect(await this.toppingUpSelectors.getIHaveFinished().isVisible()).toBeTruthy();
        expect(await this.toppingUpSelectors.getINeedMoreHelp().isVisible()).toBeTruthy();


    }
    async IHaveFinishedJourney() {
        await this.webChatUtils.sendMessage("random text");
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(toppingUp_Data[0]["MSG-Sorry, Oops, Pls Select I have finished or I need more help"]);
        await this.toppingUpSelectors.getIHaveFinished().click();
        expect(await this.webChatUtils.verifyChatBotYouSaidResponse()).toBe("I've finished");
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(didYouGetHelpYouNeedSection_Data[0]["QUE-Did you get the help you need?"]);
    }
    async INeedMoreHelpJourney() {
        await this.webChatUtils.sendMessage("random text");
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(toppingUp_Data[0]["MSG-Sorry, Oops, Pls Select I have finished or I need more help"]);
        await this.toppingUpSelectors.getINeedMoreHelp().click();
        expect(await this.webChatUtils.verifyChatBotYouSaidResponse()).toBe("I need more help");
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(toppingUp_Data[0]["MSG-Let's connect you to someone"]);
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(payAsYouGo_endpoints[0]["Connect_To_PAYG_Team_Msg1"]);
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(payAsYouGo_endpoints[0]["Connect_To_PAYG_Team_Msg2"]);
    }
    async haveYouToppedUpNoJourney() {
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(toppingUp_Data[0]["QUE-Have you topped up the meter?"]);
        await this.webChatUtils.sendMessage("random text");
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(toppingUp_Data[0]["MSG-Sorry,Oops,Didin't catch that."]);
        await this.webChatUtils.userClickNoButton();
        expect(await this.webChatUtils.verifyChatBotYouSaidResponse()).toBe("No");
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(toppingUp_Data[0]["MSG-Check out our most common asked PAYGO questions"]);
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(didYouGetHelpYouNeedSection_Data[0]["QUE-Did you get the help you need?"]);
    }
    async haveYouToppedUpYesJourney() {
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(toppingUp_Data[0]["QUE-Have you topped up the meter?"]);
        await this.webChatUtils.sendMessage("random text");
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(toppingUp_Data[0]["MSG-Sorry,Oops,Didin't catch that."]);
        await this.webChatUtils.userClickYesButton();
        expect(await this.webChatUtils.verifyChatBotYouSaidResponse()).toBe("Yes");
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(toppingUp_Data[0]["MSG-You will need to re-enable supply"]);
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(didYouGetHelpYouNeedSection_Data[0]["QUE-Did you get the help you need?"]);
    }



}
