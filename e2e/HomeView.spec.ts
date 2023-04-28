import { test, expect } from '@playwright/test'

test('has title', async ({ page }) => {
  // Expect a title "to contain" a substring.
  await page.goto('/')
  await expect(page).toHaveTitle(/Vite App/)
})

test('has a button', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'GET STARTED' }).click()
})
