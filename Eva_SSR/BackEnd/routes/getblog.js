const express = require('express');
const router = express.Router();
require('../database/connect');
const Blog = require('../database/blog');

// 发给前端特定博客数据
// send the blog data (one) to frontend.

// req.body.req为home: 只需要返回博客title,tags
// preview: title,tags,_id,content
// 其他: title,tags,time, content
router.route('/')
    .post((req, res) => {
        let reqType = req.body.req;
        if (reqType === 'home') {
            Blog.findOne({
                '_id': req.body.id
            }, (err, doc) => {
                err ? res.end() : res.json({
                    _id: doc._id,
                    title: doc.title,
                    tags: doc.tags,
                });
            });
        } else if (reqType === 'preview') {
            Blog.findOne({
                '_id': req.body.id
            }, (err, doc) => {
                err ? res.end() : res.json({
                    _id: doc._id,
                    title: doc.title,
                    tags: doc.tags,
                    content: doc.content,
                });
            });
        } else {
            Blog.findOne({
                '_id': req.body.id
            }, (err, doc) => {
                err ? res.end() : res.json(doc);
            });
        }

    });

module.exports = router;