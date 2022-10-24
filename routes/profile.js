const express = require('express');

const routers = express.Router();
routers.route('/info').get((req, res) => {

    res.send()
})
routers.route('').get((req,res)=>{
    res.send('send profile!!')
    // res.render('profile')
})
.post((req,res)=>{

})

