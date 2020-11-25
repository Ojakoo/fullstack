const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const total = (sum, item) => {
        return sum + item.likes
    }

    return blogs.reduce(total, 0)
}

const favoriteBlog = (blogs) => {

    const check = (favorite, item) => {
        if ( JSON.stringify(favorite) === '{}' ) {
            return item
        } else if ( favorite.likes < item.likes ) {
            return item
        }
        return favorite
    }

    return blogs.reduce(check, {})
}

const mostBlogs = (blogs) => {
    
    const returnList =  _(blogs)
        .groupBy('author')
        .map((objs, key) => ({
            author: key,
            blogs: objs.length
        }))
        .value()

    const max = (max, item) => {
        if ( JSON.stringify(max) === '{}') {
            return item
        } else if ( max.blogs < item.blogs ) {
            return item
        }
        return max
    }

    return returnList.reduce(max, {})
}

const mostLikes = (blogs) => {
    
    const returnList =  _(blogs)
        .groupBy('author')
        .map((objs, key) => ({
            author: key,
            likes: _.sumBy(objs, 'likes')
        }))
        .value()

    const max = (max, item) => {
        if ( JSON.stringify(max) === '{}') {
            return item
        } else if ( max.likes < item.likes ) {
            return item
        }
        return max
    }

    return returnList.reduce(max, {})
}
  
module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}