# Eva-SSR

### 怎么使用?

首先,你需要修改`BackEnd`,`FrontEnd`项目里的`config.json`文件里的配置.

然后:

```shell
cd FrontEnd
// 构建前端项目
npm run build
```

把生成的dist文件复制到`BackEnd`文件夹里的`public`文件夹下

然后:

```shell
cd ../BackEnd
// 运行后端程序
sudo node ./bin/www
```

**PS :** 程序监听80端口,需要保证该端口不被其他程序占用(被占用的话,kill掉那个进程)

附加:

```shell
// Linux平台
// 查看端口占用情况命令(记住端口的PID)
sudo lsof -i:80
// 杀掉进程命令(<PID>换成上面你看到的PID)
sudo kill <PID>
```



**DONE**