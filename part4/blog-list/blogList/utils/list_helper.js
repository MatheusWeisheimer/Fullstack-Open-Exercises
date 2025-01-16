const dummy = blogs => 1

const totalLikes = blogs => blogs.reduce((prev, curr) => prev + curr.likes, 0)

const favoriteBlog = blogs => {
    if (blogs.length === 0) {
        return undefined
    }

    return blogs.reduce((prev, curr) => prev.likes < curr.likes ? curr : prev, blogs[0])
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}