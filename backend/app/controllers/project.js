const path = require("path")
const projectService = require('../services/project');
const userService = require('../services/user');
const projectResource = require('../services/project_resource');
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
            console.log(response.body);
            const page = req.query.page || process.env.offset
            const offset = (page-1) * process.env.pageSize;
            const limit = parseInt(process.env.pageSize);
            id = {
                id: req._userInfo.user_id
            }
            
            let userStatus = await userService.getUser(id);
            delete response.body.page;
            let project = await projectService.configInput(userStatus,response.body);
            console.log(userStatus);
            res.send(_success({project}));
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

            let insert = await projectService.createProject(response.body);
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
            let status = await projectService.deleteProject(response.body);
            res.send(_success({status}));
        }
        catch (error)
        {
            res.send(_error(error));
        }
    },
    getProject: async (req, res) => {
        
        let project = await projectService.getProject({
                id: req.params.id
        });
        res.send(_success({project}));
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
            if(!req.body.projectName) throw new apiError.UnexpectedError('error','Something went wrong. Check projectName is not null')
            if(!req.body.projectType) throw new apiError.UnexpectedError('error','Something went wrong. Check projectType is not null')

            let edit = await projectService.projectUpdate(response.body,resp);
            let project = await projectService.getProject(resp);
            res.send(_success({project}));
        }
        catch (error)
        {
            res.send(_error(error));
        }
    }
}