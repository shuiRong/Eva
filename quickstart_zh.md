# 快速开始

`Eva`

> 欢迎开始`Eva`博客之旅

`Eva`希望能成为所有对博客界面简洁性有独特审美的用户的终极选择．她的*小*,*美*,*快*,*稳*的特点能让更多人满意．程序完全开源免费，面向所有用户．



#### 快速开始

------

1. [安装MongoDB](https://jockchou.gitbooks.io/getting-started-with-mongodb/content/book/install.html)


1. [安装Node.js](https://nodejs.org/zh-cn/)
2. [下载Express.js](https://expressjs.com/zh-cn/starter/installing.html)
3. [下载Vue-cli](https://cn.vuejs.org/v2/guide/installation.html)
4. 启动MongoDB server：`mongod`

接下来：

```bash
// 下载项目源码
git clone https://github.com/shuiRong/Eva.git
cd Eva
// 下载项目依赖包
npm install
// 运行后端服务器
cd BackEnd && node ./bin/www
// 运行前端服务
cd FrontEnd && npm run dev
// 等待程序自动打开网页(8080端口)
```

**有两个配置文件你要注意**

> Eva/BackEnd/config.json　(保存后台登录的密码)
>
> Eva/FrontEnd/src/config.json  　(后端接口地址，默认: 127.0.0.1)



`/auth` 后台管理的登录界面