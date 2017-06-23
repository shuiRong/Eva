const express = require('express');
const router = express.Router();
require('../database/connect');
const Blog = require('../database/blog');
const config = require('../config.json');
const md5 = require('crypto-js/md5');

// 从数据库里删除特定博客数据．
// delete the special blog data from database.
router.route('/')
    .post((req, res) => {
        const id = req.body.id;
        // Auth the hashed key.
        const key = req.body.key;
        const privateKey = config.privateKey;
        const hashedKey = md5(config.passwd + privateKey).toString();
        if (hashedKey !== key) {
            res.send({
                'status': 'failed',
            });
        };

        Blog.deleteOne({
            '_id': id
        }, (err, doc) => {
            err ? console.error('Error: delete the blog Failed. DeleteBlog.js', err) : res.send({
                'status': 200
            });
        });
    });

module.exports = router;