const { request } = require('express');
const jwt = require('jsonwebtoken');


const validateJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(token == null){
        res.status(400).send("NOT VALID!");
        return;
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
        if(err){
            return res.status(400).send("invalid token: ");
        }

        request.user = payload;
        next();
    });
}


module.exports = validateJWT;