const bcrypt = require('bcrypt')
const { request, response } = require('../app')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response, next) => {
    const body = request.body

    if ( body.password === undefined ) {
        return response.status(400).json({ error: 'password missing' })
    }
    if ( body.password.length < 3 ) {
        return response.status(400).json({ error: 'password not long enough' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })

    const savedUser = await user.save()

    response.json(savedUser)
})

usersRouter.get('/', async (request, response) => {
    const users = await User
        .find({}).populate('blogs', { url: 1, title: 1, author: 1, id: 1}) 

    response.json(users.map(user => user.toJSON()))  
})

/*
usersRouter.get('/:id', async (request, response) => {
    const user = await User
        .findById(request.params.id).populate('blogs', { url: 1, title: 1, author: 1, id: 1})

    response.json(user.toJSON())
})
*/

module.exports = usersRouter