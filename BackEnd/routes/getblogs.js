const express = require('express');
const router = express.Router();
require('../database/connect');
const Blog = require('../database/blog');

router.route('/')
    .get((req, res) => {
        let getBlog = new Promise((resolve, reject) => {
            Blog.find({}, (err, doc) => {
                err ? reject(err) : resolve(doc);
            });
        });
        getBlog.then((data) => {
            res.json(data);
        }).catch((err) => {
            console.log('Error: get blog info failed. getblog.js', err);
        })
    });

module.exports = router;