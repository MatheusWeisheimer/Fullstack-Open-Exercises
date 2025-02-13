const { test, expect, beforeEach, describe } = require('@playwright/test')
const helper = require('./helper.js')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
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
      helper.loginWith(page, 'tester', 'testing')

      const locator = await page.getByText('tester logged in')
      await expect(locator).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      helper.loginWith(page, 'tester', 'wrong')

      const locator = await page.getByText('wrong username or password')
      await expect(locator).toBeVisible()
    })

    describe('When logged in', () => {
      beforeEach(async ({ page }) => {
        helper.loginWith(page, 'tester', 'testing')
      })
    
      test('a new blog can be created', async ({ page }) => {
        helper.createNote(page, 'title', 'author', 'url')

        const locator = await page.getByText('title author')
        await expect(locator).toBeVisible()
      })

      describe('When a blog exists', () => {
        beforeEach(async ({ page }) => {
          helper.createNote(page, 'title', 'author', 'url')
        })

        test('the blog can be liked', async ({ page }) => {
          const div = await page.getByText('title author')
          await div.getByRole('button').click()

          const likesBefore = await div.getByText('likes 0')
          await expect(likesBefore).toBeVisible()

          await div.getByRole('button').filter({ hasText: 'like' }).click()
          
          const likesAfter = await div.getByText('likes 1')
          await expect(likesAfter).toBeVisible()
        })
      })
    })
  })
})