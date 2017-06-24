# Eva-SSR

[中文](README_ZH.md)

### How to use ?

**Firstly**, You need to modify`config.json`in `BackEnd`,`FrontEnd`files.

**Secondly:**

```shell
cd FrontEnd
// build frontend project
npm run build
```

Copy the dist file of generated to `BackEnd/public` file.

**Then:**

```shell
cd ../BackEnd
// Run the program
sudo node ./bin/www
```

**PS :** Program need to listen Port 80, so you need to ensure the port is not used.

Addition:

```shell
// Linux platform
// show which progress is using the port (Remember The PID)
sudo lsof -i:80
// Kill the progress (<PID> is replaced by the PID just a moment ago)
sudo kill <PID>
```



**DONE**