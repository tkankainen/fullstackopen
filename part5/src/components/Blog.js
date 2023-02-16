import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ( { blog, user, updateBlog, deleteBlog } ) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [showAll, setShowAll] = useState(false)

  const likeBlog = () => {
    const blogToUpdate = { ...blog, likes: blog.likes + 1 }
    updateBlog(blog.id, blogToUpdate)
  }

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      deleteBlog(blog.id)
    }
  }

  return (
    <div style={blogStyle}>
      {/*blogin kaikki tiedot näkyviin joko nimiriviä tai nappia klikkaamalla*/}
      <div onClick={() => setShowAll(!showAll)}>
        {blog.title} {blog.author}
        <button onClick={() => setShowAll(!showAll)}>
          {showAll ? 'hide' : 'view' }
        </button>
      </div>
      {showAll === true ?
        <div>
          <div>{blog.url}</div>
          <div>{blog.likes} likes <button onClick={() => likeBlog()}>like</button></div>
          <div>{user.name}</div>
          <div><button onClick={() => handleDelete()}>remove</button></div>
        </div> :
        <div></div>
      }
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog