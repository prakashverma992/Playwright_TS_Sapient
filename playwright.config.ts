import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./src/tests/specs/", // Directory for test specs
  timeout: 60000, // Default timeout per test (60s)
  retries: process.env.CI ? 2 : 0, // Retry failed tests up to 2 times
  fullyParallel: true, // Run tests in parallel
  forbidOnly: !!process.env.CI, // Prevent accidental .only in CI
  workers: process.env.CI ? 1 : undefined, // Limit workers in CI
  reporter: "html",

  // Shared settings across all projects
  use: {
    baseURL: "https://www.saucedemo.com",
    headless: false, // Set to true for headless mode
    trace: "on-first-retry", // Collect trace on first retry
    screenshot: "on", // Capture screenshot on failure
    video: "off",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "Chromium",
      use: {
        ...devices["Desktop Chrome"],
        viewport: null,
        deviceScaleFactor: undefined,
        launchOptions: {
          args: ["--start-maximized"],
        },
      },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

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
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
