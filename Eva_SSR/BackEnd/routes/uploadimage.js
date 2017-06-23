const express = require('express');
const router = express.Router();
const fs = require('fs');
const config = require('../config.json');
const md5 = require('crypto-js/md5');

router.route('/')
    .post((req, res) => {
        // Auth the hashed key
        let key = req.body.key;
        const privateKey = config.privateKey;
        const hashedKey = md5(config.passwd + privateKey).toString();
        if (hashedKey !== key) {
            res.send({
                'status': 'failed',
            });
        };

        let fsExistsSync = (path) => {
            try {
                fs.accessSync(path, fs.F_OK);
            } catch (e) {
                return false;
            }
            return true;
        }
        if (!fsExistsSync('uploads/images')) {
            fs.mkdirSync('uploads');
            fs.mkdirSync('uploads/images');
        }
        let base64 = req.body.base64;
        //去掉base64数据最前面的＂图片类型＂字符串
        let type = base64.match(/^data:image\/(.+);/)[1];
        base64 = base64.replace(/^data:image\/\w+;base64,/, "");
        // 解码base64成二进制数据．
        let data = new Buffer(base64, 'base64');

        const name = `uploads/images/${String(new Date()).replace(/[ :]/g,'').match(/.{6}(.{12})/)[1]}.${type}`;
        console.log('____________name:', name);
        console.log(base64);

        fs.open(name, "w+", 0644, function(e, fd) {
            if (e) throw e;
            fs.write(fd, data, function(e) {
                if (e) throw e;
                fs.close(fd, function(err) {
                    if (err) {
                        console.log('Error: close opened image file failed.');
                        throw err;
                    }
                    res.json({
                        'path': name.replace('uploads', ''),
                    });
                });

            });
        });

    });

module.exports = router;