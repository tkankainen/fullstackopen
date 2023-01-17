const _ = require("lodash")

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

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return {}
    }
    
    const count = _.countBy(blogs, 'author')

    const author = _.maxBy(Object.keys(count))
    const mostblogs = _.maxBy(Object.values(count))

    return {
        "author": author,
        "blogs": mostblogs
    }
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return {}
    }
    const mostlikes = _(blogs)
        .groupBy('author')
        .map((obj, key) => ({
            author: key,
            likes: _.sumBy(obj, 'likes')
        }))
        .value()

    console.log(mostlikes)

    return mostlikes.reduce((a, b) => {
        return a.likes > b.likes ? a : b
    })
}
  
module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}