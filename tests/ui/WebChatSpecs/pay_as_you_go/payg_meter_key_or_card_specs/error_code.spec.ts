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
    test.describe(`PAYG-MTR-KEY-OR-CARD (In Hours)-->Error Code--> ${preIntent.description}`, () => {
        test.beforeEach(async ({ webChatUtils, webChatActions, payAsYouGoUtils, meterKeyOrCardUtils }) => {
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
                await meterKeyOrCardUtils.meterKeyOrCardJourney();
            });

        });


        test(`Error code 01`, async ({ meterKeyOrCardUtils }) => {

            await test.step(`Verify Section "Select Error code"`, async () => {
                await meterKeyOrCardUtils.userSelectErrorCode();
            });
            await test.step(`Verify Section "Confirm Error Message"`, async () => {
                await meterKeyOrCardUtils.meterScreenErrorMessage();
            });
            await test.step(`Verify Section "Do you have smart meter?-YES"`, async () => {
                await meterKeyOrCardUtils.doYouHaveSmartMeterYesJourney();
            });
            await test.step(`Verify Section "Are you off supply?-NO"`, async () => {
                await meterKeyOrCardUtils.areYouOffTheSupplyNoJourney();
            });
            await test.step(`Verify Section "Able to Pick up new Key/Card?-NO"`, async () => {
                await meterKeyOrCardUtils.ableToPickUpNewKeyCardNoJourney();
            });
            await test.step(`Verify Section "Do you have enough credit?-NO"`, async () => {
                await meterKeyOrCardUtils.doYouHaveEnoughCreditNoJourney();
            });
            await test.step('Verify Section "Connect to PAYG Team"', async () => {
                await meterKeyOrCardUtils.connectToPaygTeam();
            });
        });

        test(`Error code 02`, async ({ meterKeyOrCardUtils }) => {

            await test.step(`Verify Section "Select Error code"`, async () => {
                await meterKeyOrCardUtils.userSelectErrorCode();
            });
            await test.step(`Verify Section "Confirm Error Message"`, async () => {
                await meterKeyOrCardUtils.meterScreenErrorMessage();
            });
            await test.step(`Verify Section "Do you have smart meter?-YES"`, async () => {
                await meterKeyOrCardUtils.doYouHaveSmartMeterYesJourney();
            });
            await test.step(`Verify Section "Are you off supply?-NO"`, async () => {
                await meterKeyOrCardUtils.areYouOffTheSupplyNoJourney();
            });
            await test.step(`Verify Section "Able to Pick up new Key/Card?-NO"`, async () => {
                await meterKeyOrCardUtils.ableToPickUpNewKeyCardNoJourney();
            });
            await test.step(`Verify Section "Do you have enough credit?-YES"`, async () => {
                await meterKeyOrCardUtils.doYouHaveEnoughCreditYesJourney();
            });
            await test.step('Verify Section "Connect to PAYG Team"', async () => {
                await meterKeyOrCardUtils.connectToPaygTeam();
            });
        });

        test(`Error code 03`, async ({ meterKeyOrCardUtils }) => {

            await test.step(`Verify Section "Select Error code"`, async () => {
                await meterKeyOrCardUtils.userSelectErrorCode();
            });
            await test.step(`Verify Section "Confirm Error Message"`, async () => {
                await meterKeyOrCardUtils.meterScreenErrorMessage();
            });
            await test.step(`Verify Section "Do you have smart meter?-YES"`, async () => {
                await meterKeyOrCardUtils.doYouHaveSmartMeterYesJourney();
            });
            await test.step(`Verify Section "Are you off supply?-NO"`, async () => {
                await meterKeyOrCardUtils.areYouOffTheSupplyNoJourney();
            });
            await test.step(`Verify Section "Able to Pick up new Key/Card?-YES"`, async () => {
                await meterKeyOrCardUtils.ableToPickUpNewKeyCardYesJourney();
            });
            await test.step('Verify Section "Connect to PAYG Team"', async () => {
                await meterKeyOrCardUtils.connectToPaygTeam();
            });
        });

        test(`Error code 04`, async ({ meterKeyOrCardUtils }) => {

            await test.step(`Verify Section "Select Error code"`, async () => {
                await meterKeyOrCardUtils.userSelectErrorCode();
            });
            await test.step(`Verify Section "Confirm Error Message"`, async () => {
                await meterKeyOrCardUtils.meterScreenErrorMessage();
            });
            await test.step(`Verify Section "Do you have smart meter?-YES"`, async () => {
                await meterKeyOrCardUtils.doYouHaveSmartMeterYesJourney();
            });
            await test.step(`Verify Section "Are you off supply?-YES"`, async () => {
                await meterKeyOrCardUtils.areYouOffTheSupplyYesJourney();
            });
            await test.step(`Verify Section "Able to Pick up new Key/Card?-NO"`, async () => {
                await meterKeyOrCardUtils.ableToPickUpNewKeyCardNoJourney_OffSupplyYes();
            });
            await test.step('Verify Section "Connect to PAYG Team"', async () => {
                await meterKeyOrCardUtils.connectToPaygTeam();
            });
        });
        test(`Error code 05`, async ({ meterKeyOrCardUtils }) => {

            await test.step(`Verify Section "Select Error code"`, async () => {
                await meterKeyOrCardUtils.userSelectErrorCode();
            });
            await test.step(`Verify Section "Confirm Error Message"`, async () => {
                await meterKeyOrCardUtils.meterScreenErrorMessage();
            });
            await test.step(`Verify Section "Do you have smart meter?-YES"`, async () => {
                await meterKeyOrCardUtils.doYouHaveSmartMeterYesJourney();
            });
            await test.step(`Verify Section "Are you off supply?-YES"`, async () => {
                await meterKeyOrCardUtils.areYouOffTheSupplyYesJourney();
            });
            await test.step(`Verify Section "Able to Pick up new Key/Card?-YES"`, async () => {
                await meterKeyOrCardUtils.ableToPickUpNewKeyCardYesJourney();
            });
            await test.step('Verify Section "Connect to PAYG Team"', async () => {
                await meterKeyOrCardUtils.connectToPaygTeam();
            });
        });

        test(`Error code 06`, async ({ meterKeyOrCardUtils }) => {

            await test.step(`Verify Section "Select Error code"`, async () => {
                await meterKeyOrCardUtils.userSelectErrorCode();
            });
            await test.step(`Verify Section "Confirm Error Message"`, async () => {
                await meterKeyOrCardUtils.meterScreenErrorMessage();
            });
            await test.step(`Verify Section "Do you have smart meter?-NO"`, async () => {
                await meterKeyOrCardUtils.doYouHaveSmartMeterNoJourney();
            });
            await test.step(`Verify Section "Are you off supply?-NO"`, async () => {
                await meterKeyOrCardUtils.areYouOffTheSupplyNoJourney();
            });
            await test.step(`Verify Section "Able to Pick up new Key/Card?-NO"`, async () => {
                await meterKeyOrCardUtils.ableToPickUpNewKeyCardNoJourney();
            });
            await test.step(`Verify Section "Do you have enough credit?-NO"`, async () => {
                await meterKeyOrCardUtils.doYouHaveEnoughCreditNoJourney();
            });
            await test.step('Verify Section "Connect to PAYGOrion_TRAD_Team"', async () => {
                await meterKeyOrCardUtils.connectToPaygOrionTradeTeam;
            });
        });

        test(`Error code 07`, async ({ meterKeyOrCardUtils }) => {

            await test.step(`Verify Section "Select Error code"`, async () => {
                await meterKeyOrCardUtils.userSelectErrorCode();
            });
            await test.step(`Verify Section "Confirm Error Message"`, async () => {
                await meterKeyOrCardUtils.meterScreenErrorMessage();
            });
            await test.step(`Verify Section "Do you have smart meter?-NO"`, async () => {
                await meterKeyOrCardUtils.doYouHaveSmartMeterNoJourney();
            });
            await test.step(`Verify Section "Are you off supply?-NO"`, async () => {
                await meterKeyOrCardUtils.areYouOffTheSupplyNoJourney();
            });
            await test.step(`Verify Section "Able to Pick up new Key/Card?-NO"`, async () => {
                await meterKeyOrCardUtils.ableToPickUpNewKeyCardNoJourney();
            });
            await test.step(`Verify Section "Do you have enough credit?-YES"`, async () => {
                await meterKeyOrCardUtils.doYouHaveEnoughCreditYesJourney();
            });
            await test.step('Verify Section "Connect to PAYGOrion_TRAD_Team"', async () => {
                await meterKeyOrCardUtils.connectToPaygOrionTradeTeam;
            });
        });

        test(`Error code 08-->`, async ({ meterKeyOrCardUtils }) => {

            await test.step(`Verify Section "Select Error code"`, async () => {
                await meterKeyOrCardUtils.userSelectErrorCode();
            });
            await test.step(`Verify Section "Confirm Error Message"`, async () => {
                await meterKeyOrCardUtils.meterScreenErrorMessage();
            });
            await test.step(`Verify Section "Do you have smart meter?-NO"`, async () => {
                await meterKeyOrCardUtils.doYouHaveSmartMeterNoJourney();
            });
            await test.step(`Verify Section "Are you off supply?-NO"`, async () => {
                await meterKeyOrCardUtils.areYouOffTheSupplyNoJourney();
            });
            await test.step(`Verify Section "Able to Pick up new Key/Card?-YES"`, async () => {
                await meterKeyOrCardUtils.ableToPickUpNewKeyCardYesJourney();
            });
            await test.step('Verify Section "Connect to PAYGOrion_TRAD_Team"', async () => {
                await meterKeyOrCardUtils.connectToPaygOrionTradeTeam;
            });
        });

        test(`Error code 09`, async ({ meterKeyOrCardUtils }) => {

            await test.step(`Verify Section "Select Error code"`, async () => {
                await meterKeyOrCardUtils.userSelectErrorCode();
            });
            await test.step(`Verify Section "Confirm Error Message"`, async () => {
                await meterKeyOrCardUtils.meterScreenErrorMessage();
            });
            await test.step(`Verify Section "Do you have smart meter?-NO"`, async () => {
                await meterKeyOrCardUtils.doYouHaveSmartMeterNoJourney();
            });
            await test.step(`Verify Section "Are you off supply?-YES"`, async () => {
                await meterKeyOrCardUtils.areYouOffTheSupplyYesJourney();
            });
            await test.step(`Verify Section "Able to Pick up new Key/Card?-NO"`, async () => {
                await meterKeyOrCardUtils.ableToPickUpNewKeyCardNoJourney_OffSupplyYes();
            });
            await test.step('Verify Section "Connect to PAYGOrion_TRAD_Team"', async () => {
                await meterKeyOrCardUtils.connectToPaygOrionTradeTeam;
            });
        });
        test(`Error code 10`, async ({ meterKeyOrCardUtils }) => {

            await test.step(`Verify Section "Select Error code"`, async () => {
                await meterKeyOrCardUtils.userSelectErrorCode();
            });
            await test.step(`Verify Section "Confirm Error Message"`, async () => {
                await meterKeyOrCardUtils.meterScreenErrorMessage();
            });
            await test.step(`Verify Section "Do you have smart meter?-NO"`, async () => {
                await meterKeyOrCardUtils.doYouHaveSmartMeterNoJourney();
            });
            await test.step(`Verify Section "Are you off supply?-YES"`, async () => {
                await meterKeyOrCardUtils.areYouOffTheSupplyYesJourney();
            });
            await test.step(`Verify Section "Able to Pick up new Key/Card?-YES"`, async () => {
                await meterKeyOrCardUtils.ableToPickUpNewKeyCardYesJourney();
            });
            await test.step('Verify Section "Connect to PAYGOrion_TRAD_Team"', async () => {
                await meterKeyOrCardUtils.connectToPaygOrionTradeTeam;
            });
        });

        /////END OF FOOR LOOP  
    });
};