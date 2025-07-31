import { test as base } from "@playwright/test";
import { GenesysSitesUtils } from "../utils/ui/genesys-devsite-utils";
import { GenesysSiteActions } from "../actions/ui/genesys-site-actions";
import { WebChatSelectors, WebChatUtils } from "../utils/ui/webchat-utils";
import { WebChatActions } from "../actions/ui/webchat-actions"
import { PayAsYouGoUtils } from "../utils/ui/pay_as_you_go/pay_as_you_go_utils";
import { MeterKeyOrCardUtils as Meter, MeterKeyOrCardUtils } from "../utils/ui/pay_as_you_go/meter_key_or_card_utils";
import { ToppingUpUtils, ToppingUpSelectors } from "../utils/ui/pay_as_you_go/topping_up_utils";

type pages = {

    //playwrightSiteActions:PlaywrightSiteActions,
    genesysSiteUtils: GenesysSitesUtils,
    genesysSiteActions: GenesysSiteActions,
    webChatUtils: WebChatUtils,
    webChatSelectors: WebChatSelectors,
    webChatActions: WebChatActions,
    payAsYouGoUtils: PayAsYouGoUtils,
    meterKeyOrCardUtils: MeterKeyOrCardUtils,
    toppingUpUtils: ToppingUpUtils,

}

export const test = base.extend<pages>({

    genesysSiteUtils: async ({ page }, use) => {
        await use(new GenesysSitesUtils(page));
    },

    genesysSiteActions: async ({ page }, use) => {
        await use(new GenesysSiteActions(page));
    },

    webChatUtils: async ({ page }, use) => {
        await use(new WebChatUtils(page));
    },
    webChatSelectors: async ({ page }, use) => {
        await use(new WebChatSelectors(page));
    },
    webChatActions: async ({ page }, use) => {
        await use(new WebChatActions(page));
    },
    payAsYouGoUtils: async ({ page }, use) => {
        await use(new PayAsYouGoUtils(page));
    },
    meterKeyOrCardUtils: async ({ page }, use) => {
        await use(new MeterKeyOrCardUtils(page));
    },
    toppingUpUtils: async ({ page }, use) => {
        await use(new ToppingUpUtils(page));
    },


});

export { expect } from "@playwright/test";
