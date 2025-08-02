
import { test, expect } from '@playwright/test';


test.describe('Basic Tests', () => {

  test('has title', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/inventory.html');
    
    // Verify the inventory item is visible
    await expect(page.locator('[data-test*="inventory-item-sauce-labs-backpack"]')).toBeVisible();
    console.log('verified the inventory item is visible')
     await page.close();
  });

});