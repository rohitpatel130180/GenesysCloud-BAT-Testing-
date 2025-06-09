// audio.spec.js
const { test, expect } = require('@playwright/test');
const path = require('path');

test('should play audio and attempt speech recognition', async ({ page }) => {
    // Construct the file URL for the local HTML page.
    // This assumes audio_test_page.html is in the same directory as this test file.
    const htmlFilePath = path.resolve(__dirname, 'audio_test_page.html');
    await page.goto(`file://${htmlFilePath}`);

    // Wait for the main elements to be visible on the page.
    await page.waitForSelector('#playAudioBtn', { state: 'visible' });
    await page.waitForSelector('#startRecognitionBtn', { state: 'visible' });
    await page.waitForSelector('#transcriptionResult', { state: 'visible' });

    console.log('Page loaded and elements are visible.');

    // Click the "Play Audio" button to start audio playback.
    console.log('Clicking "Play Audio" button...');
    await page.click('#playAudioBtn');

    // Wait for a few seconds to allow the audio to play.
    // The duration here is arbitrary; for a real test, you might wait for the 'ended' event
    // on the audio element if the audio is short and known.
    await page.waitForTimeout(5000); // Wait 5 seconds for the audio to play

    // Verify that the status message indicates audio playback has finished.
    const audioStatus = await page.textContent('#statusMessage');
    expect(audioStatus).toContain('Audio finished playing.');
    console.log('Audio playback initiated and status confirmed.');

    // Click the "Start Speech Recognition" button.
    // Note: Speech Recognition API requires user interaction and browser permission.
    // In headless mode, this might require specific browser arguments to pre-grant permissions,
    // or mocking the permission prompt. For local headful testing, you might be prompted once.
    console.log('Clicking "Start Speech Recognition" button...');
    await page.click('#startRecognitionBtn');

    // Wait for the speech recognition to process and update the result div.
    // This uses `waitForFunction` to wait until the text in '#transcriptionResult'
    // changes to include "Transcribed:". This is more robust than a fixed timeout.
    await page.waitForFunction(
        selector => document.querySelector(selector).textContent.includes('Transcribed:'),
        '#transcriptionResult',
        { timeout: 15000 } // Maximum 15 seconds wait for transcription
    );

    // Retrieve the transcribed text.
    const transcribedText = await page.textContent('#transcriptionResult');
    console.log('Transcribed Text:', transcribedText);

    // Assert that some text was transcribed.
    // Since the example audio is instrumental, the actual transcribed words will likely be empty.
    // We are primarily testing the *mechanism* of transcription here.
    // For a real test with spoken words, you would assert against expected phrases.
    expect(transcribedText).not.toContain('Transcription will appear here...'); // Should not be initial placeholder
    expect(transcribedText).toContain('Transcribed:'); // Should contain the prefix indicating processing
    // If your audio had "Hello world", you'd use: expect(transcribedText).toContain('Hello world');

    console.log('Speech recognition completed and result asserted.');
});