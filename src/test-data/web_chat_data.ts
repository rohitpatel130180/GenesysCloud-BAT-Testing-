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
        // firstName: "Tester",
        // lastName: "Master",
        // email: "#",
        // accountNumber: "#",
        // postCode: "BS1 4ST",
        // dateOfBirth: "01-01-1990",
    },
]
export const existingCustomerData = [
    {
        firstName: 'Existing Tester',
        lastName: 'Existing Master',
        email: '#',
        accountNumber: '#',
        postCode: 'BS1 4ST',
        dateOfBirth: '01-01-1990'
    }
];

export const nonCustomerData = [
    {
        firstName: 'Non Tester',
        lastName: 'Non Master',
        email: '#',

    }
];

export const inHoursOpeningJourneyMsg = [
    {
        'HelloMessage': 'Hello, I’m OVO’s digital assistant and I’m here to help.',
        'IJustNeedMessage': `I just need a few details first for security. Providing this will help me get you the right support quickly, whether it's self-serve you're after or connecting you with the right team`,
    }
]

export const outHoursOpeningJourneyMsg = [
    {
        'HelloMessage': 'Hello, I’m OVO’s digital assistant and I can help point you in the right direction.',
        'PaygQuestion': 'Do you have a Pay As You Go meter that you top up?',
        //// PAYG CUSTOMER QUESTIONS/MESSAGES ////
        'YesPaygQuestionMsg': "Sorry, our team isn't working right now.\n\nYou can speak to them 8am till 8pm Monday to\nFriday, and 9am till 5pm Saturday and Sunday.\n\nThere's lots of advice online in our Help Centre too.",
        'PaygInMeantimeMsg': 'n the meantime, I might be able to help. Would you like me to try?',
        'PaygYesToInMeantimeMsg(1)': 'Great. I just need to run through a few security details first. This’ll help me get you the right support, quickly.',
        'PaygYesToInMeantimeMsag(2)': `I just need a few details first for security. Providing this will help me get you the right support quickly, whether it's self-serve you're after or connecting you with the right team`,
        'PaygNoToInMeantimeMsg': `Got it. Our team are available 8am till 8pm Monday to Friday, and 9am till 5pm on Saturday and Sunday.\n\nIf you'd like, you can still check out our Help Centre for support.\n\nThanks for getting in touch. If you need anything else, just ask me anytime.`,

        //// END OF PAYG CUSTOMER QUESTIONS/MESSAGES ////

        //// NON-PAYG CUSTOMER QUESTIONS/MESSAGES  ////
        'NoPaygQuestionMsg': "Sorry, our team isn't working right now.\n\nYou can speak to them 8am till 6pm Monday to\nFriday, and 9am till 2pm Saturday.\n\nThere's lots of advice online in our Help Centre too.",
        'NonPaygInMeantimeMsg': 'n the meantime, I might be able to help. Would you like me to try?',
        'NonPaygYesToInMeantimeMsg(1)': 'Great. I just need to run through a few security details first. This’ll help me get you the right support, quickly.',
        'NonPaygYesToInMeantimeMsag(2)': `I just need a few details first for security. Providing this will help me get you the right support quickly, whether it's self-serve you're after or connecting you with the right team`,
        'NonPaygNoToInMeantimeMsg': `Got it. Our team are available 8am till 6pm Monday to Friday, and 9am till 2pm on Saturday\n\nIf you'd like, you can still check out our Help Centre for support.\n\nThanks for getting in touch. If you need anything else, just ask me anytime.`,

        //// END OF NON-PAYG CUSTOMER QUESTIONS/MESSAGES ////

    }
]