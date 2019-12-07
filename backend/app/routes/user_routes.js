const express = require('express');
const router = express.Router();
const valid = require('../middlewares/token_validate');
const path = require("path");

const {
    search,
    add,
    deleted,
    edit,
    getUser
} = require(path.resolve("app/controllers/user"));


router.get('/search', search);
router.post('/add', add);
router.post('/delete', deleted);
router.get('/edit/:id', getUser);
router.post('/edit/:id', edit);
module.exports = router;