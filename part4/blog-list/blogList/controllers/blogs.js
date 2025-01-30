const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
    const blogList = await Blog
        .find({})
        .populate('user', { username: 1, name: 1 })

    response.json(blogList)
})
  
blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
    const body = request.body  
    const user = await User.findById(request.user.id)

    const blog = new Blog({
        title: body.title,
        author: user.name,
        url: body.url,
        likes: body.likes || 0,
        user: user.id,
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

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    const userId = blog.user._id.toString()

    if (userId !== request.user.id) {
        return response.status(401).json({ error: 'you do not have permission to delete this content' })
    }

    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

module.exports = blogsRouter
  