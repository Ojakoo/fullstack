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
  
module.exports = {
    dummy, totalLikes, favoriteBlog
}