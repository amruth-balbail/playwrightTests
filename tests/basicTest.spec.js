
import { test, expect } from '@playwright/test';

test.describe('Basic Tests', () => {

test('has title', async ({ page }) => {
      // verify title
      await expect(async () => {
  await expect(page.locator('[data-test*="inventory-item-sauce-labs-backpack"]')).toBeVisible()
   }).toPass();

});
});