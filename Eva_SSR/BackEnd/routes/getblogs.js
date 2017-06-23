const express = require('express');
const router = express.Router();
require('../database/connect');
const Blog = require('../database/blog');

// 从数据库里获取所有博客数据，发给前端
// send blog data to frontend 
router.route('/')
    .get((req, res) => {
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
                    res.json(arr);
                }
            });
        });
        getBlog.then((data) => {
            res.json(data);
        }).catch((err) => {
            console.log('Error: get blog info failed. getblog.js', err);
        })
    });

module.exports = router;