const dummy = blogs => 1

const totalLikes = blogs => blogs.reduce((prev, curr) => prev + curr.likes, 0)

const favoriteBlog = blogs => {
    if (blogs.length === 0) {
        return undefined
    }

    return blogs.reduce((prev, curr) => prev.likes < curr.likes ? curr : prev, blogs[0])
}

const mostBlogs = blogs => {
    if (blogs.length === 0) {
        return undefined
    }

    const authorsBlogs = Object.entries(blogs.reduce((prev, curr) => (
        {...prev, [curr.author]: prev[curr.author] ? prev[curr.author] + 1 : 1}
    ), {}))

    const [author, mostBlogs] = authorsBlogs.reduce(([prevAuthor, prevBlogs], [currAuthor, currBlogs]) => (
        currBlogs > prevBlogs ? [currAuthor, currBlogs] : [prevAuthor, prevBlogs]
    ), authorsBlogs[0])

    return {author: author, blogs: mostBlogs}
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}