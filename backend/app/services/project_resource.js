const Projectresource = require('../models/projectresource')
module.exports = {

    countProject(request)
    {
        return Projectresource.count({where: request})
    }
}