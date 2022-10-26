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
            res.redirect('/home')
        } else {
            res.send("notification !! invalid-input!! <a href='/login'>Login</a> <a href='/forget'>Forget_Password</a> <style> *{margin:10%; font-size:80px;}")
        }
    })

module.exports = routers