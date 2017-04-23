const express = require('express');
const router = express.Router();
require('../database/connect');
const NewBlog = require('../database/blog');
const Tags = require('../database/tags');
const moment = require('moment');

router.route('/')
    .post((req, res, next) => {
        let data = req.body;
        let newBlog = new NewBlog({
            title: data.blogTitle,
            tags: data.blogTags,
            content: data.blogContent,
            created_at: new moment().format(),
        });
        let saveBlog = new Promise((resolve, reject) => {
            newBlog.save((err, doc) => {
                err ? reject(err) : resolve(doc);
            });
        });

        saveBlog.then((value) => {
            res.json({
                'status': 'submit success',
            });
        }, (err) => {
            console.error('Error: submitblog.js line:27', err);
        });
    });

module.exports = router;