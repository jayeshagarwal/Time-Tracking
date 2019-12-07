const path = require("path")
const projectService = require('../services/project');
const userService = require('../services/user');
const apiError = require(path.resolve("app/utils/api-errors"));
const { _success, _error } = require(path.resolve("app/utils/response_handler"));
var bcrypt = require('bcrypt');
const saltRounds = 10;
var nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const constants = require(path.resolve("app/config/constant"));

module.exports = {
    search: async (req, res) => 
    {
        try
        {
            response = {
                body: req.query
            };
     
            let user = await userService.getUser(response.body);
            res.send(_success({user}));
        }
        catch (error)
        {
            res.send(_error(error));
        }
    },
    add: async (req, res) => 
    {
        try
        {
            response = {
                body: req.body
            };

            let insert = await userService.createUser(response.body);
            res.send(_success({insert}));
        }
        catch (error)
        {
            res.send(_error(error));
        }
    },
    deleted: async (req,res) =>
    {
        try
        {
            response = {
                body: req.body
            };
            let status = await userService.deleteUser(response.body);
            res.send(_success({status}));
        }
        catch (error)
        {
            res.send(_error(error));
        }
    },
    getUser: async (req, res) => {
        
        let user = await userService.getUser({
                id: req.params.id
        });
        res.send(_success({user}));
    },
    edit: async (req,res) =>
    {
        try
        {
            response = {
                body: req.body
            };
            resp = {
                id: req.params.id
            }
            console.log(req.params.id);
            let edit = await userService.userUpdate(response.body,resp);
            let user = await userService.getUser(resp);
            res.send(_success({user}));
        }
        catch (error)
        {
            res.send(_error(error));
        }
    }
}