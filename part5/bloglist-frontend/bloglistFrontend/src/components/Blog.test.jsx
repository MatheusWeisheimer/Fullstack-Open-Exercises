import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, test } from 'vitest'
import Blog from './Blog'
import BlogForm from './BlogForm'

describe('<Blog />', () => {
  let container

  const blog = {
    title: 'testing',
    author: 'tester',
    url: 'testing.com',
    user: {
      username: 'tester',
      name: 'Mr Tester',
    }
  }

  const user = {
    username: 'tester',
    name: 'Mr Tester',
  }

  const loadBlogs = vi.fn()
  const mockHandler = vi.fn()

  beforeEach(() => {
    container = render(<Blog blog={blog} handleLike={mockHandler} loadBlogs={loadBlogs} user={user}/>).container
  })

  test('renders title and author, does not render URL or likes by default', () => {
    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent('testing tester')

    const detail = container.querySelector('.detail')
    expect(detail).toHaveStyle('display: none')
  })

  test('URL and likes are shown when "view" button is clicked', async () => {
    const user = userEvent.setup()
    const button = container.querySelector('.toggleBtn')
    await user.click(button)

    const detail = container.querySelector('.detail')
    expect(detail).not.toHaveStyle('display: none')
  })

  test('when the like button is clicked twice, the event handler is called twice', async () => {
    const user = userEvent.setup()

    const toggleBtn = container.querySelector('.toggleBtn')
    await user.click(toggleBtn)

    const likeBtn = container.querySelector('.likeBtn')
    await user.click(likeBtn)
    await user.click(likeBtn)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})

describe('<BlogForm />', () => {
  test('the form calls the event handler received as props with the right details', async () => {
    const mockHandler = vi.fn()
    const { container } = render(<BlogForm handleCreate={mockHandler}/>)

    const user = userEvent.setup()

    const title = container.querySelector('#title')
    const author = container.querySelector('#author')
    const url = container.querySelector('#url')
    const createBtn = container.querySelector('.createBtn')

    await user.type(title, 'title')
    await user.type(author, 'author')
    await user.type(url, 'url')
    await user.click(createBtn)

    expect(mockHandler.mock.calls).toHaveLength(1)
    console.log(mockHandler.mock.calls[0][0].title)

    expect(mockHandler.mock.calls[0][0].title).toBe('title')
    expect(mockHandler.mock.calls[0][0].author).toBe('author')
    expect(mockHandler.mock.calls[0][0].url).toBe('url')
  })
})
