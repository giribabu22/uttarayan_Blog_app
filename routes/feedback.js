const exp = require('express');
const { posts, feedbacks } = require('../acces_data_tables');
const rote = exp.Router();


rote.route('/:id_post/:feel').get(async (req, res) => {

    
    let { feel, id_post } = req.params
    let registerId = req.user.id;
    let feeling = feel.slice(1);
    let postId = parseInt(id_post.slice(1));
    let sendDic = { feeling: feeling, postId: postId, registerId: registerId }
    
    let feedbacks_back_data = await feedbacks.findOne({ where: { postId: postId, registerId: registerId } });
    let posts_back_data = await posts.findOne({ where: { id: postId, registerId: registerId } })
    try {

        let back_data = await feedbacks.findOne({ where: { postId: postId, registerId: registerId } });

        if (back_data == null) {
            if (feeling == 'likes') {
                console.log('running!!');
                await feedbacks.create(sendDic);
                await posts.increment('likes', {
                    by: 1, where: { id: postId }
                })
            } else {
                await feedbacks.create(sendDic);
                await posts.increment('dislikes', {
                    by: 1,
                    where: { id: postId }
                })
            }
        }
        // if (back_data != null) {
        //     if (back_data['dataValues'].feeling == 'likes') {
        //         await feedbacks.destroy({ where: { postId: postId, registerId: registerId } })
        //         await posts.decrement('dislikes', {
        //             by: 1,
        //             where: { id: id_post.slice(1) }
        //         })
        //         // await feedbacks.destroy({ where: { postId: postId, registerId: registerId, feeling: "dislikes" } })

        //     } else {
        //         await feedbacks.destroy({ where: { postId: postId, registerId: registerId } })
        //         await posts.decrement('likes', {
        //             by: 1,
        //             where: { id: id_post.slice(1) }
        //         })
        //         // await feedbacks.destroy({ where: { postId: postId, registerId: registerId, feeling: "likes" } })
        //     }
        // }
        res.redirect('/home/')
    } catch (errors) {
    }
})
module.exports = rote