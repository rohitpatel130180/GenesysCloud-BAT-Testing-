import { test as base } from "@playwright/test";
import { PlaywrightSiteActions } from "../actions/ui/playwright-site-actions"
import { GenesysSitesUtils } from "../utils/ui/genesys-devsite-utils";
import { GenesysSiteActions } from "../actions/ui/genesys-site-actions";
//
type pages = {
  
    //playwrightSiteActions:PlaywrightSiteActions,
    genesysSiteUtils:GenesysSitesUtils;
    genesysSiteActions:GenesysSiteActions;
}

export const test = base.extend<pages>({      
  
    genesysSiteUtils:async({page},use)=>{
        await use(new GenesysSitesUtils(page));
    },

    genesysSiteActions:async ({page},use)=>{
        await use(new GenesysSiteActions(page));
    }
});

export { expect } from "@playwright/test";
