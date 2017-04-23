//链接数据库的 模块，单独分离出来
//不需要导出什么，因为目的不是让其他模块使用，而只是执行
const mongoose = require('mongoose');

//不写这句的话，会报错。至于为什么？...可以先不深究。先完成项目再说，否则每一项都想搞清楚的话，很容易懈怠，进而放弃。
mongoose.Promise = global.Promise;
//debug模式
mongoose.set('debug', true);

const db = mongoose.connect('mongodb://127.0.0.1:27017/blog');

db.connection.on('error', function(error) {
    console.log('连接数据库失败:' + error);
});

db.connection.on('open', function() {
    console.log('连接数据库成功');
});