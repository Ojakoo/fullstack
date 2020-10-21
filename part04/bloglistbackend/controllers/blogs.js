const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(blog => blog.toJSON())) 
})
  
blogsRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)

  if (blog.likes === undefined) {
    blog.likes = 0
  } 

  if (blog.title === undefined || blog.url === undefined ) {
    response.status(400).end()
  } else {
    try {
      const savedBlog = await blog.save()
      response.status(201).json(savedBlog.toJSON())
    } catch(error) {
      next(error)
    }
  }
})

module.exports = blogsRouter