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
//////////////////////////////////////////// NOTES ////////////////////////////////////////////////////////////////////////////////////////
// 1. This topping up sections devided into three divisions:Division A, Division B.
//     -Division A: Contains test cases for the  section of the Topping Up main Journey  where user got question "Do you have a smart meter?-No Journey".This section also
//       contains test cases for the second section of the Topping Up Journey where user got question "Did you get the help you needed? [i.e. Test case 01-06 represent that]".
//
//    - Division B: Contains test cases for the  section of the Topping Up Journey where user got question "Do you have a smart meter?-Yes Journey[i.e. Test case 07-12 represent that]"
// ".
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
        ///////////////////////////////////// DIVISION A TEST CASES //////////////////////////////////////
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
                await toppingUpUtils.smartMeterYesJourney_DidYouGetTheHelpNeededSection();
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
                await toppingUpUtils.smartMeterNoJourney_DidYouGetTheHelpNeededSection();
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
        ///////////////////////////////////// END OF DIVISION A TEST CASES //////////////////////////////////////


        ///////////////////////////////////// DIVISION B TEST CASES ////////////////////////////////////////////
        test(`TOPPING_UP_07`, async ({ toppingUpUtils }) => {

            await test.step(`Verify Section "Are you unable to top up?-No"`, async () => {
                await toppingUpUtils.areYouUnableToTopUpNoJourney();
            });
            await test.step(`Verify Section "Do you have a smart meter?-Yes"`, async () => {
                await toppingUpUtils.doYouHaveASmartMeterYesJourney();
            });
            await test.step(`Verify Section "Are you unsure how to top-up on the OVO Energy app?-No"`, async () => {
                await toppingUpUtils.areYouUnsureHowToTopUpNoJourney();
            });
            await test.step(`Verify Section "Do you need help adding a top-up that hasn't shown up on your IHD or smart meter?-No"`, async () => {
                await toppingUpUtils.doYouNeedHelpAddingTopupNoJourney();
            });
            await test.step(`Verify Section "Have you topped up the meter and can see the credit added, but still don't have power?-No"`, async () => {
                await toppingUpUtils.haveYouToppedUpNoJourney();
            });
        });
        test(`TOPPING_UP_08`, async ({ toppingUpUtils }) => {

            await test.step(`Verify Section "Are you unable to top up?-No"`, async () => {
                await toppingUpUtils.areYouUnableToTopUpNoJourney();
            });
            await test.step(`Verify Section "Do you have a smart meter?-Yes"`, async () => {
                await toppingUpUtils.doYouHaveASmartMeterYesJourney();
            });
            await test.step(`Verify Section "Are you unsure how to top-up on the OVO Energy app?-No"`, async () => {
                await toppingUpUtils.areYouUnsureHowToTopUpNoJourney();
            });
            await test.step(`Verify Section "Do you need help adding a top-up that hasn't shown up on your IHD or smart meter?-No"`, async () => {
                await toppingUpUtils.doYouNeedHelpAddingTopupNoJourney();
            });
            await test.step(`Verify Section "Have you topped up the meter and can see the credit added, but still don't have power?-Yes"`, async () => {
                await toppingUpUtils.haveYouToppedUpYesJourney();
            });
        });
        test(`TOPPING_UP_09`, async ({ toppingUpUtils }) => {

            await test.step(`Verify Section "Are you unable to top up?-No"`, async () => {
                await toppingUpUtils.areYouUnableToTopUpNoJourney();
            });
            await test.step(`Verify Section "Do you have a smart meter?-Yes"`, async () => {
                await toppingUpUtils.doYouHaveASmartMeterYesJourney();
            });
            await test.step(`Verify Section "Are you unsure how to top-up on the OVO Energy app?-No"`, async () => {
                await toppingUpUtils.areYouUnsureHowToTopUpNoJourney();
            });
            await test.step(`Verify Section "Do you need help adding a top-up that hasn't shown up on your IHD or smart meter?-Yes"`, async () => {
                await toppingUpUtils.doYouNeedHelpAddingTopupYesJourney();
            });
            await test.step(`Verify Section "User Click I have finished`, async () => {
                await toppingUpUtils.IHaveFinishedJourney();
            });
        });
        test(`TOPPING_UP_10`, async ({ toppingUpUtils }) => {

            await test.step(`Verify Section "Are you unable to top up?-No"`, async () => {
                await toppingUpUtils.areYouUnableToTopUpNoJourney();
            });
            await test.step(`Verify Section "Do you have a smart meter?-Yes"`, async () => {
                await toppingUpUtils.doYouHaveASmartMeterYesJourney();
            });
            await test.step(`Verify Section "Are you unsure how to top-up on the OVO Energy app?-No"`, async () => {
                await toppingUpUtils.areYouUnsureHowToTopUpNoJourney();
            });
            await test.step(`Verify Section "Do you need help adding a top-up that hasn't shown up on your IHD or smart meter?-Yes"`, async () => {
                await toppingUpUtils.doYouNeedHelpAddingTopupYesJourney();
            });
            await test.step(`Verify Section "User Click I Need More Help`, async () => {
                await toppingUpUtils.INeedMoreHelpJourney();
            });
        });
        test(`TOPPING_UP_11`, async ({ toppingUpUtils }) => {

            await test.step(`Verify Section "Are you unable to top up?-No"`, async () => {
                await toppingUpUtils.areYouUnableToTopUpNoJourney();
            });
            await test.step(`Verify Section "Do you have a smart meter?-Yes"`, async () => {
                await toppingUpUtils.doYouHaveASmartMeterYesJourney();
            });
            await test.step(`Verify Section "Are you unsure how to top-up on the OVO Energy app?-No"`, async () => {
                await toppingUpUtils.areYouUnsureHowToTopUpYesJourney_DoYouNeedHelpNoJourney();
            });
            
        });

        test(`TOPPING_UP_12`, async ({ toppingUpUtils }) => {

           // This test case will be written once recieved feedback from project for the query raised in defect sheet.
            });

        ///////////////////////////////////// END OF DIVISION B TEST CASES //////////////////////////////////////
        /////END OF FOOR LOOP  
    });
};