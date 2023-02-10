const BlogForm = ({
    addBlog,
    setNewTitle,
    setNewAuthor,
    setNewUrl,
    newTitle,
    newAuthor,
    newUrl
    }) => {
    return (
    <div>
      <h2>create new</h2>
  
      <form onSubmit={addBlog}>
        <div>
          title
            <input
            type="text"
            value={newTitle}
            name="Title"
            onChange={setNewTitle}
          />
        </div>
        <div>
          author
            <input
            type="text"
            value={newAuthor}
            name="Title"
            onChange={setNewAuthor}
          />
        </div>
        <div>
          url
            <input
            type="url"
            value={newUrl}
            name="Title"
            onChange={setNewUrl}
          />
        </div>
        <button type="submit">create</button>
      </form> 
    </div>
  )
}

export default BlogForm