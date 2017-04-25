var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.json({
        'id': 123,
        'msg': 'textmsg',
        'code': 12345,
    });
});

module.exports = router;