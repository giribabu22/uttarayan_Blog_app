const express = require('express');
const {comments} = require('../acces_data_tables')

const routers = express.Router();
routers.use(express.urlencoded())

routers.route('/:postId').get(async (req,res)=>{
    res.render('comments')
}).post(async(req,res)=>{
    await comments.create({ registerId :req.user.id,postId:req.params.postId.slice(1),commit:req.body.commit})
    res.redirect(req.get('referer'));
})


module.exports = routers