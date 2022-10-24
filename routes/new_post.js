const exp = require('express');
const routers = exp.Router();
const { posts } = require('../acces_data_tables')

routers.use(exp.urlencoded())

routers.route('')
    .get((req, res) => {
        res.render('new_post')
    })
    .post(async (req, res) => {
        req.body['likes'] = 0
        req.body['dislikes'] = 0
        req.body['registerId'] = req.user.id
        req.body['user_name'] = req.user.name
        if (req.body.url.length > 150 && req.body.url.slice(0,4) != 'http'){
            
        }else{

            await posts.create(req.body).then((result) => {
                res.redirect('http://localhost:3000/home')       
            }).catch((errors) => {
                res.send(errors.message)
            });
        }
    })

module.exports = routers