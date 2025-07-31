import { Page, expect } from "@playwright/test";
import { toppingUp_Data} from "../../../test-data/pay_as_you_go_intent_data/topping_up_data.ts";
import { WebChatUtils } from "../webchat-utils.ts";
import { PayAsYouGoSelectors } from "./pay_as_you_go_utils.ts";
import { payAsYouGo_endpoints } from "../../../test-data/intent_endpoint_messages_data/intent_endpoint.ts";


export class ToppingUpSelectors {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    getIssueWithApp() { }
    getDontHaveFunds() { }
    getIHaveFinished() { }
    getINeedMoreHelp() { }
    getINeedMoreTime() { }
    getIMStuck() { }
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
        expect(await this.webChatUtils.verifyChatBotYouSaidResponse()).toBe("Topping up")   ;
    }
    async areYouUnableToTopUpNoJourney(){
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
    async didYouGetTheHelpYouNeededNoJourney() {}
    async didYouGetTheHelpYouNeededYesJourney() {}
    async isThereAnythingElseICanHelpYouWithNoJourney() {}
    async isThereAnythingElseICanHelpYouWithYesJourney() {}
    async doYouWantToChatAnAdvisorNoJourney() {}
    async doYouWantToChatAnAdvisorYesJourney() {}
    async doYouHaveAnotherPayGoQuestionNoJourney() {}
    async doYouHaveAnotherPayGoQuestionYesJourney() {}



}
