const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    const blogList = await Blog
        .find({})
        .populate('user', { username: 1, name: 1 })

    response.json(blogList)
})
  
blogsRouter.post('/', async (request, response) => {
    const user = await User.findOne({})

    const blog = new Blog({
        ...request.body,
        user: user.id,
        likes: request.body.likes || 0
    })

    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
})

blogsRouter.put('/:id', async (request, response) => {
    const newData = {
        likes: request.body.likes
    }
    
    const updated = await Blog.findByIdAndUpdate(
        request.params.id, newData, { new: true, runValidators: true, context: 'query' }
    )

    updated
    ? response.json(updated)
    : response.status(404).send({ error: 'Information on target does not exist on server' })
})

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

module.exports = blogsRouter
  