var express = require('express');
var router = express.Router();

// 从localhost:80/auth 跳转到 localhost:80/dist/$/auth
router.route('/')
    .get(function(err, res) {
        res.redirect('/dist/#/auth')
    })

module.exports = router