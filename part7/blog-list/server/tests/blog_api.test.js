const { test, describe, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)
let authToken = undefined

beforeEach(async () => {
    await User.deleteMany({})
    await Blog.deleteMany({})

    await api
        .post('/api/users')
        .send(helper.dummyUser)

    const loginReq = await api
        .post('/login')
        .send(helper.dummyUser)
    authToken = loginReq.body.token

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

test('post request successfully creates a new blog', async () => {
    const postBlogReq = await api
        .post('/api/blogs')
        .send(helper.dummyBlog)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const getBlogsReq = await api.get('/api/blogs')

    assert.strictEqual(getBlogsReq.body.length, helper.initialBlogs.length + 1)
    assert(getBlogsReq.body.some(obj => obj.id === postBlogReq.body.id))
})

test('api defaults likes to 0 if likes property is missing from post request', async () => {
    const response = await api 
        .post('/api/blogs')
        .send({title: 'no likes', author: 'No Likes', url: 'noLikes.com'})
        .set('Authorization', `Bearer ${authToken}`)
        .expect(201)
        
    
    assert.strictEqual(response.body.likes, 0)
})

test('api responds with 401 to post requests that do not contain a valid token', async () => {
    await api 
        .post('/api/blogs')
        .send(helper.dummyBlog)
        .expect(401)
})

describe('api responds with status 400 post requests that', () => {
    test('miss body.title', async () => {
        const newPost = helper.dummyBlog
        delete newPost.title
        await api
            .post('/api/blogs')
            .send({newPost})
            .set('Authorization', `Bearer ${authToken}`)
            .expect(400)
    })

    test('miss body.url', async () => {
        const newPost = helper.dummyBlog
        delete newPost.url
        await api
            .post('/api/blogs')
            .send({newPost})
            .set('Authorization', `Bearer ${authToken}`)
            .expect(400)
    })
})

describe('api response to delete request when', () => {
    test('an existing id is passed: 204, content is successfully deleted', async () => {
        const getResponse = await api.get('/api/blogs')
        const validId = getResponse.body[0].id
        
        await api.delete(`/api/blogs/${validId}`)
            .expect(204)

        const { body: modifiedList } = await api.get('/api/blogs')

        assert.strictEqual(modifiedList.length, helper.initialBlogs.length - 1)
        assert(!modifiedList.some(obj => obj.id === validId))
    })

    test('a non-existing id is passed: 204, content remains unchanged', async () => {
        newId = new Blog(helper.dummyBlog).toJSON().id
        
        await api.delete(`/api/blogs/${newId}`)
            .expect(204)

        const { body: unmodifiedList } = await api.get('/api/blogs')

        assert.strictEqual(unmodifiedList.length, helper.initialBlogs.length)
    })

    test('a malformatted id is passed: 400', async () => {
        await api.delete('/api/blogs/malformatted-id')
            .expect(400)
    })
})

describe('api response to put requests when', () => {
    test('valid params and body are passed: 200, data is successfully modified', async () => {
        const getResponse = await api.get('/api/blogs')
        const target = getResponse.body[0]

        const { body: modifiedData } = await api
            .put(`/api/blogs/${target.id}`)
            .send({likes: target.likes + 1})
            .expect(200)

        assert.strictEqual(target.id, modifiedData.id)
        assert.strictEqual(target.likes + 1, modifiedData.likes)
    })

    test('id from previously deleted blog is passed: 404', async () => {
        const getResponse = await api.get('/api/blogs')
        const target = getResponse.body[0]

        await api
            .delete(`/api/blogs/${target.id}`)
            .expect(204)

        await api
            .put(`/api/blogs/${target.id}`)
            .send({likes: target.likes + 1})
            .expect(404)
    })
})

after(async () => {
    await mongoose.connection.close()
})