<template>
    <div class='authDiv'>
        <div id='authBgImage' :style='clientHeight'>
            <input v-model='passwd' @keyup.enter='auth' id='authInput'>
        </div>
    </div>
</template>

<script>
    const config = require('../../config.json');
    
    export default {
        name: 'AuthComName',
        data() {
            return {
                clientHeight: {
                    height: '600px',
                },
                passwd: '',
                subUrl: `${config.root}:3000/api/auth`,
            };
        },
        methods: {
            auth() {
                this.$post(this.subUrl, {
                    passwd: this.passwd,
                }).then((res) => {
                    if (res.status === 'ok') {
                        this.$message({
                            message: '登录成功',
                            type: 'success',
                        });
                        this.$route.meta.authed = true;
                        this.passwd = '';
                        this.$router.push({
                            path: '/login',
                        });
                    } else {
                        this.passwd = '';
                        this.$message.error({
                            message: '登录失败',
                        });
                    }
                }).catch((err) => {
                    console.log(err);
                });
            },
        },
        mounted() {
            this.clientHeight.height = `${document.documentElement.clientHeight}px`;
            const that = this;
            window.onresize = function temp() {
                that.clientHeight.height = `${document.documentElement.clientHeight}px`;
            };
        },
    };
</script>

<style>
    #authBgImage {
        background-image: url('../../assets/image/girl-min.jpg');
        width: 100%;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        position: fixed;
        top: 0;
        left: 0;
        opacity: 0.99;
        z-index: -10;
        text-align: center;
    }
    
    #authInput {
        margin-top: 15rem;
        width: 13rem;
        height: 1.5rem;
        opacity: 0.7;
        padding: 0.2rem 0.5rem;
        letter-spacing: 1px;
        font-size: 18px;
    }
</style>