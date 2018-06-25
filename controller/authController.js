const tokenService = require('../services/tokenService')
const userModel = require('../models/users');


// - `register` - route handler that will create a new user using the User model and then creates a JWT for that user and sends it in response.
function register(req, res) {
    userModel.register(req.body)
        .catch(err => {
            res.status(401).json({
                message: 'Username taken'
            })
        })
        .then(data => tokenService.makeToken({
                email: data.email,
                id: data.id,
                username: data.username
            })
        )
        .then(token => {
            res.json({
                token
            })
        });
}

function sign_in(req, res) {
    userModel.sign_in(req.body)
        .then(data => tokenService.makeToken({
            id: data.id,
            email: data.email,
            username: data.username
        }))
        .then(token => {
            res.json({
                token
            })
        })
        .catch(err => {
            res.status(401).json({
                status: 'Error',
                message: 'Invalid credentails'
            })
        })
}



module.exports = {
    register,
    sign_in
}