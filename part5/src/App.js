import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import { Table, Form, Button } from 'react-bootstrap'

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);
  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const notify = (message, type = "info") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      notify("wrong username or password", "alert");
    }
  };

  const handleLogout = async () => {
    //window.localStorage.clear()
    window.localStorage.removeItem("loggedUser");
    console.log("logged out");
    setUser(null);
  };

  const loginForm = () => (
    <Form onSubmit={handleLogin}>
      <Form.Group>
        <Form.Label>username</Form.Label>
        <Form.Control
          type="text"
          value={username}
          id="username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          id="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </Form.Group><br />
      <Button variant="primary" type="submit">
        login
      </Button>
    </Form>
  );

  const createBlog = async (event) => {
    try {
      blogFormRef.current.toggleVisibility();
      const blog = await blogService.create(event);
      setBlogs(blogs.concat(blog));
      notify(`a new blog ${blog.title} by ${blog.author} added`);
    } catch (exception) {
      console.log("Error creating blog:", exception.response.data.error);
    }
  };

  const updateBlog = async (id, blogToUpdate) => {
    try {
      const updatedBlog = await blogService.update(id, blogToUpdate);
      const newBlogs = blogs.map((blog) =>
        blog.id === id ? updatedBlog : blog,
      );
      setBlogs(newBlogs);
    } catch (exception) {
      console.log("Error updating blog:", exception.response.data.error);
    }
  };

  const deleteBlog = async (id) => {
    try {
      await blogService.remove(id);
      setBlogs(blogs.filter((blog) => blog.id !== id));
    } catch (exception) {
      console.log("Error deleting blog:", exception);
    }
  };

  const bloglist = () => (
    <div>
      <Table striped>
        <tbody>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <tr key={blog.id}>
                <td>
                  <Blog
                    blog={blog}
                    updateBlog={updateBlog}
                    deleteBlog={deleteBlog}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );

  return (
    <div className="container">
      <h2>blogs</h2>

      <Notification message={notification} />

      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>
            {user.name} logged in{" "}
            <Button onClick={() => handleLogout()}>logout</Button>
          </p>
          {bloglist()}
          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm createBlog={createBlog} />
          </Togglable>
        </div>
      )}
    </div>
  );
};

export default App;
