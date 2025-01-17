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

module.exports = {
    initialBlogs
}