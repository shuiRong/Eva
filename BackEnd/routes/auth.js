const express = require('express');
const router = express.Router();
const config = require('../config.json');
const md5 = require('crypto-js/md5');

// Auth password and generate a hashed key.
router.route('/')
    .post((req, res) => {
        const passwd = req.body.passwd;
        const privateKey = config.privateKey;
        const hashedKey = md5(passwd + privateKey).toString();
        if (passwd === config.passwd) {
            res.json({
                'status': 'ok',
                'key': hashedKey,
            });
        } else {
            res.json({
                'status': 'failed',
            });
        }
    });

module.exports = router;