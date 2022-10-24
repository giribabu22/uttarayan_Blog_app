const express = require('express');
const { register } = require('../acces_data_tables')
const { creating_token } = require('../auth/sct')
const jw = require('jsonwebtoken');

const routers = express.Router();
routers.use(express.urlencoded())

routers
    .route('')
    .get(async (req, res) => {
        res.render('login')
    })
    .post(async (req, res) => {
        let pin = jw.sign(req.body.password, 'sdsgdsgsdgdgsakds')
        let old_data = await register.findOne({
            where: {
                email: req.body.email,
                password: pin
            }
        })
        if (old_data != null && old_data.hasOwnProperty("dataValues")) {
            let toke = await creating_token(old_data["dataValues"])
            res.cookie('user', toke)
            res.redirect('https://uttarayan-app.herokuapp.com/home')
        } else {
            res.send("invalid-input!! <a href='https://uttarayan-app.herokuapp.com/login'>login</a> <style> *{margin:10%; font-size:80px;}")
        }
    })

module.exports = routers