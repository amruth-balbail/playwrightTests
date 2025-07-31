import { defineConfig, devices } from '@playwright/test';
require('dotenv').config();
export default defineConfig({
  // Look for test files in the "tests" directory, relative to this configuration file.
  testDir: 'tests',

  // Global setup for authentication
  globalSetup: './global-setup.js',
  globalTeardown:'./global-teardown.js',


  // Run all tests in parallel.
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only in the source code.
  forbidOnly: !!process.env.CI,

  // Retry on CI only.
  retries: process.env.CI ? 2 : 0,

  // Opt out of parallel tests on CI.
  workers: process.env.CI ? 1 : undefined,

  // Reporter to use
  reporter: 'html',

  use: {
    // Base URL to use in actions like `await page.goto('/')`.
    baseURL: process.env.BASE_URL,
    storageState: 'storage/auth.json',

    // Collect trace when retrying the failed test.
    trace: 'on-first-retry',
    healess: true,
    viewport: {width:1280, height: 1024},
    screenshot: 'only-on-failure',
    permissions: ['clipboard-read','clipboard-write'],
  },
  // Configure projects for major browsers.
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});