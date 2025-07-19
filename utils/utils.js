const { chromium } = require('@playwright/test')

module.exports = {
  launchBrowserAndPage: async () => {
    const browser = await chromium.launch()
    const page = await browser.newPage()
    return { browser, page }
  }
}
