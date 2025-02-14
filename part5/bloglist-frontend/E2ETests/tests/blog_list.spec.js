const { test, expect, beforeEach, describe } = require('@playwright/test')
const helper = require('./helper.js')

test.describe.serial('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await helper.createUser(request, 'tester', 'Mr Tester', 'testing')

    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    const locator = await page.getByText('log in to application')
    await expect(locator).toBeVisible() 
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await helper.loginWith(page, 'tester', 'testing')

      const locator = await page.getByText('tester logged in')
      await expect(locator).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await helper.loginWith(page, 'tester', 'wrong')

      const locator = await page.getByText('wrong username or password')
      await expect(locator).toBeVisible()
    })

    describe('When logged in', () => {
      beforeEach(async ({ page }) => {
        await helper.loginWith(page, 'tester', 'testing')
      })
    
      test('a new blog can be created', async ({ page }) => {
        await helper.createBlog(page, 'title', 'author', 'url')

        const locator = await page.getByText('title author')
        await expect(locator).toBeVisible()
      })

      describe('When a blog exists', () => {
        beforeEach(async ({ page }) => {
          await helper.createBlog(page, 'title', 'author', 'url')
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

        test('the blog can be deleted', async ({ page }) => {
          const div = await page.getByText('title author')
          await div.getByRole('button').click()

          await page.once('dialog', async dialog => { await dialog.accept() })
          await div.getByRole('button').filter({ hasText: 'remove' }).click()

          await expect(div).toHaveCount(0)
        })

        test('only the user who added the blog sees the blog\'s delete button', async ({ page, request }) => {
          await page.getByRole('button').filter({ hasText: 'logout' }).click()
          await helper.createUser(request, 'username', 'name', 'password')
          await helper.loginWith(page, 'username', 'password')

          const div = await page.getByText('title author')
          await div.getByRole('button').click()
          
          const locator = await div.getByRole('button').filter({ hasText: 'remove' })
          await expect(locator).toHaveCount(0)
        })
      })

      test('blogs are arranged in the order according to the likes', async ({ page }) => {
        await helper.createBlog(page, 'first', 'first', 'first')
        const firstBlog = await page.getByText('first first')
        await firstBlog.getByRole('button').click()
        await firstBlog.getByRole('button').filter({ hasText: 'like' }).click()

        await helper.createBlog(page, 'second', 'second', 'second')
        const secondBlog = await page.getByText('second second')
        
        await page.getByText('likes 1').waitFor()
        await expect(page.locator('.blog').first()).toContainText('first first')

        await secondBlog.getByRole('button').click()
        await secondBlog.getByRole('button').filter({ hasText: 'like' }).click()
        await page.waitForTimeout(500)
        await secondBlog.getByRole('button').filter({ hasText: 'like' }).click()
 
        await page.getByText('likes 2').waitFor()
        await expect(page.locator('.blog').first()).toContainText('second second')
      })
    })
  })
})