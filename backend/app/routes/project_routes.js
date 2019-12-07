const express = require('express');
const router = express.Router();
const valid = require('../middlewares/token_validate');
const path = require("path");

const {
    search,
    add,
    deleted,
    edit,
    getProject
} = require(path.resolve("app/controllers/project"));


router.get('/search', valid, search);
router.post('/add', add);
router.post('/delete', deleted);
router.get('/edit/:id', getProject);
router.post('/edit/:id', edit);
module.exports = router;