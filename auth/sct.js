const jwt = require('jsonwebtoken');

async function creating_token(data) {
    return jwt.sign(data, 'sdsgdsgsdgdgsakds')
}

async function verification(req, res, next) {
    console.log(req.headers.cookie && req.headers.cookie.split('=')[1] != "undefined");
    if (req.headers.cookie && req.headers.cookie.split('=')[1] != "undefined") {
        let token = req.headers.cookie.split('=')[1]
        let user = jwt.verify(token, 'sdsgdsgsdgdgsakds')
        req["user"] = user;
        next()
    } else {
        res.send("notification! login first <a href='/login'>login</a> <style> *{margin:10%; font-size:80px;}")
    }
}
module.exports = { creating_token, verification }