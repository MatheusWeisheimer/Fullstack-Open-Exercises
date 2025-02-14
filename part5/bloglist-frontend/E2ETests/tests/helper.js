const loginWith = async (page, username, password) => {
  await page.locator('div').filter({ hasText: /^username$/ })
    .getByRole('textbox').fill(username)
  await page.locator('div').filter({ hasText: /^password$/ })
    .getByRole('textbox').fill(password)
  await page.getByRole('button').click()
}

const createBlog = async (page, title, author, url) => {
  await page.getByRole('button').filter({ hasText: 'create blog' }).click()
  await page.locator('#title').fill(title)
  await page.locator('#author').fill(author)
  await page.locator('#url').fill(url)
  await page.getByRole('button').filter({ hasText: 'create' }).click()
  await page.getByText(`${title} ${author}`).waitFor()
}

const createUser = async (request, username, name, password) => {
  await request.post('/api/users', {
    data: {
      name: name,
      username: username,
      password: password
    }
  })
}

export { loginWith, createBlog, createUser }