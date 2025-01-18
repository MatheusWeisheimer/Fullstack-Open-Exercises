const { test, describe, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})

    for (let blog of helper.initialBlogs) {
        const blogObject = new Blog(blog)
        await blogObject.save()
    }
})

test('api returns correct number of blogs in JSON format', async () => {
    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('unique identifier of posts is id, not _id', async () => {
    const response = await api.get('/api/blogs')
    assert(response.body[0].id)
    assert.strictEqual(response.body[0]._id, undefined)
})

test('post requests successfully creates a new blog', async () => {
    const postResponse = await api
        .post('/api/blogs')
        .send(helper.dummyBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const getResponse = await api.get('/api/blogs')
    
    assert.strictEqual(getResponse.body.length, helper.initialBlogs.length + 1)
    assert(getResponse.body.some(obj => obj.id === postResponse.body.id))
})

test('api defaults likes to 0 if likes property is missing from post request', async () => {
    const response = await api 
        .post('/api/blogs')
        .send({title: 'no likes', author: 'No Likes', url: 'noLikes.com'})
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    assert.strictEqual(response.body.likes, 0)
})

describe('api responds with status 400 post requests that', () => {
    test('miss body.title', async () => {
        const newPost = helper.dummyBlog
        delete newPost.title
        await api
            .post('/api/blogs')
            .send({newPost})
            .expect(400)
    })

    test('miss body.url', async () => {
        const newPost = helper.dummyBlog
        delete newPost.url
        await api
            .post('/api/blogs')
            .send({newPost})
            .expect(400)
    })
})

after(async () => {
    await mongoose.connection.close()
})