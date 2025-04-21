const { test, describe, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})

    for (let {username, name, password} of helper.initialUsers) {
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)

        const userObject = new User({username, name, passwordHash})
        await userObject.save()
    }
})

describe('user api responds to post request with', () => {
    test('201 when request body matches requirements, user is successfully created', async () => {
        const postResponse = await api
            .post('/api/users')
            .send(helper.dummyUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)
            
        const updated = await api.get('/api/users')

        assert.strictEqual(updated.body.length, helper.initialUsers.length + 1)
        assert(updated.body.some(obj => obj.id === postResponse.body.id))
    })
    
    test('400 when username is not unique, user is not created', async () => {
        await api
            .post('/api/users')
            .send(helper.dummyUser)
            
        await api
            .post('/api/users')
            .send(helper.dummyUser)
            .expect(400)

        const updated = await api.get('/api/users')
        assert.strictEqual(updated.body.length, helper.initialUsers.length + 1)
    })

    test('400 when username is less than 3 characters long, user is not created', async () => {
        await api
            .post('/api/users')
            .send({...helper.dummyUser, username: 'dm'})
            .expect(400)
        
        const updated = await api.get('/api/users')
        assert.strictEqual(updated.body.length, helper.initialUsers.length)
    })

    test('400 when password is less than 3 characters long, user is not created', async () => {
        await api
            .post('/api/users')
            .send({...helper.dummyUser, password: '00'})
            .expect(400)

        const updated = await api.get('/api/users')
        assert.strictEqual(updated.body.length, helper.initialUsers.length)
    })
})

after(async () => {
    await mongoose.connection.close()
})
