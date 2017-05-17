const express = require('express');
const router = express.Router();
const fs = require('fs');

router.route('/')
    .post((req, res) => {
        let base64 = req.body.base64;
        //去掉base64数据最前面的＂图片类型＂字符串
        let type = base64.match(/^data:image\/(.+);/)[1];
        base64 = base64.replace(/^data:image\/\w+;base64,/, "");
        // 解码base64成二进制数据．
        let data = new Buffer(base64, 'base64');

        let fsExistsSync = (path) => {
                try {
                    fs.accessSync(path, fs.F_OK);
                } catch (e) {
                    return false;
                }
                return true;
            }
            // 如果Home文件夹下，此目录不存在．就新建一个．
        if (!fsExistsSync('/home/shuirong/uploads/images')) {
            fs.mkdirSync('/home/shuirong/uploads');
            fs.mkdirSync('/home/shuirong/uploads/images');
        }
        const name = `uploads/images/${String(new Date()).replace(/[ :]/g,'').match(/.{6}(.{12})/)[1]}.${type}`;
        fs.open(name, "a", 0644, function(e, fd) {
            if (e) throw e;
            fs.write(fd, data, function(e) {
                if (e) throw e;
                fs.closeSync(fd);
                res.json({
                    'path': name.replace('uploads', ''),
                });
            });
        });

    });

module.exports = router;