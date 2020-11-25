
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const { response } = require('express')

beforeEach(async () => {
    await Blog.deleteMany({})
    let noteObject = new Blog(helper.initialBlogs[0])
    await noteObject.save()
    noteObject = new Blog(helper.initialBlogs[1])
    await noteObject.save()
    noteObject = new Blog(helper.initialBlogs[2])
    await noteObject.save()
    noteObject = new Blog(helper.initialBlogs[3])
    await noteObject.save()
    noteObject = new Blog(helper.initialBlogs[4])
    await noteObject.save()
    noteObject = new Blog(helper.initialBlogs[5])
    await noteObject.save()

    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
})

describe('Get request tests:', () => {

    test('blogs are returned with correct amount', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('blogs are returned as json', async () => {
        const response = await api.get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('blog identifier is named id not _id', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0]._id).not.toBeDefined()
        expect(response.body[0].id).toBeDefined()
    })
})

describe('Post request tests', () => {
    
    test('blog is added correctly to database', async () => {
         
        const newLogin = {
            username: "root",
            password: "sekret"
            }
        
        const resp = await api 
            .post('/api/login')
            .send(newLogin)

        const token = resp.body.token

        const newBlog = {
            title: "title test",
            author: "author test",
            url: "url test",
            likes: 0
        }

        await api
            .post('/api/blogs')
            .set({ "Authorization": `Bearer ${token}` })
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')
        const titles = response.body.map(r => r.title)

        expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
        expect(titles).toContain('title test')
    })

    test('blog gets likes value of 0 when undef', async () => {

        const newLogin = {
            username: "root",
            password: "sekret"
            }
        
        const resp = await api 
            .post('/api/login')
            .send(newLogin)

        const token = resp.body.token

        const newBlog = {
            title: "title 0",
            author: "author 0",
            url: "url 0",
        }

        await api
            .post('/api/blogs')
            .set({ "Authorization": `Bearer ${token}` })
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
        expect(response.body[6].likes).toBe(0)
    })

    test('if blog title is undef response is 400', async () => {

        const newLogin = {
            username: "root",
            password: "sekret"
            }
        
        const resp = await api 
            .post('/api/login')
            .send(newLogin)

        const token = resp.body.token

        const newBlog = {
            author: "author title undef",
            url: "url title undef",
            likes: 0
        }

        await api
            .post('/api/blogs')
            .set({ "Authorization": `Bearer ${token}` })
            .send(newBlog)
            .expect(400)

        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('if blog url is undef response is 400', async () => {

        const newLogin = {
            username: "root",
            password: "sekret"
            }
        
        const resp = await api 
            .post('/api/login')
            .send(newLogin)

        const token = resp.body.token

        const newBlog = {
            title: "title url undef",
            author: "author url undef",
            likes: 0
        }

        await api
            .post('/api/blogs')
            .set({ "Authorization": `Bearer ${token}` })
            .send(newBlog)
            .expect(400)

        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })
})

afterAll(() => {
    mongoose.connection.close()
})