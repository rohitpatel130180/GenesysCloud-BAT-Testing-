import { TIMEOUT } from "dns";
import { test, expect } from "../../../../src/fixtures/genesys-fixtures"
import { annotate } from '../../../../src/utils/shared/annotate';


test('Bereavement_TC_01', async ({ webChatUtils, webChatActions }) => {
  // test.slow(); 
  test.setTimeout(90000); // Set timeout to 60 seconds for this test 
  await test.step("Open Web Messenger during working hours.", async () => { await webChatActions.userInitiateWebchat(); });
  await test.step("Verify initial greeting message.", async () => { await webChatActions.userVerifyGreetings(); });
  await test.step("Provide personnel details as an existing customer.", async () => { await webChatActions.userExistingCustomerAndProvidePersonalDetails(); });
  await test.step("Verify message from Web Messenger about customer's query.", async () => {
    expect(await webChatUtils.verifyChatbotRoboSaidResponse()).toBe("Please tell me what type of query you have so I can help you find the right information, e.g. billing query, my online account, meter readings");
  });
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
test('Bereavement_TC_02', async ({ webChatUtils, webChatActions }) => {
  // test.slow(); 
  test.setTimeout(90000); // Set timeout to 60 seconds for this test  
  await test.step("Open Web Messenger during working hours.", async () => { await webChatActions.userInitiateWebchat(); });
  await test.step("Verify initial greeting message.", async () => { await webChatActions.userVerifyGreetings(); });
  await test.step("Provide personnel details as an existing customer.", async () => { await webChatActions.userExistingCustomerAndProvidePersonalDetails(); });
  await test.step("Verify message from Web Messenger about customer's query.", async () => {
    expect(await webChatUtils.verifyChatbotRoboSaidResponse()).toBe("Please tell me what type of query you have so I can help you find the right information, e.g. billing query, my online account, meter readings");
  });
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
test('Bereavement_TC_03', async ({ webChatUtils, webChatActions }) => {
  // test.slow(); 
  test.setTimeout(90000); // Set timeout to 60 seconds for this test  
  await test.step("Open Web Messenger during working hours.", async () => { await webChatActions.userInitiateWebchat(); });
  await test.step("Verify initial greeting message.", async () => { await webChatActions.userVerifyGreetings(); });
  await test.step("Provide personnel details as an existing customer.", async () => { await webChatActions.userExistingCustomerAndProvidePersonalDetails(); });
  await test.step("Verify message from Web Messenger about customer's query.", async () => {
    expect(await webChatUtils.verifyChatbotRoboSaidResponse()).toBe("Please tell me what type of query you have so I can help you find the right information, e.g. billing query, my online account, meter readings");
  });
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




