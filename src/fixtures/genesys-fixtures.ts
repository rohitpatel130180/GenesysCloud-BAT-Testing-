import { test as base } from "@playwright/test";
import { PlaywrightSiteActions } from "../actions/ui/playwright-site-actions"
import { GenesysSitesUtils } from "../utils/ui/genesys-devsite-utils";
import { GenesysSiteActions } from "../actions/ui/genesys-site-actions";
import { WebChatSelectors, WebChatUtils } from "../utils/ui/webchat-utils";
import { WebChatActions } from "../actions/ui/webchat-actions"


type pages = {

    //playwrightSiteActions:PlaywrightSiteActions,
    genesysSiteUtils: GenesysSitesUtils,
    genesysSiteActions: GenesysSiteActions,
    webChatUtils: WebChatUtils,
    webChatSelectors: WebChatSelectors,
    webChatActions: WebChatActions,
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

});

export { expect } from "@playwright/test";
