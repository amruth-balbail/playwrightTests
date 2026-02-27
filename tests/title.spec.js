const { test } = require('../utils/fixtures');
const { expect } = require('@playwright/test');

test.describe('Basic Tests', () => {

  test('has title and backpack is visible', async ({ inventoryPage }) => {
    await inventoryPage.navigate();

    // Verify the inventory item is visible using the page object
    await expect(inventoryPage.backpackItem).toBeVisible();
    console.log('verified the inventory item is visible');

    await inventoryPage.closePage();
  });

});
