var express = require('express');
var router = express.Router();
require('../database/connect');
const Blog = require('../database/blog');

router.get('/', function(req, res, next) {
    let getBlog = new Promise((resolve, reject) => {
        Blog.find({}, (err, doc) => {
            if (err) {
                reject(err);
            } else {
                let arr = [];
                let obj;
                for (blog of doc) {
                    obj = {
                        _id: blog._id,
                        title: blog.title,
                        tags: blog.tags,
                    }
                    arr.push(obj);
                }
                resolve(arr.reverse());
            }
        });
    });
    getBlog.then((data) => {
        res.render('index', {
            data: data
        });
    }).catch((err) => {
        console.log('Error: get blog info failed. getblog.js', err);
        res.end()
    })
});

module.exports = router;