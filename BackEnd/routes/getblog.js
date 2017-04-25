const express = require('express');
const router = express.Router();
require('../database/connect');
const Blog = require('../database/blog');

// 发给前端特定博客数据
// send the blog data (one) to frontend.
router.route('/')
    .post((req, res) => {
        Blog.findOne({
            '_id': req.body.id
        }, (err, doc) => {
            err ? res.end() : res.json(doc);
        });
    });

module.exports = router;