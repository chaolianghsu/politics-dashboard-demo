import { test, expect } from '@playwright/test'

async function loginAsDemo(page) {
  await page.goto('/login')
  await page.getByLabel('帳號').fill('demo@dailyview.tw')
  await page.getByLabel('密碼').fill('demo123')
  await page.getByText('我不是機器人').click()
  await page.getByRole('button', { name: '登入' }).click()
  await expect(page).toHaveURL(/\/prediction/)
}

test.describe('Demo Navigation — post-login pages', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsDemo(page)
  })

  test('prediction page loads with mock data', async ({ page }) => {
    await expect(page).toHaveURL(/\/prediction/)
    await expect(page.locator('body')).not.toBeEmpty()
  })

  test('can navigate to reputation page', async ({ page }) => {
    await page.goto('/reputation')
    await expect(page).toHaveURL(/\/reputation/)
    await expect(page.locator('body')).not.toBeEmpty()
  })

  test('can navigate to reputation/spread', async ({ page }) => {
    await page.goto('/reputation/spread')
    await expect(page).toHaveURL(/\/reputation\/spread/)
  })

  test('can navigate to reputation/volume', async ({ page }) => {
    await page.goto('/reputation/volume')
    await expect(page).toHaveURL(/\/reputation\/volume/)
  })

  test('can navigate to reputation/favorability', async ({ page }) => {
    await page.goto('/reputation/favorability')
    await expect(page).toHaveURL(/\/reputation\/favorability/)
  })

  test('can navigate to reputation/hotkeyword', async ({ page }) => {
    await page.goto('/reputation/hotkeyword')
    await expect(page).toHaveURL(/\/reputation\/hotkeyword/)
  })

  test('unauthenticated access redirects to login', async ({ page }) => {
    await page.evaluate(() => {
      localStorage.removeItem('politics_access')
      localStorage.removeItem('politics_refresh')
    })
    await page.goto('/prediction')
    await expect(page).toHaveURL(/\/login/)
  })
})
