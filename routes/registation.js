require('dotenv').config()
const express = require('express')
const { register } = require('../acces_data_tables')
const routers = express.Router()
const { creating_token } = require('../auth/sct')
const nodemailer = require('nodemailer');

routers.use(express.urlencoded());

routers.route('')
    .get((req, res) => {
        res.render('registation')
    })
    .post(async (req, res) => {
        req.body['password'] = await creating_token(req.body.password)
        let trans = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        })
        
        let mailOptions = {
            from: 'Giribabu22@navgurukul.org',
            to: req.body.email,
            subject: 'created successfully uttarayan-app community',
            text: `Hello ${req.body.name} \  Welcome to uttarayan-app,\n
                    Thank you for joining the uttarayan-app community.
                    Thousands of organizations and individuals 
                    like you use uttarayan-app to create beautiful profile, just the way they want it. 
                    We’re here for you every step of the way!\n https://uttarayan-app.herokuapp.com/login`
        }


        // trans.sendMail(mailOptions, async function (err, data) {
        //     if (err) {
        //         res.send("invalid Email Dude!! <a href='/sign-up'>sign_in</a> <style> *{margin:10%; font-size:100px;}")
        //     } else {
        //         await register.create(req.body).then((bool) => {
        //             if (bool) {
        //                 res.send("notification!! your account has be created!!  <a href='/login'>login</a> <style> *{margin:10%; font-size:100px;}")
        //             } else {
        //                 res.send('no not yet!!')
        //             }
        //         }).catch(errors => res.send(errors.message) )
        //     }
        // })
    })

module.exports = routers