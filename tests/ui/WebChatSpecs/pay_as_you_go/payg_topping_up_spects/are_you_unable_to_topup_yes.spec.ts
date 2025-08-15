import { test, expect } from "../../../../../src/fixtures/genesys-fixtures.ts";
import { payAsYouGoJourney_Data } from "../../../../../src/test-data/pay_as_you_go_intent_data/pay_as_you_go_data.ts"
import { meterKeyOrCardJourney_Data, whatDoYouNeedHelpWithJourney_Data } from "../../../../../src/test-data/pay_as_you_go_intent_data/meter_key_or_card_data.ts";

const workingHoursPreIntentJourney = [
    // {
    //     input: 'preIntent_1_1',
    //     description: 'Existing Customer',
    // },
    {
        input: 'preIntent_1_2',
        description: 'Non-Existing Customer',
    }

];
//////////////////////////////////////////// NOTES ////////////////////////////////////////////////////////////////////////////////////////
// 1. This topping up sections devided into two divisions:Division C, Division D.
//     
//      Division C:  This section also contains test cases for the second section of the Topping Up Journey where user got question "Are You unable to top up>- Yes journey
//                   and Do you have a smart meter-Yes/No Journey.
//    - Division D: Contains test cases for the second section of the Topping Up Journey where user select "Don't have funds"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

for (const preIntent of workingHoursPreIntentJourney) {
    test.describe(`PAYG-TOPPING-UP (In Hours)-->Are_You_Unable_ToTopup_No-->${preIntent.description}`, () => {
        test.beforeEach(async ({ webChatUtils, webChatActions, payAsYouGoUtils, toppingUpUtils }) => {
            test.setTimeout(90000); // Set timeout to 150 seconds for this test
            await test.step(`User Open Webmessenger,Navigate to ${preIntent.description} scenario`, async () => { await webChatActions[preIntent.input](); });
            await test.step("Provide PayGo Intent Query.", async () => { await webChatUtils.sendMessage(payAsYouGoJourney_Data[0]["Data-Pay As You Go"]); });
            await test.step(`Verify Section" ${payAsYouGoJourney_Data[0]["QUE-Are you currently unable to afford to top up"]} "`, async () => {
                await payAsYouGoUtils.areYouUnableToTopUpMeterJourney();
            });
            await test.step(`Verify Section " ${whatDoYouNeedHelpWithJourney_Data[0]["QUE-What do you need help with?"]} "`, async () => {
                await payAsYouGoUtils.whatDoYouNeedHelpWithJourney();
            });
            await test.step(`Verify Section " ${meterKeyOrCardJourney_Data[0]["MSG-Please select from the following options:"]} "`, async () => {
                await toppingUpUtils.toppingUpJourney();
            });
        });
        ///////////////////////////////////// DIVISION C TEST CASES //////////////////////////////////////
        test(`TOPPING_UP_13`, async ({ toppingUpUtils }) => {

            await test.step(`Verify Section "Are you unable to top up?-Yes"`, async () => {
                await toppingUpUtils.areYouUnableToTopUpYesJourney();
            });
            await test.step(`Verify Section "Do you have a smart meter?-No"`, async () => {
                await toppingUpUtils.doYouHaveASmartMeterNoJourney_AreYouUnableToTopUpYesJourney();
            });
        });


        ///////////////////////////////////// END OF DIVISION C TEST CASES //////////////////////////////////////
        /////END OF FOOR LOOP  
    });
};