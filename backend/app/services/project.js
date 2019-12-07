const path = require("path")
const Project = require('../models/project')
const userService = require('../services/user');
var Sequelize = require('sequelize')
const apiError = require(path.resolve("app/utils/api-errors"));
const { _success, _error } = require(path.resolve("app/utils/response_handler"));
const projectResource = require('../models/projectresource')
Project.hasMany(projectResource, {foreignKey: 'projectId', sourceKey: 'id'}),
projectResource.belongsTo(Project, {foreignKey: 'projectId', targetKey: 'id'})
module.exports = {

    getProject(request)
    {
        return Project.findAll({where: request})
    },
    createProject(request)
    {
        return Project.create(request)
    },
    deleteProject(request)
    {
        return Project.destroy({where: request})
    },
    projectUpdate(request,id)
    {
        return Project.update(request,{where: id})
    },
    paginate(request,skip,pageElements)
    {
        return Project.findAndCountAll({where: request,offset:skip,limit:pageElements})
    },
    many(request)
    {
        return Project.findAll({
            where: request,
            attributes: {
                include: [[Sequelize.fn("COUNT", Sequelize.col("projectId")), "totalEmployee"]],
                //exclude: ['projectresources']
            },
            include: [
              {
                model: projectResource,
              }
            ],
            group: ['Project.id'],
            // offset: skip,
            // limit: pageElements
        })
    },
    belong(request)
    {
        return projectResource.findAll({
            where: request,
            attributes: {
                include: [[Sequelize.fn("COUNT", Sequelize.col("projectId")), "totalEmployee"]],
                //exclude: ['projectresources']
            },
            include: [
              {
                model: Project,
              }
            ],
            group: ['projectResource.id'],
            // offset: skip,
            // limit: pageElements
        })
    },
    async configInput(userStatus,response) 
    {
        if(userStatus.userType==1)
        {
            let projectStatus = await this.getProject(response);
                return projectStatus
        }
            if(userStatus.userType==2)
            {
                delete response.projectManagerId
                response["projectManagerId"] = parseInt(userStatus.id);
                let projectStatus = await this.getProject(response);
                return projectStatus
            }

            if(userStatus.userType==3)
            {
                delete response.projectManagerId
                delete response.startDate
                delete response.endDate
                delete response.employeeId
                delete response.status
                response["employeeId"] = parseInt(userStatus.id);   
                let projectStatus = await this.belong(response);
                return projectStatus
            }
    }
}