import { Page, expect } from "@playwright/test";
import { meterKeyOrCardJourney_Data } from "../../../test-data/pay_as_you_go_intent_data/meter_key_or_card_data.ts";
import { WebChatUtils } from "../webchat-utils";
import { PayAsYouGoSelectors } from "./pay_as_you_go_utils";
import { payAsYouGo_endpoints } from "../../../test-data/intent_endpoint_messages_data/intent_endpoint.ts";


export class MeterKeyOrCardSelectors {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    getLostGasCardOption() {
        return this.page.locator('iframe[name="MessengerFrame"]').contentFrame().getByRole('button', { name: 'Lost Gas Card. - Click to' });
    }
    getLostElectricKeyOption() {
        return this.page.locator('iframe[name="MessengerFrame"]').contentFrame().getByRole('button', { name: 'Lost Electric Key. - Click to' });
    }
    getErrorCodeOption() {
        return this.page.locator('iframe[name="MessengerFrame"]').contentFrame().getByRole('button', { name: 'Error Code. - Click to reply' });
    }
}

export class MeterKeyOrCardUtils {
    private readonly page: Page;
    readonly payAsYouGoSelectors: PayAsYouGoSelectors;
    readonly webChatUtils: WebChatUtils
    readonly meterKeyOrCardSelectors: MeterKeyOrCardSelectors;

    constructor(page: Page) {
        this.page = page;
        this.payAsYouGoSelectors = new PayAsYouGoSelectors(page);
        this.webChatUtils = new WebChatUtils(page);
        this.meterKeyOrCardSelectors = new MeterKeyOrCardSelectors(page);
    }

    async meterKeyOrCardJourney() {
        await this.payAsYouGoSelectors.getMeterKeyOrCardOption().click();
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(meterKeyOrCardJourney_Data[0]["MSG-Please select from the following options:"]);
        expect(await this.meterKeyOrCardSelectors.getLostGasCardOption().isVisible()).toBeTruthy();
        expect(await this.meterKeyOrCardSelectors.getLostElectricKeyOption().isVisible()).toBeTruthy();
        expect(await this.meterKeyOrCardSelectors.getErrorCodeOption().isVisible()).toBeTruthy();
        await this.webChatUtils.sendMessage("random text");
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(meterKeyOrCardJourney_Data[0]["MSG-Sorry. Please select from the following options:"]);
        /* await expect(page.locator('iframe[name="MessengerFrame"]').contentFrame().getByRole('button', { name: 'Lost Gas Card. - Click to' })).toBeVisible();
         await expect(page.locator('iframe[name="MessengerFrame"]').contentFrame().getByRole('button', { name: 'Lost Electric Key. - Click to' })).toBeVisible();
         await expect(page.locator('iframe[name="MessengerFrame"]').contentFrame().getByRole('button', { name: 'Error Code. - Click to reply' })).toBeVisible();
         */

    }
    async userSelectLostGasCard() {
        await this.meterKeyOrCardSelectors.getLostGasCardOption().click();
        expect(await this.webChatUtils.verifyChatBotYouSaidResponse()).toBe("Lost Gas Card");

    }
    async userSelectLostElectricKey() {
        await this.meterKeyOrCardSelectors.getLostElectricKeyOption().click();
        expect(await this.webChatUtils.verifyChatBotYouSaidResponse()).toBe("Lost Electric Key");

    }
    async userSelectErrorCode() {
        await this.meterKeyOrCardSelectors.getErrorCodeOption().click();
        expect(await this.webChatUtils.verifyChatBotYouSaidResponse()).toBe("Error Code");

    }
    async areYouOffTheSupplyNoJourney() {
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(meterKeyOrCardJourney_Data[0]["QUE-Are you off supply?"]);
        await this.webChatUtils.sendMessage("random text");
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(meterKeyOrCardJourney_Data[0]["MSG-Sorry. Say yes or no for  off supply "]);
        await this.webChatUtils.userClickNoButton();
        expect(await this.webChatUtils.verifyChatBotYouSaidResponse()).toBe("No");
    }
    async areYouOffTheSupplyYesJourney() {
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(meterKeyOrCardJourney_Data[0]["QUE-Are you off supply?"]);
        await this.webChatUtils.sendMessage("random text");
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(meterKeyOrCardJourney_Data[0]["MSG-Sorry. Say yes or no for  off supply "]);
        await this.webChatUtils.userClickYesButton();
        expect(await this.webChatUtils.verifyChatBotYouSaidResponse()).toBe("Yes");
    }
    async ableToPickUpNewKeyCardNoJourney() {
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(meterKeyOrCardJourney_Data[0]["QUE-AreYouOrSomeoneAbleToPickUpNewKeyCard?"]);
        await this.webChatUtils.sendMessage("random text");
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(meterKeyOrCardJourney_Data[0]["MSG-Sorry. Say yes or no for Pick Up"]);
        await this.webChatUtils.userClickNoButton();
        expect(await this.webChatUtils.verifyChatBotYouSaidResponse()).toBe("No");
    }
    async ableToPickUpNewKeyCardNoJourney_OffSupplyYes() {
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(meterKeyOrCardJourney_Data[0]["QUE-AreYouOrSomeoneAbleToPickUpNewKeyCard?"]);
        await this.webChatUtils.sendMessage("random text");
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(meterKeyOrCardJourney_Data[0]["MSG-Sorry. Say yes or no for Pick Up"]);
        await this.webChatUtils.userClickNoButton();
        expect(await this.webChatUtils.verifyChatBotYouSaidResponse()).toBe("No");
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(meterKeyOrCardJourney_Data[0]["MSG-Let's connect"]);

    }
    async ableToPickUpNewKeyCardYesJourney() {
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(meterKeyOrCardJourney_Data[0]["QUE-AreYouOrSomeoneAbleToPickUpNewKeyCard?"]);
        await this.webChatUtils.sendMessage("random text");
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(meterKeyOrCardJourney_Data[0]["MSG-Sorry. Say yes or no for Pick Up"]);
        await this.webChatUtils.userClickYesButton();
        expect(await this.webChatUtils.verifyChatBotYouSaidResponse()).toBe("Yes");
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(meterKeyOrCardJourney_Data[0]["MSG-Let's connect"]);
    }
    async doYouHaveEnoughCreditNoJourney() {
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(meterKeyOrCardJourney_Data[0]["QUE-Do you have enough credit?"]);
        await this.webChatUtils.sendMessage("random text");

       // expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(meterKeyOrCardJourney_Data[0]["MSG-Sorry say yes or no for waite"]);
       const response = await this.webChatUtils.verifyChatbotRoboSaidResponse();
        expect(
            response === meterKeyOrCardJourney_Data[0]["MSG-Sorry say yes or no for waite"] ||
            response === meterKeyOrCardJourney_Data[0]["MSG-Sorry say yes/no for enough credit"]
        ).toBeTruthy();
       await this.webChatUtils.userClickNoButton();
        expect(await this.webChatUtils.verifyChatBotYouSaidResponse()).toBe("No");
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(meterKeyOrCardJourney_Data[0]["MSG-Let's connect"]);
    }
    async doYouHaveEnoughCreditYesJourney() {
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(meterKeyOrCardJourney_Data[0]["QUE-Do you have enough credit?"]);
        await this.webChatUtils.sendMessage("random text");
        //expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(meterKeyOrCardJourney_Data[0]["MSG-Sorry say yes or no for waite"]);
        const response = await this.webChatUtils.verifyChatbotRoboSaidResponse();
        expect(
            response === meterKeyOrCardJourney_Data[0]["MSG-Sorry say yes or no for waite"] ||
            response === meterKeyOrCardJourney_Data[0]["MSG-Sorry say yes/no for enough credit"]
        ).toBeTruthy();
        await this.webChatUtils.userClickYesButton();
        expect(await this.webChatUtils.verifyChatBotYouSaidResponse()).toBe("Yes");
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(meterKeyOrCardJourney_Data[0]["MSG-Let's connect"]);
    }
    async doYouHaveSmartMeterNoJourney() {
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(meterKeyOrCardJourney_Data[0]["QUE-Do you have a smart meter?"]);
        await this.webChatUtils.sendMessage("random text");
        // expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(meterKeyOrCardJourney_Data[0]["MSG-Sorry say yes or no for smart meter"]);
        const response = await this.webChatUtils.verifyChatbotRoboSaidResponse();
        expect(
            response === meterKeyOrCardJourney_Data[0]["MSG-Sorry say yes or no for smart meter"] ||
            response === meterKeyOrCardJourney_Data[0]["MSG-Sorry Please say yes or no for smart meter"]
        ).toBeTruthy();

        await this.webChatUtils.userClickNoButton();
        expect(await this.webChatUtils.verifyChatBotYouSaidResponse()).toBe("No");
    }
    async doYouHaveSmartMeterYesJourney() {
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(meterKeyOrCardJourney_Data[0]["QUE-Do you have a smart meter?"]);
        await this.webChatUtils.sendMessage("random text");
        // expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(meterKeyOrCardJourney_Data[0]["MSG-Sorry say yes or no for smart meter"]);
        const response = await this.webChatUtils.verifyChatbotRoboSaidResponse();
        expect(
            response === meterKeyOrCardJourney_Data[0]["MSG-Sorry say yes or no for smart meter"] ||
            response === meterKeyOrCardJourney_Data[0]["MSG-Sorry Please say yes or no for smart meter"]
        ).toBeTruthy();

        await this.webChatUtils.userClickYesButton();
        expect(await this.webChatUtils.verifyChatBotYouSaidResponse()).toBe("Yes");
    }

    async connectToPaygTeam() {
        // expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(meterKeyOrCardJourney_Data[0]["MSG-ALL messages"]);
        // expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(meterKeyOrCardJourney_Data[0]["MSG-Lets find you someone"]);
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(payAsYouGo_endpoints[0].Connect_To_PAYG_Team_Msg1);
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(payAsYouGo_endpoints[0].Connect_To_PAYG_Team_Msg2);
    }
    async connectToPaygOrionTradeTeam() {
        // expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(meterKeyOrCardJourney_Data[0]["MSG-ALL messages"]);
        // expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(meterKeyOrCardJourney_Data[0]["MSG-Lets find you someone"]);
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(payAsYouGo_endpoints[0].Connect_To_PAYG_Orion_TRAD_Team_Msg1);
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(payAsYouGo_endpoints[0].Connect_To_PAYG_Orion_TRAD_Team_Msg2);
    }

    async meterScreenErrorMessage() {
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(meterKeyOrCardJourney_Data[0]["MSG-Pls Confirm Error Message"]);
        await this.webChatUtils.sendMessage("random text");
        expect(await this.webChatUtils.verifyChatBotYouSaidResponse()).toBe("random text");
    }




}
