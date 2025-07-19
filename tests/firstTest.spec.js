import { test, expect } from '@playwright/test'

test('has title', async ({ page }) => {
  await page.goto('https://demoqa.com/')
  await expect(page).toHaveTitle(/DEMOQA/)
})
