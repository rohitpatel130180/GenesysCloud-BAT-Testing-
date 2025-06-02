import type { Page } from "@playwright/test"
import { expect } from "@playwright/test"
import exp from "constants";

//GenesySiteSelectors class will identify selectors for login and logout
export class GenesySiteSelectors {
    private readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    getCollaborateCommunicateLink(){
        return this.page.getByRole('link', { name: 'Collaborate/ Communicate' });
    }
    getLoginEmail() {
        return this.page.getByRole('textbox', { name: 'Email Address' });
    }
    getLoginPassword() {
        return this.page.getByRole('textbox', { name: 'Password' });
    }
    getLoginButton() {
        return this.page.getByRole('button', { name: 'Log In' });
    }
    getUserToggleButton(){
        return this.page.getByRole('button', { name: 'Toggle profile panel, user' });
    }
    getLogoutButton() {
        return this.page.getByRole('button', { name: 'Logout' });
    }

}

//GenesysSitesUtils class will be holding common utilities methods that can be used across test case

export class GenesysSitesUtils {
    private readonly page: Page;
    readonly genesysSiteSelectors: GenesySiteSelectors;
    constructor(page: Page) {
        this.page = page;
        this.genesysSiteSelectors = new GenesySiteSelectors(this.page)
    }
    async goToGenesysLoginPage() {
        await this.page.goto('https://login.euw2.pure.cloud/#/authenticate');
    }
    
    async enterGenesysCredentials() {
        await this.genesysSiteSelectors.getLoginEmail().fill("rohit.patel2@ovo.com");
        await this.genesysSiteSelectors.getLoginPassword().fill("chairHONOR741!");
        await this.genesysSiteSelectors.getLoginButton().click();
    }
    async goToGenesysHomePage(){
        await this.genesysSiteSelectors.getCollaborateCommunicateLink().click();
    }
    async genesysLogoutProcedure() {
        await this.genesysSiteSelectors.getUserToggleButton().click();
        await this.genesysSiteSelectors.getLogoutButton().click();
    }
    async verifyLoginButton()
    {
    await expect(this.genesysSiteSelectors.getLoginButton()).toContainText('Log In');
    }
}


