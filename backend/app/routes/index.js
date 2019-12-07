const express = require('express');
const router = express.Router();

const routes = {
    authRoutes: require("./auth_routes"),
    projectRoutes: require("./project_routes"),
    userRoutes: require("./user_routes")
}


router.use('/auth', routes.authRoutes);
router.use('/project', routes.projectRoutes);
router.use('/user', routes.userRoutes);

module.exports = router;