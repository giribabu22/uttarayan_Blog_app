require('dotenv').config()
const express = require('express');
const {comments,posts} = require('../acces_data_tables');
const nodemailer = require('nodemailer');

const routers = express.Router();
routers.use(express.urlencoded())

routers.route('/:postId').get(async (req,res)=>{
    res.render('comments')
}).post(async(req,res)=>{

    let trans = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    })
    let zez = await posts.findOne({ where: { id: req.params.postId.slice(1) }})
    
    let mailOptions = {
        from: process.env.EMAIL,
        to: req.user.email,
        subject: 'New Comment uttarayan-app community',
        text: `Hello  \  You got one new Comment, give replay to you friend! click the link https://uttarayan-app.herokuapp.com/comments${req.url}\n
                    \nThank you for joining the uttarayan-app community.
                    like you use uttarayan-app to create beautiful profile, just the way they want it. 
                    We’re here for you every step of the way!\n\t https://uttarayan-app.herokuapp.com/login`
        }

    trans.sendMail(mailOptions,async function (err, data) {
        if (err) throw err
        else {
            await comments.create({ registerId: req.user.id, postId: req.params.postId.slice(1), commit: req.body.commit, commiter_name :req.user.name}).then((result) => {
                res.redirect(req.get('referer'));                
            }).catch((err) => {
                
            });
        }
    })
})


module.exports = routers