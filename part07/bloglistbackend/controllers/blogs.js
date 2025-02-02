const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1, id: 1 })
    .populate('comments', { content: 1, id: 1 })
  response.json(blogs.map(blog => blog.toJSON())) 
})

blogsRouter.post('/', async (request, response, next) => {

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  //console.log(request.token)
  //console.log(decodedToken)

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User
    .findById(decodedToken.id)

  //console.log('user debug at 22')
  //console.log(user)

  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes,
    user: user._id,
  })

  if (blog.title === undefined || blog.url === undefined ) {
    response.status(400).end()
  } else {
    const savedBlog = await blog
      .save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    const returnBlog = await Blog
      .findById(savedBlog.id)
      .populate('user', { username: 1, name: 1, id: 1 })
      .populate('comments', { content: 1, id: 1 })

    response.status(201).json(
      returnBlog
      .toJSON()
    )
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = await Blog.findById(request.params.id)
  const user = await User.findById(decodedToken.id)

  if ( blog.user.toString() === decodedToken.id.toString() ) {
    await Blog.findByIdAndRemove(request.params.id)
    user.blogs = user.blogs.slice(request.params.id)
    await user.save()
    response.status(204).end()
  } else {
    response.status(401).json({ error: 'token missing or invalid' }).end()
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const blog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
  }

  const updatedBlog = await Blog
    .findByIdAndUpdate(request.params.id, blog, { new: true })
    .populate('user', { username: 1, name: 1, id: 1 })
    .populate('comments', { content: 1, id: 1 })

  response.json(updatedBlog)
})


module.exports = blogsRouter