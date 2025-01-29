const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const blogList = await Blog
        .find({})
        .populate('user', { username: 1, name: 1 })

    response.json(blogList)
})
  
blogsRouter.post('/', async (request, response) => {
    const body = request.body

    const decodedToken = jwt.verify(request.token, process.env.SECRET)  
    if (!decodedToken.id) {    
        return response.status(401).json({ error: 'token invalid' })  
    }  
    const user = await User.findById(decodedToken.id)

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

blogsRouter.delete('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    const userId = blog.user._id.toString()
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (userId !== decodedToken.id) {
        return response.status(401).json({ error: 'you do not have permission to delete this content' })
    }

    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

module.exports = blogsRouter
  