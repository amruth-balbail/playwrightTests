const { expect, chromium } = require('@playwright/test');
const UTILS = require('./utils/utils');
const fs = require('fs');

module.exports = async () => {
  const { browser, page } = await UTILS.launchBrowserAndPage();

  await page.goto(process.env.BASE_URL);

  await expect(page.locator('#user-name')).toBeVisible();

  await page.locator('#user-name').type(process.env.LOGIN_USER);
  await page.locator('#password').type(process.env.PASSWORD);
  await page.locator('#login-button').click();

  await page.waitForTimeout(3000)
  await expect(page.locator('[data-test*="inventory-item-sauce-labs-backpack"]')).toBeVisible();

  // Save storage state for reuse
  await page.context().storageState({ path: 'storage/auth.json' });

  await browser.close();
};
