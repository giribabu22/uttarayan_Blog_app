const express = require('express');
const routers = express.Router();
const { posts, comments, feedbacks } = require('../acces_data_tables');


routers.route('/:id').get(async (req, res) => {
    await comments.destroy({ where: { registerId: req.user.id } })
    await feedbacks.destroy({ where: { registerId: req.user.id } })
    await posts.destroy({ where: { id: req.params.id.slice(1) } })
    res.redirect('/profile')
})

routers.route('/:id/del').get(async (req,res)=>{
    await comments.destroy({ where: { registerId: req.user.id, postId :req.params.id.slice(1)} });
    res.redirect('/home')

})


module.exports = routers