const express = require('express');
const router = express.Router();
const config = require('../config.json');
const md5 = require('crypto-js/md5');

router.route('/')
    .post((req, res) => {
        const key = req.body.key;
        const privateKey = config.privateKey;
        const hashedKey = md5(config.passwd + privateKey).toString();
        if (hashedKey === key) {
            res.json({
                'status': 'ok',
            });
        } else {
            res.json({
                'status': 'failed',
            })
        }
    });

module.exports = router;