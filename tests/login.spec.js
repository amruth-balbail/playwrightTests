
import { test, expect } from '@playwright/test';


test('has title', async ({ page }) => {
  await page.goto(process.env.BASE_URL);

  // verify title
  await expect(page).toHaveTitle(/Swag Labs/);
  await expect(async () => {
   await expect(page.locator('#user-name')).toBeVisible()
}).toPass();
// enter user name
await page.locator('#user-name').type(process.env.USERNAME);
// enter password
await page.locator('#password').type(process.env.PASSWORD);
// click on login button
await page.locator('[data-test="login-button"]').click();

});