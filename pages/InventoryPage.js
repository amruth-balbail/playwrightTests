const BasePage = require('./BasePage');

/**
 * InventoryPage - Encapsulates all inventory page selectors and actions.
 * URL: /inventory.html
 */
class InventoryPage extends BasePage {
  constructor(page) {
    super(page);

    // Selectors
    this.backpackItem = page.locator('[data-test*="inventory-item-sauce-labs-backpack"]');
    this.inventoryItems = page.locator('.inventory_item');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
    this.twitterLink = page.locator('[data-test="social-twitter"]');
    this.facebookLink = page.locator('[data-test="social-facebook"]');
    this.linkedinLink = page.locator('[data-test="social-linkedin"]');
  }

  async navigate() {
    await super.navigate('/inventory.html');
  }

  async isBackpackVisible() {
    return await this.backpackItem.isVisible();
  }

  async getInventoryItemCount() {
    return await this.inventoryItems.count();
  }

  async addItemToCartByName(itemTestId) {
    await this.page.locator(`[data-test="add-to-cart-${itemTestId}"]`).click();
  }

  async removeItemFromCartByName(itemTestId) {
    await this.page.locator(`[data-test="remove-${itemTestId}"]`).click();
  }

  async getCartItemCount() {
    if (await this.cartBadge.isVisible()) {
      return parseInt(await this.cartBadge.textContent());
    }
    return 0;
  }

  async sortBy(option) {
    await this.sortDropdown.selectOption(option);
  }

  async clickTwitterLink() {
    await this.twitterLink.scrollIntoViewIfNeeded();
    const [popup] = await Promise.all([
      this.page.waitForEvent('popup'),
      this.twitterLink.click(),
    ]);
    return popup;
  }

  async clickSocialLink(linkLocator) {
    await linkLocator.scrollIntoViewIfNeeded();
    const [popup] = await Promise.all([
      this.page.waitForEvent('popup'),
      linkLocator.click(),
    ]);
    return popup;
  }
}

module.exports = InventoryPage;
