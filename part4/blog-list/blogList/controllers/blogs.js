const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogList = await Blog.find({})
    response.json(blogList)
})
  
blogsRouter.post('/', async (request, response) => {
    const blog = new Blog({
        ...request.body,
        likes: request.body.likes || 0
    })

    const result = await blog.save()
    response.status(201).json(result)
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
  