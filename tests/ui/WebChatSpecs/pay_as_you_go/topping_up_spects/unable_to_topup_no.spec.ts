import { test, expect } from "../../../../../src/fixtures/genesys-fixtures.ts";
import { payAsYouGoJourney_Data } from "../../../../../src/test-data/pay_as_you_go_intent_data/pay_as_you_go_data.ts"
import { meterKeyOrCardJourney_Data, whatDoYouNeedHelpWithJourney_Data } from "../../../../../src/test-data/pay_as_you_go_intent_data/meter_key_or_card_data.ts";

const workingHoursPreIntentJourney = [
    {
        input: 'preIntent_1_1',
        description: 'Existing Customer',
    },
    {
        input: 'preIntent_1_2',
        description: 'Non-Existing Customer',
    }

];


for (const preIntent of workingHoursPreIntentJourney) {
    test.describe(`Topping Up (In Hours)--> ${preIntent.description}`, () => {
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
        ///////////////////////////////////// SECTION 1 //////////////////////////////////////
        test(`TOPPING_UP_01`, async ({ toppingUpUtils }) => {

            await test.step(`Verify Section "Are you unable to top up?-No"`, async () => {
                await toppingUpUtils.areYouUnableToTopUpNoJourney();
            });
            await test.step(`Verify Section "Do you have a smart meter?-No"`, async () => {
                await toppingUpUtils.doYouHaveASmartMeterNoJourney();
            });
            await test.step(`Verify Section "Did you get the help you needed?-Yes"`, async () => {
                await toppingUpUtils.didYouGetTheHelpYouNeededYesJourney();
            });
            await test.step(`Verify Section "Is there anything else I can help with?-No"`, async () => {
                await toppingUpUtils.isThereAnythingElseICanHelpYouWithNoJourney();
            });
        });

        test(`TOPPING_UP_02`, async ({ toppingUpUtils }) => {

            await test.step(`Verify Section "Are you unable to top up?-No"`, async () => {
                await toppingUpUtils.areYouUnableToTopUpNoJourney();
            });
            await test.step(`Verify Section "Do you have a smart meter?-No"`, async () => {
                await toppingUpUtils.doYouHaveASmartMeterNoJourney();
            });
            await test.step(`Verify Section "Did you get the help you needed?-Yes"`, async () => {
                await toppingUpUtils.didYouGetTheHelpYouNeededYesJourney();
            });
            await test.step(`Verify Section "Is there anything else I can help with?-Yes"`, async () => {
                await toppingUpUtils.isThereAnythingElseICanHelpYouWithYesJourney();
            });
        });
        test(`TOPPING_UP_03`, async ({ toppingUpUtils }) => {

            await test.step(`Verify Section "Are you unable to top up?-No"`, async () => {
                await toppingUpUtils.areYouUnableToTopUpNoJourney();
            });
            await test.step(`Verify Section "Do you have a smart meter?-No"`, async () => {
                await toppingUpUtils.doYouHaveASmartMeterNoJourney();
            });
            await test.step(`Verify Section "Did you get the help you needed?-No"`, async () => {
                await toppingUpUtils.didYouGetTheHelpYouNeededNoJourney();
            });
            await test.step(`Verify Section "Do you want to chat to an advisor-Yes"`, async () => {
                await toppingUpUtils.doYouWantToChatAnAdvisorYesJourney();
            });
            await test.step(`Verify Section "Do you have a smart meter?-Yes"`, async () => {
                await toppingUpUtils.smartMeterYesJourney();
            });
        });
        test(`TOPPING_UP_04`, async ({ toppingUpUtils }) => {

            await test.step(`Verify Section "Are you unable to top up?-No"`, async () => {
                await toppingUpUtils.areYouUnableToTopUpNoJourney();
            });
            await test.step(`Verify Section "Do you have a smart meter?-No"`, async () => {
                await toppingUpUtils.doYouHaveASmartMeterNoJourney();
            });
            await test.step(`Verify Section "Did you get the help you needed?-No"`, async () => {
                await toppingUpUtils.didYouGetTheHelpYouNeededNoJourney();
            });
            await test.step(`Verify Section "Do you want to chat to an advisor-Yes"`, async () => {
                await toppingUpUtils.doYouWantToChatAnAdvisorYesJourney();
            });
            await test.step(`Verify Section "Do you have a smart meter?-No"`, async () => {
                await toppingUpUtils.smartMeterNoJourney();
            });
        });
        test(`TOPPING_UP_05`, async ({ toppingUpUtils }) => {

            await test.step(`Verify Section "Are you unable to top up?-No"`, async () => {
                await toppingUpUtils.areYouUnableToTopUpNoJourney();
            });
            await test.step(`Verify Section "Do you have a smart meter?-No"`, async () => {
                await toppingUpUtils.doYouHaveASmartMeterNoJourney();
            });
            await test.step(`Verify Section "Did you get the help you needed?-No"`, async () => {
                await toppingUpUtils.didYouGetTheHelpYouNeededNoJourney();
            });
            await test.step(`Verify Section "Do you want to chat to an advisor-No"`, async () => {
                await toppingUpUtils.doYouWantToChatAnAdvisorNoJourney();
            });
            await test.step(`Verify Section "Do you have another PayGo Question?-Yes"`, async () => {
                await toppingUpUtils.doYouHaveAnotherPayGoQuestionYesJourney();
            });
        });

        test(`TOPPING_UP_06`, async ({ toppingUpUtils }) => {

            await test.step(`Verify Section "Are you unable to top up?-No"`, async () => {
                await toppingUpUtils.areYouUnableToTopUpNoJourney();
            });
            await test.step(`Verify Section "Do you have a smart meter?-No"`, async () => {
                await toppingUpUtils.doYouHaveASmartMeterNoJourney();
            });
            await test.step(`Verify Section "Did you get the help you needed?-No"`, async () => {
                await toppingUpUtils.didYouGetTheHelpYouNeededNoJourney();
            });
            await test.step(`Verify Section "Do you want to chat to an advisor-No"`, async () => {
                await toppingUpUtils.doYouWantToChatAnAdvisorNoJourney();
            });
            await test.step(`Verify Section "Do you have another PayGo Question?-No"`, async () => {
                await toppingUpUtils.doYouHaveAnotherPayGoQuestionNoJourney();
            });
        });
        ///////////////////////////////////// END OF SECTION 1 TEST CASES //////////////////////////////////////
        ///////////////////////////////////// SECTION 2 TEST CASES ////////////////////////////////////////////


        
        ///////////////////////////////////// END OF SECTION 2 TEST CASES //////////////////////////////////////
        /////END OF FOOR LOOP  
    });
};