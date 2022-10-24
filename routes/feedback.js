const exp = require('express');
const { posts, feedbacks } = require('../acces_data_tables');
const rote = exp.Router();


rote.route('/:id_post/:feel').get(async (req, res) => {
    
    let { feel, id_post } = req.params
    let registerId = req.user.id;
    let feeling = feel.slice(1);
    try {
        let postId = parseInt(id_post.slice(1));
        let sendDic = { feeling: feeling, postId: postId, registerId: registerId }
        let back_data = await feedbacks.findOne({ where: { postId: postId, registerId: registerId } });
        // console.log('back_data: ', back_data['dataValues']);
        console.log(back_data);
        if (back_data == null) {
            console.log("feeling>>>>_______", feeling);
            if (feeling == 'likes') {
                console.log('likes', feeling);
                await feedbacks.create(sendDic);
                await posts.increment('likes', {
                    by: 1, where: { postId: postId }
                })

            } else {
                console.log('dislikes');
                await feedbacks.create(sendDic);
                await posts.increment('dislikes', {
                    by: 1,
                    where: { postId: postId }
                })
            }
        }
        if (back_data != null) {
            console.log(back_data['dataValues'].feeling, '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
            if (back_data['dataValues'].feeling == 'likes') {
                await feedbacks.destroy({ where: { postId: postId, registerId: registerId } })
                await posts.decrement('dislikes', {
                    by: 1,
                    where: { id: id_post.slice(1) }
                })
                // await feedbacks.destroy({ where: { postId: postId, registerId: registerId, feeling: "dislikes" } })

            } else {
                await feedbacks.destroy({ where: { postId: postId, registerId: registerId } })
                await posts.decrement('likes', {
                    by: 1,
                    where: { id: id_post.slice(1) }
                })
                // await feedbacks.destroy({ where: { postId: postId, registerId: registerId, feeling: "likes" } })
            }
        }
        res.redirect('http://localhost:3000/home/')
    } catch (errors) {
        console.log(errors);
    }
})
module.exports = rote