const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: "blogi",
        author: "th",
        url: "url",
        likes: 2,
        id: "63a46024705f85cf8d26261f"
    },
    {
        title: "blogi2",
        author: "kirjoittaja",
        url: "url2",
        likes: 5,
        id: "63a467f342a8ab625a659202"
    }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb, usersInDb
}