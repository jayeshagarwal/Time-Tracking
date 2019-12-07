const User = require('../models/user')
module.exports = {

    getUser(request) 
    {
        return User.findOne({where: request})
    },
    passwordUpdate(password,request)
    {
        return User.update(password,{where: request})
    },
    createUser(request)
    {
        return User.create(request)
    },
    deleteUser(request)
    {
        return User.destroy({where: request})
    }
}