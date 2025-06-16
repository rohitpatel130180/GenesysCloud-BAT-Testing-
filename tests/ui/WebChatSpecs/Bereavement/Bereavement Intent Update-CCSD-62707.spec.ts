import { TIMEOUT } from "dns";
import { test, expect } from "../../../../src/fixtures/genesys-fixtures"
import { annotate } from '../../../../src/utils/shared/annotate';


test(' User navigating through Bereavement intent flow ', async ({ page, webChatUtils, webChatActions }) => {
  // test.slow(); 
  test.setTimeout(90000); // Set timeout to 60 seconds for this test
  annotate("Given User navigates to the WebChat UI and logs in with valid credentials.");
  await webChatActions.userInitiateWebchat();
  annotate("And User checks that the initial greeting message from WebChat is displayed.");
  //await webChatActions.userVerifyGreetingsWithinOpeningHours();  
  await webChatActions.userVerifyGreetings();
  annotate("And User confirms they are an OVO customer by clicking 'Yes' and provides personal details.");
  await webChatActions.userExistingCustomerAndProvidePersonalDetails();
  annotate("When User specifies their query as 'Bereavement Intent Update-CCSD-62707'.");
  expect(await webChatUtils.verifyChatbotRoboSaidResponse()).toBe("Please tell me what type of query you have so I can help you find the right information, e.g. billing query, my online account, meter readings");
  await webChatUtils.sendMessage('My partner died');
  annotate("Then User receives bereavement guidance from the chatbot.");
  expect(await webChatUtils.verifyChatbotRoboSaidResponse()).toBe("If you need to let us know that one of our customers has passed away, we’re here to help you through the next steps.");
  expect(await webChatUtils.verifyChatbotRoboSaidResponse()).toBe("Have you already contacted us to advise someone has passed away?");
  annotate("And User confirms they have already contacted OVO about the bereavement.");
  await webChatUtils.userClickYesButton();
  annotate("And Chatbot asks if the user still needs help; user selects 'No'.");
  expect(await webChatUtils.verifyChatbotRoboSaidResponse()).toBe("Do you still need help and would like to talk to one of our agents?");
  await webChatUtils.userClickNoButton();
  annotate("And Chatbot asks if there is anything else; user selects 'No' again.");
  expect(await webChatUtils.verifyChatbotRoboSaidResponse()).toBe("Is there anything else I can help with?");
  await webChatUtils.userClickNoButton();
  annotate("Then Chatbot ends the conversation with a thank you message.");
  expect(await webChatUtils.verifyChatbotRoboSaidResponse()).toBe("Thank you for contacting OVO Energy. If you have any further questions just ask me anytime...");

});




