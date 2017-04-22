<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'app',
        data() {
            return {
                msg: '',
            };
        },
        created() {
            this.$http({
                url: 'http://127.0.0.1:3000/',
                methods: 'get',
            }).then((res) => {
                this.msg = res;
            });
        },
    };
</script>

<style>
    #app {
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #FFF;
        font-size: 12px;
    }
    
    body,
    div,
    span,
    a,
    p,
    ul,
    li {
        margin: 0;
        padding: 0;
    }
</style>