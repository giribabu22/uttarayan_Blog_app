const express = require('express');
const routers = express.Router();
const { posts, comments, feedbacks } = require('../acces_data_tables');

routers.route('/:id').get(async (req, res) => {
    await comments.destroy({ where: { registerId: req.user.id } });
    await feedbacks.destroy({ where: { registerId: req.user.id } });
    await posts.destroy({ where: { id: req.params.id.slice(1) } });
    res.redirect('/profile');
})

routers.route('/:id/del').get(async (req,res)=>{
    let bool = await comments.destroy({ where: { registerId: req.user.id, id :req.params.id.slice(1)} });
    if (bool){
        res.redirect('back');
    }else{
        res.send("notification! login first <a href='/login'>login</a> <style> *{margin:10%; font-size:80px;}")
    }
})

module.exports = routers;