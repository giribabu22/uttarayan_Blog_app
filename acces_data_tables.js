const comments = require('./models/comments');
const feedbacks = require('./models/feedbacks');
const posts = require('./models/posts');
const register = require('./models/register');

const db = require('./db/connection');

register.hasMany(posts)
posts.hasMany(feedbacks)
posts.hasMany(comments)
register.hasMany(feedbacks)
register.hasMany(comments)

db.sync().then((result) => {
}).catch((errors) => {
    resizeBy.send(errors.message)
});

module.exports = {comments,register,posts,feedbacks}