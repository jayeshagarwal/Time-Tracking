const express = require('express');
const router = express.Router();
const path = require("path");

const {
    login,
    forgotpassword,
    resetpassword
} = require(path.resolve("app/controllers/authentication"));


router.post('/login', login);
router.post('/forgot', forgotpassword);
router.post('/reset',resetpassword);
module.exports = router;
