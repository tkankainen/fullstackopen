const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.length === 0
    ? 0
    : blogs.reduce((sum, blog) => sum + blog.likes, 0);
}

const favoriteBlog = (blogs) => {

    if (blogs.length === 0) {
        return {}
    }

    const favoriteblog = blogs.reduce((favorite, blog) => (
        favorite.likes > blog.likes ? favorite : blog
    ), blogs[0]);

    return {
        title: favoriteblog.title,
        author: favoriteblog.author,
        likes: favoriteblog.likes
    }
}
  
module.exports = {
    dummy, totalLikes, favoriteBlog
}