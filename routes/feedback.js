const exp = require('express');
const { posts, feedbacks } = require('../acces_data_tables');
const rote = exp.Router();


rote.route('/:id_post/:feel').get(async (req, res) => {
    let { feel, id_post } = req.params
    let registerId = req.user.id;
    let feeling2 = feel.slice(1);
    let postId = parseInt(id_post.slice(1));
    let sendDic = { feeling: feeling2, postId: postId, registerId: registerId }

    try {

        let back_data = await feedbacks.findOne({ where: { postId: postId, registerId: registerId } });
        if (back_data == null) {
            if (feeling2 == 'likes') {
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
        else {
            if (back_data['dataValues'].feeling == 'likes' && feeling2 == 'dislikes' || back_data['dataValues'].feeling == 'likes' && feeling2 == 'likes') {
                let r = await feedbacks.destroy({ where: { postId: postId, registerId: registerId } })
                let r2 = await posts.decrement('likes', {
                    by: 1,
                    where: { id: id_post.slice(1) }
                })
            } else if (back_data['dataValues'].feeling == 'dislike' && feeling2 == 'likes' || back_data['dataValues'].feeling == 'dislike' && feeling2 == 'dislike') {
                let r = await feedbacks.destroy({ where: { postId: postId, registerId: registerId } })
                let r2 = await posts.decrement('dislikes', {
                    by: 1,
                    where: { id: id_post.slice(1) }
                })
            }
            else if ((back_data['dataValues'].feeling == 'dislike' && feeling2 == 'dislike' )||( back_data['dataValues'].feeling == 'dislike' && feeling2 == 'likes')) {
                await feedbacks.update({ feeling: 'likes' }, {
                    where: {
                        id: back_data['dataValues'].id
                    }
                })
                let r2 = await posts.decrement('dislikes', {
                    by: 1,
                    where: { id: id_post.slice(1) }
                })
                let r3 = await posts.increment('likes', {
                    by: 1,
                    where: { id: id_post.slice(1) }
                })
            } else if (back_data['dataValues'].feeling == 'likes' && feeling2 == 'dislike'){
                await feedbacks.update({feeling:'dislike'},{where:{
                    id: back_data['dataValues'].id
                }})
                let r2 = await posts.decrement('likes', {
                    by: 1,
                    where: { id: id_post.slice(1) }
                })
                let r3 = await posts.increment('dislikes', {
                    by: 1,
                    where: { id: id_post.slice(1) }
                })
            }
        }
        res.redirect(req.get('referer'));
    } catch (errors) {
    }
})
module.exports = rote