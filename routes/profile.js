const express = require('express');
const {posts} = require('../acces_data_tables')

const routers = express.Router();
routers.route('/info').get( async (req, res) => {
    let data = await posts.findAll({where:{
        registerId :req.user.id
    }})
    res.send({totaldata:data})
})
routers.route('').get((req,res)=>{
    res.render('profile')
})
.post((req,res)=>{

})

module.exports = routers

