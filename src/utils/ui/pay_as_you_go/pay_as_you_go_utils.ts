import { Page, expect } from "@playwright/test";
import { payAsYouGoJourney_Data } from "../../../test-data/pay_as_you_go_intent_data/pay_as_you_go_data";
import { whatDoYouNeedHelpWithJourney_Data } from "../../../test-data/pay_as_you_go_intent_data/meter_key_or_card_data";
import { WebChatUtils } from "../webchat-utils";


export class PayAsYouGoSelectors {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    getMeterKeyOrCardOption() {
        return this.page.locator('iframe[name="MessengerFrame"]').contentFrame().getByRole('button', { name: 'Meter key or card. - Click to' });
    }
    getDebtOption() {
        return this.page.locator('iframe[name="MessengerFrame"]').contentFrame().getByRole('button', { name: 'Debt. - Click to reply with' });
    }
    getToppingUpOption() {
        return this.page.locator('iframe[name="MessengerFrame"]').contentFrame().getByRole('button', { name: 'Topping up. - Click to reply with' });
    }
    getOffSupplyOption() {
        return this.page.locator('iframe[name="MessengerFrame"]').contentFrame().getByRole('button', { name: 'Off supply. - Click to reply with' });
    }
}

export class PayAsYouGoUtils {
    private readonly page: Page;
    readonly payAsYouGoSelectors: PayAsYouGoSelectors;
    readonly webChatUtils: WebChatUtils

    constructor(page: Page) {
        this.page = page;
        this.payAsYouGoSelectors = new PayAsYouGoSelectors(page);
        this.webChatUtils = new WebChatUtils(page);

    }

    async areYouUnableToTopUpMeterJourney() {
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(payAsYouGoJourney_Data[0]["QUE-Are you currently unable to afford to top up"]);
        await this.webChatUtils.sendMessage("random text");
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(payAsYouGoJourney_Data[0]["MSG-Sorry, Oops please select yes or no"]);
        await this.webChatUtils.userClickNoButton();
        expect(await this.webChatUtils.verifyChatBotYouSaidResponse()).toBe("No");
    }
    async whatDoYouNeedHelpWithJourney() {
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(whatDoYouNeedHelpWithJourney_Data[0]["QUE-What do you need help with?"]);
        expect(await this.payAsYouGoSelectors.getMeterKeyOrCardOption().isVisible()).toBeTruthy();
        expect(await this.payAsYouGoSelectors.getToppingUpOption().isVisible()).toBeTruthy();
        expect(await this.payAsYouGoSelectors.getOffSupplyOption().isVisible()).toBeTruthy();
        expect(await this.payAsYouGoSelectors.getDebtOption().isVisible()).toBeTruthy();
        await this.webChatUtils.sendMessage("random text");
        expect(await this.webChatUtils.verifyChatbotRoboSaidResponse()).toBe(whatDoYouNeedHelpWithJourney_Data[0]["MSG-Sorry. What do you need help with"]);
        
    }


}
