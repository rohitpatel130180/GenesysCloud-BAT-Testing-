import {Page} from '@playwright/test'
import { GenesysSitesUtils } from '../../utils/ui/genesys-devsite-utils';

export class GenesysSiteActions{
readonly genesysSiteUtils:GenesysSitesUtils;
readonly page:Page;
constructor(page:Page){
    this.page=page;
    this.genesysSiteUtils = new GenesysSitesUtils(this.page);

}
async genesysLogin()
{
    await this.genesysSiteUtils.goToGenesysLoginPage();
    await this.genesysSiteUtils.enterGenesysCredentials();
    await this.genesysSiteUtils.goToGenesysHomePage();

}
async genesysLogout(){
    await this.genesysSiteUtils.genesysLogoutProcedure();
    await this.genesysSiteUtils.verifyLoginButton();
}


}
