const path = require("path")
const userService = require('../services/user');
const apiError = require(path.resolve("app/utils/api-errors"));
const { _success, _error } = require(path.resolve("app/utils/response_handler"));
var bcrypt = require('bcrypt');
const saltRounds = 10;
var nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const constants = require(path.resolve("app/config/constant"));

module.exports = {
    login: async (req, res) => 
    {
        try 
        {
            if(!req.body.email) throw new apiError.ValidationError('email', 'Email is Required');
            response = { 
                email:req.body.email
            };
            response1 = {
                password:req.body.password
            };

            var hash = bcrypt.hashSync(response1.password, 10);
            let user = await userService.getUser(response);

            if(user && user.email===response.email)
            {
                let passwordmatch = bcrypt.compareSync(user.password, hash);
                if(passwordmatch)
                {
                    let token = await jwt.sign({id: user.id}, constants.jwtSecretKey)
                    res.send(_success({user, token}));
                }
                else
                {
                    throw new apiError.ValidationError('password', "password doesn't match");
                }
            }
            else
            {
                throw new apiError.ValidationError('email','email does not match');
            }
        } 
        catch (error)
        {
            res.send(_error(error));
        }
    },
    forgotpassword: async (req,res) => 
    {
        try
        {
            if(!req.body.email) throw new apiError.ValidationError('email', 'Email is Required');
            response = {
                email: req.body.email
            }
            let user = await userService.getUser(response);
            if(user && user.email===response.email)
            {
                res.send(_success({user}));
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                           user: 'Enter your Email ID',
                           pass: 'Enter your gmsil password'
                       }
                   });
                   let token = await jwt.sign({id: user.id}, constants.jwtSecretKey)
                   const mailOptions = {
                    from: "Enter sender's Email ID", // sender address
                    to: "Enter receiver's Email ID", // list of receivers
                    subject: 'Reset Password Link', // Subject line
                    html: '<p>Click on the link to reset password <a href="http://localhost:4002/api/auth/reset">link?token=' + token +'</a></p>'// plain text body
                  };

                  transporter.sendMail(mailOptions, function (err, info) {
                    if(err)
                      console.log(err)
                    else
                      console.log(info);
                 });
            }
            else
            {
                throw new apiError.ValidationError('email','email does not match')
            }
        }
        catch (error)
        {
            res.send(_error(error));
        }
    },
    resetpassword: async (req, res) => 
    {
        try 
        {
            if(!req.body.password) throw new apiError.ValidationError('password', 'Password is Required');
            response = { 
                password:req.body.password
            };
            response1 = {
                password:req.body.confirmpassword
            };
            if(response.password == response1.password) 
            {
                var hash = bcrypt.hashSync(response.password, 10);
                token = req.query.token;
                const decoded = jwt.verify(token, constants.jwtSecretKey);
                let userId = {id:decoded.id};
                let user = await userService.getUser(userId);
                let passwordUpdate = await userService.passwordUpdate(response,userId);
                res.send(_success({user}));
            }
            else
            {
                throw new apiError.ValidationError('password','password and confirm password does not match')
            }
        } 
        catch (error)
        {
            res.send(_error(error));
        }
    }
}