import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [blogformVisible, setBlogformVisible] = useState(false)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notify = (message, type='info') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      notify('wrong username or password', 'alert')
    }
  }

  const handleLogout = async () => {
    //window.localStorage.clear()
    window.localStorage.removeItem('loggedUser')
    console.log('logged out')
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const createBlog = (event) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(event)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        notify(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
      })
  }

  const bloglist = () => (
    <div>
      <p>
        {blogs.map((blog) => 
          <Blog
            key={blog.id}
            blog={blog} 
          />
        )}
      </p>
    </div>
  )
  
  return (
    <div>
      <h2>blogs</h2>

      <Notification message={notification} />

      {user === null ? 
        loginForm() :
        <div>
          <p>{user.name} logged in <button onClick={() => handleLogout()}>logout</button></p>
          {bloglist()}
          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm
              createBlog={createBlog}
            />
          </Togglable>
        </div>
      }

    </div>
  )
}

export default App
