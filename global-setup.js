const { expect, chromium } = require('@playwright/test');
const UTILS = require('./utils/utils');
const fs = require('fs');

module.exports = async () => {
  console.log('Starting global setup...');
  const { browser, page } = await UTILS.launchBrowserAndPage();
  try {
    console.log('Navigating to:', process.env.BASE_URL);
    await page.goto(process.env.BASE_URL);
    
    console.log('Current page URL:', page.url());
    console.log('Page title:', await page.title());

    // Wait for login form to be visible
    console.log('Waiting for login form...');
    await expect(page.locator('#user-name')).toBeVisible({ timeout: 10000 });
    console.log('Login form found');

    // Fill in login credentials
    console.log('Filling login credentials...');
    await page.locator('#user-name').fill(process.env.LOGIN_USER);
    await page.locator('#password').fill(process.env.LOGIN_PASSWORD);
    
    console.log('Clicking login button...');
    await page.locator('#login-button').click();

    // Wait for navigation and page load
    console.log('Waiting for page to load after login...');
    await page.waitForLoadState('networkidle', { timeout: 10000 });
    
    console.log('Current page URL after login:', page.url());
    console.log('Page title after login:', await page.title());

    // Wait for inventory page to load
    console.log('Waiting for inventory item...');
    await expect(page.locator('[data-test*="inventory-item-sauce-labs-backpack"]')).toBeVisible({ timeout: 15000 });
    console.log('Inventory item found - login successful');

    // Save storage state for reuse
    console.log('Saving storage state...');
    await page.context().storageState({ path: 'storage/auth.json' });
    console.log('Storage state saved successfully');

  } catch (error) {
    console.error('Global setup failed:', error.message);
    
    // Take screenshot for debugging
    await page.screenshot({ path: 'global-setup-error.png' });
    console.log('Screenshot saved as global-setup-error.png');
    
    // Log page content for debugging
    const pageContent = await page.content();
    console.log('Page HTML:', pageContent.substring(0, 1000) + '...');
    
    throw error;
  } finally {
    await browser.close();
    console.log('Global setup completed');
  }
};
