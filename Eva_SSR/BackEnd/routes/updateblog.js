const express = require('express');
const router = express.Router();
require('../database/connect');
const Blog = require('../database/blog');
const config = require('../config.json');
const md5 = require('crypto-js/md5');

// 更新数据库里的博客数据．
// update blog data from database
router.route('/')
    .post((req, res) => {
        const data = req.body;
        // Auth the hashed key
        let key = data.key;
        const privateKey = config.privateKey;
        const hashedKey = md5(config.passwd + privateKey).toString();
        if (hashedKey !== key) {
            res.send({
                'status': 'failed',
            });
        };

        Blog.update({
            '_id': data.id
        }, {
            $set: {
                'title': data.title,
                'content': data.content,
                'tags': data.tags,
            }
        }, (err, doc) => {
            err ? res.end() : res.json({
                'code': 200,
                'message': 'update success',
            });
        })
    });

module.exports = router;