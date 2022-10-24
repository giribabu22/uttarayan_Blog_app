const express = require('express');
const { comments, register, posts, feedbacks } = require('../acces_data_tables')


const routers = express.Router()

routers.use(express.static('public'));
routers.use(express.urlencoded())


routers.route('/info').get(async (req, res) => {
    try {
        let total_data = await register.findAll()
        let posts_data = await posts.findAll()
        let feedbacks_data = await feedbacks.findAll()
        let comment = await comments.findAll()
        let dic = { comments: comment, feedbacks: feedbacks_data, posts: posts_data, register: total_data }
        res.send(dic)

    } catch (errors) {
        res.send("notification !! __"+errors.message)
    }
})


module.exports = routers