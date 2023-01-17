const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const blog = require('../models/blog')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)

    /*
    const blogObjects = helper.initialBlogs
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
    */
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('blog is identified by id', async () => {
    const response = await api.get('/api/blogs')
    const contents = response.body.map(r => r.id)
    expect(contents).toBeDefined()
})

test('a blog can be added ', async () => {
    const newBlog = {
        title: "blogi3",
        author: "thk",
        url: "osoite",
        likes: 3
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  
    const contents = blogsAtEnd.map(b => b.title)
    expect(contents).toContain('blogi3')
})

test('a blog without likes has 0 likes', async () => {
    const newBlog = {
        title: "blogi_likes_undefined",
        author: "thk",
        url: "url"
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const blogsAtEnd = await helper.blogsInDb()
    const addedBlog = await blogsAtEnd.find(blog => blog.title === "blogi_likes_undefined")
    expect(addedBlog.likes).toBe(0)
})

test('blog without title or url is not added', async () => {
    const newBlog = {
      author: 'pekka'
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  
    const blogsAtEnd = await helper.blogsInDb()
  
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
  

afterAll(() => {
  mongoose.connection.close()
})