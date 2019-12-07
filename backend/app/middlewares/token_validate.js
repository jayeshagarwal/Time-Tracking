const path = require("path");
const jsonwebtoken = require('jsonwebtoken');
const apiError = require(path.resolve("app/utils/api-errors"));
const constants = require(path.resolve('app/config/constant'));
const { _success, _error } = require(path.resolve("app/utils/response_handler"));
module.exports = async (req, res, next) => {

    try {
        const token = req.headers.authorization
        if(token==undefined)
        {
            throw new apiError.UnauthorizedError('error','you are not logged in')
        }
        else
        {
            const token = req.headers.authorization.split(" ")[1];
            const decoded = jsonwebtoken.verify(token, constants.jwtSecretKey);
        
            req._userInfo = {
                user_id: decoded.id || undefined
            };
            console.log('Authenticated...');
            next();
        }
    } catch (e) {
        res.send(_error(e));
    }
};