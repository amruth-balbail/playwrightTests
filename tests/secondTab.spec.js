const { test } = require('../utils/fixtures');
const { expect, chromium } = require('@playwright/test');
const InventoryPage = require('../pages/InventoryPage');

test.describe('Second tab handling', () => {

  test('Child window via social link', async ({ inventoryPage }) => {
    await inventoryPage.navigate();

    // Open Twitter link in a child window using page object
    const popup = await inventoryPage.clickTwitterLink();

    // Verify URL of the child window
    await popup.waitForURL('**/saucelabs');
    await popup.close();
  });

  test('Child window via new browser context', async () => {
    console.log('starting the test - Child window method 2');

    // Create a child window using a standalone browser context
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    const inventoryPage = new InventoryPage(page);
    await inventoryPage.navigate();

    // Verify the inventory item is visible using the page object
    await expect(inventoryPage.backpackItem).toBeVisible();

    await page.close();
    await context.close();
    await browser.close();
  });

});
