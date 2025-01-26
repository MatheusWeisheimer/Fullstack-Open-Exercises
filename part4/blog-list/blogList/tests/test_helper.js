const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: 'Hello, world',
        author: 'World Hello',
        url: 'https://helloworldhello.com',
        likes: 1
    },
    {
        title: 'Olá, mundo',
        author: 'Mundo Olá',
        url: 'https://olamundoola.com.br',
        likes: 2
    }
]

const initialUsers = [
    {
        username: "matheusweish",
        name: "Matheus",
        password: "123"
    },
    {
        username: "robertocarlos",
        name: "Roberto",
        password: "456"
    },
]

const dummyBlog = {
    title: 'Dummy',
    author: 'Douglas Usef Muhammad Young',
    url: 'http://dummy.com',
    likes: 0
}

const dummyUser = {
    username: 'dummy',
    name: 'Douglas',
    password: '000'
}

module.exports = {
    initialBlogs,
    initialUsers,
    dummyBlog,
    dummyUser,
}