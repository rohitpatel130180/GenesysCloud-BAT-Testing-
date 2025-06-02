import { test, expect } from "../../src/fixtures/genesys-fixtures"
import { annotate } from '../../src/utils/shared/annotate';
/*
Feature: OVO Collections IVR Refund Request

  As a Genesys user
  I want to initiate a refund request through the IVR
  So that customer refunds can be processed efficiently

  Scenario: Successfully Requesting a Refund via IVR
    Given I am logged into Genesys
    And the IVR "UAT_IVR004_OVO_Collections_OpenAction" is configured 
    When I dial the Test Number
    And I press "#" twice
    And I say "Request Refund"
    And I press "1"
    And I enter the mobile phone number "07700900123"
    Then I should hear an acknowledgment of the refund request
    And I should be prompted for further details or confirmation
    And the system should log the refund request with mobile "07700900123"

*/
test("UAT_IVR004_OVO_Collection_Open Test", async ({ page,genesysSiteActions }) => {
    annotate('Given I am logged into Genesys'); 

    annotate('And the IVR "UAT_IVR004_OVO_Collections_OpenAction" is configured');
    annotate('When I dial the Test Number');
    annotate('And I press "#" twice');
    annotate('And I say "Request Refund"');
    annotate('And I press "1"');
    annotate('And I enter the mobile phone number "07700900123"');
    annotate('Then I should hear an acknowledgment of the refund request');
    annotate('And I should be prompted for further details or confirmation');
    annotate('And the system should log the refund request with mobile "07700900123"');
    
})

