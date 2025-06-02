import { test, expect } from "../../src/fixtures/genesys-fixtures"
import { annotate } from '../../src/utils/shared/annotate';

test("Gnesys Login Logout Test", async ({ page, genesysSiteUtils,genesysSiteActions }) => {
    await genesysSiteActions.genesysLogin();
    await genesysSiteActions.genesysLogout();

})



