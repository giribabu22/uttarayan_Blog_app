require('dotenv').config()
const nodemailer = require('nodemailer');
const {register} = require('../acces_data_tables')
const jwt = require('jsonwebtoken');

const express = require('express');

const routers = express.Router();
routers.use(express.urlencoded())

routers.route('').get((req, res) => {
    console.log('>>>>>>',req.body);
    res.render('forget')
}).post(async (req, res) => {
    let trans = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    })
    let yourData = await register.findOne({where:{email:req.body.user_email}})
    if (yourData != null){
        let p = jwt.verify(yourData['dataValues'].password,'sdsgdsgsdgdgsakds')
        let mailOptions = {
            from: 'Giribabu22@navgurukul.org',
            to: req.body.user_email,
            subject: 'sending from nodemailer',
            text: `Hello ${yourData['dataValues'].name} \n Forgot your password? No worries! Click the link given below to password. this is your old data \n\tPassword: "${p}" \n\tEmail: "${yourData['dataValues'].email}". \n https://uttarayan-app.herokuapp.com/login`
        }

        trans.sendMail(mailOptions, function (err, data) {
            if (err) throw err
            else {
                res.send("notification:: Check the mail box, We sent an mail! <a href='/login'>login</a> <style> *{margin:10%; font-size:80px;}"); }
        })
    }else{
        res.send("notification: this mail Id has no any account!! <a href='/login'>login</a> <a href='/forget'>forget</a> <style> *{margin:10%; font-size:80px;}")

    }
})

module.exports = routers