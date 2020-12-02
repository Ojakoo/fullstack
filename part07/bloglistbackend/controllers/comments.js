const commentsRouter = require('express').Router()
const Comment = require('../models/comment')
const Blog = require('../models/blog')

commentsRouter.get('/', async (request, response) => {
    const comments = await Comment
        .find({}).populate('blog', { title: 1, author: 1, url: 1, id: 1 })
    response.json(comments.map(comment => comment.toJSON()))  
})

commentsRouter.post('/', async (request, response, next) => {

    const body = request.body

    const blog = await Blog
        .findById(body.blog_id)
    
    const comment = new Comment({
        content: body.content,
        blog: blog._id,
    })

    console.log(body)
    console.log(body.content)
    console.log(comment.content)

    if ( comment.content === undefined ) {
        response.status(400).end()
    } else {
        const savedComment = await comment
            .save()

        blog.comments = blog.comments.concat(savedComment._id)
        await blog.save()

        const returnComment = await Comment
            .findById(savedComment._id)
            .populate('blog', { title: 1, author: 1, url: 1, id: 1 })

        response.status(201).json(
            returnComment
            .toJSON()
        )
    }
})

module.exports = commentsRouter