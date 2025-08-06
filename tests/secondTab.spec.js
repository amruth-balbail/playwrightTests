  
import { test, expect, chromium } from '@playwright/test';
test.describe('Second tab handling', () => {

  test('Child window', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/inventory.html');
  await page.waitForTimeout(5000)
  await  page.locator('[data-test="social-twitter"]').scrollIntoViewIfNeeded()
  //create a child window
  const [page1] = await Promise.all([
   page.waitForEvent('popup'),
   page.locator('[data-test="social-twitter"]').click(),
  ]);

  // verify url of the child window
  await page1.waitForURL('**/saucelabs');
  await page1.close();
});

 test('Child window method 2', async ({ page }) => {
  console.log('srating the test - Child window method 2')
  // create a child window using a browser context
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page1 = await context.newPage();
  await page1.goto('https://www.saucedemo.com/inventory.html');
  await page1.waitForTimeout(5000)
  // Verify the inventory item is visible
  await expect(page1.locator('[data-test*="inventory-item-sauce-labs-backpack"]')).toBeVisible();
    await page1.close();
    await context.close();
    await browser.close();
});
});