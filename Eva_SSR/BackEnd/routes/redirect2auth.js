var express = require('express');
var router = express.Router();

router.route('/')
    .get(function(err, res) {
        res.redirect('/dist/#/auth')
    })

module.exports = router