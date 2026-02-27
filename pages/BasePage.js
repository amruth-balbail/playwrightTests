/**
 * BasePage - Parent class for all page objects.
 * Contains shared navigation helpers and common actions.
 */
class BasePage {
  constructor(page) {
    this.page = page;
  }

  async navigate(path = '/') {
    await this.page.goto(path);
  }

  async getTitle() {
    return await this.page.title();
  }

  async getCurrentUrl() {
    return this.page.url();
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  async takeScreenshot(name) {
    await this.page.screenshot({ path: `screenshots/${name}.png` });
  }

  async closePage() {
    await this.page.close();
  }
}

module.exports = BasePage;
