const { chromium } = require('@playwright/test')
const UTILS = require('./utils/utils')
module.exports = async () => {
  const { page } = await UTILS.launchBrowserAndPage()
  await page.goto('https://www.google.com')
  await page.waitForTimeout(1000)
}
