const express = require('express');
const router = express.Router();
require('../database/connect');
const Blog = require('../database/blog');

// 从数据库里删除特定博客数据．
// delete the special blog data from database.
router.route('/')
    .post((req, res) => {
        let id = req.body.id;
        console.log('_id: ', id);
        Blog.deleteOne({
            '_id': id
        }, (err, doc) => {
            err ? console.error('Error: delete the blog Failed. DeleteBlog.js', err) : res.end();
        });
    });

module.exports = router;