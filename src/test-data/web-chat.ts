export interface WebChatTestData {
    url: string;
    deploymentId: string;
    firstName: string;
    lastName: string;
    email: string;
    accountNumber: string;
    postCode: string;
    dateOfBirth: string;
}

export const webChatTestData = [
    {
        url: "https://messenger-tests.mit-nonprod.ovotech.org.uk/test-pages/wm-deployment-test.html",
        deploymentId: "eca22cee-eb5c-4376-bc81-509a1fc07ae5",
        firstName: "Tester",
        lastName: "Master",
        email: "#",
        accountNumber: "#",
        postCode: "BS1 4ST",
        dateOfBirth: "01-01-1990",
    },
]