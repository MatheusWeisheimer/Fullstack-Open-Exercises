const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')


const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },  
]

describe('dummy', () => {
  test('returns one', () => {
    const blogs = []
  
    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
  })
})

describe('totalLikes', () => {
  test('of empy list is 0', () => {
    assert.strictEqual(listHelper.totalLikes([]), 0)
  })

  test('when list has only one blog equals the likes of that', () => {
    assert.strictEqual(listHelper.totalLikes([{likes: 3}]), 3)
  })

  test('of a bigger list is calculated right', () => {
    assert.strictEqual(listHelper.totalLikes(blogs), 24)
  })
})

describe('favoriteBlog', () => {
  test('of empty list is undefined', () => {
    assert.strictEqual(listHelper.favoriteBlog([]), undefined)
  })

  test('of list of length 1 is calculated right', () => {
    assert.deepStrictEqual(listHelper.favoriteBlog([blogs[0]]), blogs[0])
  })

  test('of list of length 3 is calculated right', () => {
    assert.deepStrictEqual(listHelper.favoriteBlog(blogs), blogs[2])
  })
})

describe('mostBlogs', () => {
  test('of empty list is undefined', () => {
    assert.strictEqual(listHelper.mostBlogs([]), undefined)
  })

  test('of list of length 1 is calculated right', () => {
    assert.deepStrictEqual(listHelper.mostBlogs([blogs[0]]), {author: 'Michael Chan', blogs: 1})
  })

  test('of list of length 3 is calculated right', () => {
    assert.deepStrictEqual(listHelper.mostBlogs(blogs), {author: 'Edsger W. Dijkstra', blogs: 2})
  })
})


describe('mostLikes', () => {
  test('of empty list is undefined', () => {
    assert.strictEqual(listHelper.mostLikes([]), undefined)
  })

  test('of list of length 1 is calculated right', () => {
    assert.deepStrictEqual(listHelper.mostLikes([blogs[0]]), {author: 'Michael Chan', likes: 7})
  })

  test('of list of length 3 is calculated right', () => {
    assert.deepStrictEqual(listHelper.mostLikes(blogs), {author: 'Edsger W. Dijkstra', likes: 17})
  })
})