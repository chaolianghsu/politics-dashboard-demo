import { test, expect } from '@playwright/test'

test.describe('Demo Login Flow', () => {
  test('shows fake reCAPTCHA on login page', async ({ page }) => {
    await page.goto('/login')
    await expect(page.getByText('我不是機器人')).toBeVisible()
  })

  test('login with demo account succeeds', async ({ page }) => {
    await page.goto('/login')
    await page.getByLabel('帳號').fill('demo@dailyview.tw')
    await page.getByLabel('密碼').fill('demo123')
    await page.getByText('我不是機器人').click()
    await page.getByRole('button', { name: '登入' }).click()
    await expect(page).toHaveURL(/\/prediction/)
  })

  test('login with admin account still works', async ({ page }) => {
    await page.goto('/login')
    await page.getByLabel('帳號').fill('admin')
    await page.getByLabel('密碼').fill('admin')
    await page.getByText('我不是機器人').click()
    await page.getByRole('button', { name: '登入' }).click()
    await expect(page).toHaveURL(/\/prediction/)
  })

  test('login with wrong credentials shows error', async ({ page }) => {
    await page.goto('/login')
    await page.getByLabel('帳號').fill('wrong@test.com')
    await page.getByLabel('密碼').fill('wrong')
    await page.getByText('我不是機器人').click()
    await page.getByRole('button', { name: '登入' }).click()
    await expect(page.getByText('請確認帳號密碼是否正確')).toBeVisible()
  })

  test('submit without reCAPTCHA shows validation error', async ({ page }) => {
    await page.goto('/login')
    await page.getByLabel('帳號').fill('demo@dailyview.tw')
    await page.getByLabel('密碼').fill('demo123')
    await page.getByRole('button', { name: '登入' }).click()
    await expect(page.getByText('請進行驗證')).toBeVisible()
  })
})
