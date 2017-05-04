const express = require('express');
const router = express.Router();
const config = require('../config.json');

router.route('/')
    .post((req, res) => {
        let passwd = req.body.passwd;
        if (passwd === config.passwd) {
            res.json({
                'status': 'ok',
            });
        } else {
            res.json({
                'status': 'failed',
            });
        }
    });

module.exports = router;