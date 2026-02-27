const { test: base } = require('@playwright/test');
const { LoginPage, InventoryPage } = require('../pages');

/**
 * Custom test fixtures that inject page objects into tests.
 *
 * Usage in tests:
 *   const { test, expect } = require('../utils/fixtures');
 *   test('my test', async ({ inventoryPage }) => { ... });
 */
const test = base.extend({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  inventoryPage: async ({ page }, use) => {
    const inventoryPage = new InventoryPage(page);
    await use(inventoryPage);
  },
});

module.exports = { test };
