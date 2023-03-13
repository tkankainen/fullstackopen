import { useState } from 'react'

const BlogForm = ({ createBlog }) => {

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>create new</h2>

      <form onSubmit={addBlog}>
        <div>
          title
          <input
            type="text"
            value={newTitle}
            id="title"
            placeholder='title'
            onChange={({ target }) => setNewTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={newAuthor}
            id="author"
            placeholder='author'
            onChange={({ target }) => setNewAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            type="url"
            value={newUrl}
            id="url"
            placeholder='url'
            onChange={({ target }) => setNewUrl(target.value)}
          />
        </div>
        <button type="submit" className='create-button'>create</button>
      </form>
    </div>
  )
}

export default BlogForm