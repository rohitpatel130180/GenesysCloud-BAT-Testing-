import { TIMEOUT } from "dns";
import { test, expect } from "../../../../src/fixtures/genesys-fixtures"
import { bereavementIntent_138541_Data } from '../../../../src/test-data/Bereavement Intent/bereavement-intent';
import { annotate } from '../../../../src/utils/shared/annotate';
test.describe('Working Hours Bereavement Intent Update - CCSD-138541 Test Cases', () => {
  test('CCSD-138541_TC_01', async ({ webChatUtils, webChatActions }) => {
    // test.slow(); 
    test.setTimeout(90000); // Set timeout to 60 seconds for this test 
    /*await test.step("Open Web Messenger during working hours.", async () => { await webChatActions.userInitiateWebchat(); });
    await test.step("Verify initial greeting message.", async () => { await webChatActions.userNavigatesThroughPreIntentJourney(); });
    await test.step("Provide personnel details as an existing customer.", async () => { await webChatActions.userExistingCustomerAndProvidePersonalDetails(); });
    await test.step("Verify message from Web Messenger about customer's query.", async () => {
      expect(await webChatUtils.verifyChatbotRoboSaidResponse()).toBe("Please tell me what type of query you have so I can help you find the right information, e.g. billing query, my online account, meter readings");
    });*/
    await test.step("User Open Webmessenger,Navigate to Pre_int_1.1 scenario", async () => { await webChatActions.preIntent_1_1(); });
    await test.step("Provide Bereavement Intent query as CCSD-62707.", async () => { await webChatUtils.sendMessage('My partner died'); });
    await test.step("Verify Web Messenger response..", async () => {
      expect(await webChatUtils.verifyChatbotRoboSaidResponse()).toBe("If you need to let us know that one of our customers has passed away, we’re here to help you through the next steps.");
      expect(await webChatUtils.verifyChatbotRoboSaidResponse()).toBe("Have you already contacted us to advise someone has passed away?");
    });
    await test.step("Click Yes.", async () => {
      await webChatUtils.userClickYesButton();
      // expect(await webChatUtils.verifyChatbotRoboSaidResponse()).toBe("Sorry, you've reached us outside of this teams opening hours.\n\nPlease contact us again Mon-Fri 8am-6pm.\n\nAlternatively, you can call the team within the hours given above on 0330 175 9683, or send an email to: bereavement@ovoenergy.com");
    });
    await test.step("Verify Web Messenger response.", async () => {
      expect(await webChatUtils.verifyChatbotRoboSaidResponse()).toBe("Do you still need help and would like to talk to one of our agents?");
    });
    await test.step("Click No.", async () => { await webChatUtils.userClickNoButton(); });
    await test.step("Verify Web Messenger response.", async () => {
      expect(await webChatUtils.verifyChatbotRoboSaidResponse()).toBe("Is there anything else I can help with?");
    });
    await test.step("Click No.", async () => { await webChatUtils.userClickNoButton(); });
    await test.step("Verify Web Messenger response.", async () => {
      expect(await webChatUtils.verifyChatbotRoboSaidResponse()).toBe("Thank you for contacting OVO Energy. If you have any further questions just ask me anytime...");
    });
  });

  test('CCSD-138541_TC_02', async ({ webChatUtils, webChatActions }) => {

    // test.slow(); 
    test.setTimeout(90000); // Set timeout to 60 seconds for this test    
    await test.step("User Open Webmessenger,Navigate to Pre_int_1.1 scenario", async () => { await webChatActions.preIntent_1_1(); });
    await test.step("Provide Bereavement Intent query as CCSD-62707.", async () => { await webChatUtils.sendMessage('My partner died'); });
    await test.step("Verify Web Messenger response..", async () => {
      expect(await webChatUtils.verifyChatbotRoboSaidResponse()).toBe("If you need to let us know that one of our customers has passed away, we’re here to help you through the next steps.");
      expect(await webChatUtils.verifyChatbotRoboSaidResponse()).toBe("Have you already contacted us to advise someone has passed away?");
    });
    await test.step("Click No.", async () => {
      await webChatUtils.userClickNoButton();
      // expect(await webChatUtils.verifyChatbotRoboSaidResponse()).toBe("Sorry, you've reached us outside of this teams opening hours.\n\nPlease contact us again Mon-Fri 8am-6pm.\n\nAlternatively, you can call the team within the hours given above on 0330 175 9683, or send an email to: bereavement@ovoenergy.com");
    });
    await test.step("Verify Web Messenger response.", async () => {
      expect(await webChatUtils.verifyChatbotRoboSaidResponse()).toBe("LifeLedger is a free online tool that lets you get in touch with us and other companies, to tell us that someone has passed away.\nIt means you can notify multiple companies from one place:\nhttps://lifeledger.com/bereavement/energy/registering-a-death-with-ovo-energy/.");
      expect(await webChatUtils.verifyChatbotRoboSaidResponse()).toBe("Did you get the help you needed?");
    });
    await test.step("Click Yes.", async () => { await webChatUtils.userClickYesButton(); });
    await test.step("Verify Web Messenger response.", async () => {
      expect(await webChatUtils.verifyChatbotRoboSaidResponse()).toBe("Is there anything else I can help with?");
    });
    await test.step("Click No.", async () => { await webChatUtils.userClickNoButton(); });
    await test.step("Verify Web Messenger response.", async () => {
      expect(await webChatUtils.verifyChatbotRoboSaidResponse()).toBe("Thank you for contacting OVO Energy. If you have any further questions just ask me anytime...");
    });
  });

  test('CCSD-138541_TC_03', async ({ webChatUtils, webChatActions }) => {
    // test.slow(); 
    test.setTimeout(90000); // Set timeout to 60 seconds for this test    
    await test.step("User Open Webmessenger,Navigate to Pre_int_1.1 scenario", async () => { await webChatActions.preIntent_1_1(); });
    await test.step("Provide Bereavement Intent query as CCSD-62707.", async () => { await webChatUtils.sendMessage('My partner died'); });
    await test.step("Verify Web Messenger response..", async () => {
      expect(await webChatUtils.verifyChatbotRoboSaidResponse()).toBe("If you need to let us know that one of our customers has passed away, we’re here to help you through the next steps.");
      expect(await webChatUtils.verifyChatbotRoboSaidResponse()).toBe("Have you already contacted us to advise someone has passed away?");
    });
    await test.step("Click No.", async () => {
      await webChatUtils.userClickNoButton();
      // expect(await webChatUtils.verifyChatbotRoboSaidResponse()).toBe("Sorry, you've reached us outside of this teams opening hours.\n\nPlease contact us again Mon-Fri 8am-6pm.\n\nAlternatively, you can call the team within the hours given above on 0330 175 9683, or send an email to: bereavement@ovoenergy.com");
    });
    await test.step("Verify Web Messenger response.", async () => {
      expect(await webChatUtils.verifyChatbotRoboSaidResponse()).toBe("LifeLedger is a free online tool that lets you get in touch with us and other companies, to tell us that someone has passed away.\nIt means you can notify multiple companies from one place:\nhttps://lifeledger.com/bereavement/energy/registering-a-death-with-ovo-energy/.");
      expect(await webChatUtils.verifyChatbotRoboSaidResponse()).toBe("Did you get the help you needed?");
    });
    await test.step("Click Yes.", async () => { await webChatUtils.userClickYesButton(); });
    await test.step("Verify Web Messenger response.", async () => {
      expect(await webChatUtils.verifyChatbotRoboSaidResponse()).toBe("Is there anything else I can help with?");
    });
    await test.step("Click Yes.", async () => { await webChatUtils.userClickYesButton(); });
    await test.step("Verify Web Messenger response.", async () => {
      expect(await webChatUtils.verifyChatbotRoboSaidResponse()).toBe("Please tell me what type of query you have so I can help you find the right information, e.g. billing query, my online account, meter readings");
    });
  });

  /*test('CCSD-138541_TC_04', async ({ webChatUtils, webChatActions }) => {
  // test.slow(); 
  test.setTimeout(90000); // Set timeout to 60 seconds for this test    
  await test.step("User Open Webmessenger,Navigate to Pre_int_1.1 scenario", async () => { await webChatActions.preIntent_1_1(); });
  await test.step("Provide Bereavement Intent query as CCSD-62707.", async () => { await webChatUtils.sendMessage('My partner died'); });
  await test.step("Verify Web Messenger response..", async () => {
    expect(await webChatUtils.verifyChatbotRoboSaidResponse()).toBe("If you need to let us know that one of our customers has passed away, we’re here to help you through the next steps.");
    expect(await webChatUtils.verifyChatbotRoboSaidResponse()).toBe("Have you already contacted us to advise someone has passed away?");
  });
  await test.step("Click No.", async () => {
    await webChatUtils.userClickNoButton();
    // expect(await webChatUtils.verifyChatbotRoboSaidResponse()).toBe("Sorry, you've reached us outside of this teams opening hours.\n\nPlease contact us again Mon-Fri 8am-6pm.\n\nAlternatively, you can call the team within the hours given above on 0330 175 9683, or send an email to: bereavement@ovoenergy.com");
  });
  await test.step("Verify Web Messenger response.", async () => {
    expect(await webChatUtils.verifyChatbotRoboSaidResponse()).toBe("LifeLedger is a free online tool that lets you get in touch with us and other companies, to tell us that someone has passed away.\nIt means you can notify multiple companies from one place:\nhttps://lifeledger.com/bereavement/energy/registering-a-death-with-ovo-energy/.");
    expect(await webChatUtils.verifyChatbotRoboSaidResponse()).toBe("Did you get the help you needed?");
  });
  await test.step("Click No.", async () => { await webChatUtils.userClickNoButton(); });
  await test.step("Verify Web Messenger response.", async () => {
    expect(await webChatUtils.verifyChatbotRoboSaidResponse()).toBe("Do you still need help and would like to talk to one of our agents?");
  });
  await test.step("Click No.", async () => { await webChatUtils.userClickNoButton(); });
  await test.step("Verify Web Messenger response.", async () => {
    expect(await webChatUtils.verifyChatbotRoboSaidResponse()).toBe("Is there anything else I can help with?");
  });
  await test.step("Click No.", async () => { await webChatUtils.userClickNoButton(); });
  await test.step("Verify Web Messenger response.", async () => {
    expect(await webChatUtils.verifyChatbotRoboSaidResponse()).toBe("Thank you for contacting OVO Energy. If you have any further questions just ask me anytime...");
  });  
});
*/

  test('CCSD-138541_TC_04', async ({ webChatUtils, webChatActions }) => {
    // test.slow(); 
    test.setTimeout(90000); // Set timeout to 60 seconds for this test 
    const bereavementIntentData = bereavementIntent_138541_Data[0];
    await test.step("User Open Webmessenger,Navigate to Pre_int_1.1 scenario", async () => { await webChatActions.preIntent_1_1(); });
    await test.step("Provide Bereavement Intent query as CCSD-62707.", async () => { await webChatUtils.sendMessage('My partner died'); });
    await test.step("Verify Web Messenger response..", async () => {
      expect(await webChatUtils.verifyChatbotRoboSaidResponse()).toBe(bereavementIntentData["Msg-If You Need To Let Us Know"]);
      expect(await webChatUtils.verifyChatbotRoboSaidResponse()).toBe(bereavementIntentData["Que-Have You Already Contacted?"]);
    });
    await test.step("Click No.", async () => { await webChatUtils.userClickNoButton(); });
    await test.step("Verify Web Messenger response.", async () => {
      expect(await webChatUtils.verifyChatbotRoboSaidResponse()).toBe(bereavementIntentData["Msg-LifeLedger Is A Free Online Tool"]);
      expect(await webChatUtils.verifyChatbotRoboSaidResponse()).toBe(bereavementIntentData["Que-Did You get The Help You Needed"]);
    });
    await test.step("Click No.", async () => { await webChatUtils.userClickNoButton(); });
    await test.step("Verify Web Messenger response.", async () => {
      expect(await webChatUtils.verifyChatbotRoboSaidResponse()).toBe(bereavementIntentData["Que-Do You Still Need Help"]);
    });
    await test.step("Click No.", async () => { await webChatUtils.userClickNoButton(); });
    await test.step("Verify Web Messenger response.", async () => {
      expect(await webChatUtils.verifyChatbotRoboSaidResponse()).toBe(bereavementIntentData["Que-Is There Anything Else"]);
    });
    await test.step("Click No.", async () => { await webChatUtils.userClickNoButton(); });
    await test.step("Verify Web Messenger response.", async () => {
      expect(await webChatUtils.verifyChatbotRoboSaidResponse()).toBe(bereavementIntentData["Msg-Thank You For Contacting"]);
    });
  });

});
////////////////////////////////////////////////////////////END OF WORKING HOURS TEST CASES////////////////////////////////////////////////////////////

test.describe('Out of Hours Bereavement Intent Update - CCSD-138541 Test Cases', () => {
  test('CCSD-138541_TC_05', async ({ webChatUtils, webChatActions }) => {
    // test.slow(); 
    test.setTimeout(90000); // Set timeout to 60 seconds for this test    
    await test.step("User Open Webmessenger,Navigate to Pre_int_1.1 scenario", async () => { await webChatActions.preIntent_2_1(); });
    await test.step("Provide Bereavement Intent query as CCSD-62707.", async () => { await webChatUtils.sendMessage('My partner died'); });
    await test.step("Verify Web Messenger response..", async () => {
      expect(await webChatUtils.verifyChatbotRoboSaidResponse()).toBe("If you need to let us know that one of our customers has passed away, we’re here to help you through the next steps.");
      expect(await webChatUtils.verifyChatbotRoboSaidResponse()).toBe("Have you already contacted us to advise someone has passed away?");
    });
    await test.step("Click Yes.", async () => {
      await webChatUtils.userClickYesButton();
    });
    await test.step("Verify Web Messenger response.", async () => {
      expect(await webChatUtils.verifyChatbotRoboSaidResponse()).toBe("Sorry, you've reached us outside of this teams opening hours.\n\nPlease contact us again Mon-Fri 8am-6pm.\n\nAlternatively, you can call the team within the hours given above on 0330 175 9683, or send an email to: bereavement@ovoenergy.com");
    });
  });
  test('CCSD-138541_TC_06', async ({ webChatUtils, webChatActions }) => {
    // test.slow(); 
    test.setTimeout(90000); // Set timeout to 60 seconds for this test 
    const bereavementIntentData = bereavementIntent_138541_Data[0];
    await test.step("User Open Webmessenger,Navigate to Pre_int_1.1 scenario", async () => { await webChatActions.preIntent_2_1(); });
    await test.step("Provide Bereavement Intent query as CCSD-62707.", async () => { await webChatUtils.sendMessage('My partner died'); });
    await test.step("Verify Web Messenger response..", async () => {
      expect(await webChatUtils.verifyChatbotRoboSaidResponse()).toBe(bereavementIntentData["Msg-If You Need To Let Us Know"]);
      expect(await webChatUtils.verifyChatbotRoboSaidResponse()).toBe(bereavementIntentData["Que-Have You Already Contacted?"]);
    });
    await test.step("Click No.", async () => { await webChatUtils.userClickNoButton(); });
    await test.step("Verify Web Messenger response.", async () => {
      expect(await webChatUtils.verifyChatbotRoboSaidResponse()).toBe(bereavementIntentData["Msg-LifeLedger Is A Free Online Tool"]);
      expect(await webChatUtils.verifyChatbotRoboSaidResponse()).toBe(bereavementIntentData["Que-Did You get The Help You Needed"]);
    });
    await test.step("Click No.", async () => { await webChatUtils.userClickNoButton(); });
    await test.step("Verify Web Messenger response.", async () => {
      expect(await webChatUtils.verifyChatbotRoboSaidResponse()).toBe("Sorry, you've reached us outside of this teams opening hours.\n\nPlease contact us again Mon-Fri 8am-6pm.\n\nAlternatively, you can call the team within the hours given above on 0330 175 9683, or send an email to: bereavement@ovoenergy.com");
    });
  });



});









