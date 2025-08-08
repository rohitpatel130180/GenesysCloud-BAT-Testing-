import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config'
import { title } from 'process';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({

  testDir: './tests/ui/WebChatSpecs', // Directory where your tests are located
  /* Run tests in files in parallel */
  fullyParallel: true,
  // Changed on 07/07/2025 to run tests in parallel
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 1,
  // Only failed tests will be retried once after the full run
  /* Opt out of parallel tests on CI. */
  //retries: process.env.CI ? 2 : 1, // or set different numbers if you want //Changed on 07/07/2025
  workers: process.env.CI ? 1 : 3,
  //workers: process.env.CI ? 1 : undefined, // Changed on 07/07/2025 to run tests in parallel
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  //reporter: 'html',
  reporter: [
    ['html', { outputFolder: 'TestReportOutput' }]
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {


    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',
    video: 'retain-on-failure',
    //video: 'on',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */


    testIdAttribute: 'data-test',
    //trace: 'on-first-retry',
    permissions: ['microphone', 'camera'],

  },


  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        launchOptions: {
          //slowMo: 3000, // This will slow down the execution of each step by 2 seconds
          args: [

            '--use-fake-device-for-media-stream',
            '--use-fake-ui-for-media-stream',
            // '--use-file-for-fake-audio-capture=/path/to/your/audio.wav',
          ],
        },

      },

    }

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    //
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
