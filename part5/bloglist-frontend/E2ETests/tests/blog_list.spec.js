const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/tests/reset')
    await request.post('/api/users', {
      data: {
        name: 'Mr Tester',
        username: 'tester',
        password: 'testing'
      }
    })

    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    const locator = await page.getByText('log in to application')
    await expect(locator).toBeVisible() 
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.locator('div').filter({ hasText: /^username$/ })
        .getByRole('textbox').fill('tester')
      await page.locator('div').filter({ hasText: /^password$/ })
        .getByRole('textbox').fill('testing')
      await page.getByRole('button').click()

      const locator = await page.getByText('tester logged in')
      await expect(locator).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.locator('div').filter({ hasText: /^username$/ })
        .getByRole('textbox').fill('tester')
      await page.locator('div').filter({ hasText: /^password$/ })
        .getByRole('textbox').fill('wrong')
      await page.getByRole('button').click()

      const locator = await page.getByText('wrong username or password')
      await expect(locator).toBeVisible()
    })
  })
})