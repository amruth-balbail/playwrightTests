
class DemoQAPage {
  constructor(page) {
    this.page = page;
    this.url = process.env.BASE_URL || 'https://demoqa.com/';
    this.title = 'DEMOQA';
  }

  async goto(url) {
    await this.page.goto(url);
  }

  async waitForElement(selector) {
    await this.page.waitForSelector(selector);
  }

  async click(selector) {
    await this.page.click(selector);
  }

  async fill(selector, text) {
    await this.page.fill(selector, text);
  }

  async getText(selector) {
    return await this.page.textContent(selector);
  }

  async navigateToHome() {
    await this.goto(this.url);
  }

  async getPageTitle() {
    return await this.page.title();
  }

  async clickElement(elementName) {
    const selector = `text=${elementName}`;
    await this.click(selector);
  }
}

module.exports = DemoQAPage;
