<template>
    <div class='blogPage' v-loading.fullscreen.lock='loading'>
        <div id='bgImage2' :style='clientHeight' @click='backToHome'>
        </div>
        <div class='bpCardTitle'>{{blog.title}}</div>
        <div class='bpTags'>
            <template v-for='tag in blog.tags'>
                <span>
                    {{tag}}
                </span>
            </template>
        </div>
        <p class='bpTime'>{{blog.created_at}}</p>
        <div class='bpCardContent'>
            <vue-markdown :source='blog.content'>
            </vue-markdown>
        </div>
    </div>
</template>

<script>
// 使用这个组件把md文本渲染成html
// Render the markdown text to html using this component
import VueMarkdown from 'vue-markdown';

const config = require('../../config.json');

export default {
    data() {
        return {
            blog: {},
            clientHeight: {
                height: '600px',
            },
            getUrl: `${config.root}:80/api/getblog`,
            authUrl: `${config.root}:80/api/authkey`,
            loading: true,
            homeUrl: `${config.root}`,
        };
    },
    methods: {
        // 点击背景图就回到主页，贴心吧，嘻嘻．
        // Back to home page When you click the background image. sweet details.
        backToHome() {
            location.href = this.homeUrl;
        },
    },
    components: {
        VueMarkdown,
    },
    created() {
        // 在Vue实例created时期从服务器获取博客数据．
        // Get the blog data from remote server in the created period.
        // this.$http.post(this.getUrl, {
        //     id: this.$route.params.id,
        // }).then((res) => {
        //     this.blog = res.data;
        // }).catch((err) => {
        //     console.error('Error: Get the blog infomation failed! ', err);
        // });
        this.$post(this.getUrl, {
            id: this.$route.params.id,
            req: '', // 返回博客所有数据,
        }).then((res) => {
            this.blog = res;
            this.loading = false;
        }).catch((err) => {
            console.error('Error: Get the blog infomation failed! ', err);
        });
    },
    mounted() {
        // 动态设置背景图的高度为浏览器可视区域高度.
        // 首先在Virtual DOM渲染数据时，设置下背景图的高度．
        // 然后监听window的resize事件．在浏览器窗口变化时再设置下背景图高度．
        // Dynamically set the backgorund image's height
        // to make it's same with the borwser window's height.
        // Listen the resize event of window to dynamically set
        // the background image's height.
        this.clientHeight.height = `${document.documentElement.clientHeight}px`;
        const that = this;
        window.onresize = function temp() {
            that.clientHeight.height = `${document.documentElement.clientHeight}px`;
        };
    },
    beforeRouteLeave(to, from, next) {
        if (to.name !== 'HomeRoute' && to.name !== 'AuthRoute') {
            try {
                const theCookie = document.cookie.match(/key=(.{32})/)[1];
                this.$post(this.authUrl, {
                    key: theCookie,
                }).then((res) => {
                    if (res.status === 'ok') {
                        next();
                    } else {
                        next({
                            path: '/auth',
                        });
                    }
                });
            } catch (e) {
                next({
                    path: '/',
                });
            }
        }
        next();
    },
};
</script>

<style>
@import url('../../assets/css/markdown-github.css');
.blogPage {
    word-break: break-all;
    padding: 1rem;
}

#bgImage2 {
    width: 100%;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: fixed;
    top: 0;
    left: 0;
}

.bpCardTitle {
    font-size: 30px;
    color: #1F2D3D;
    width: 100%;
    margin: auto;
    text-align: center;
    background: #F9FAFC;
}

.bpTags {
    margin: 1rem auto;
    text-align: center;
}

.bpTags span {
    margin: auto 0.3rem;
    background: #99A9BF;
    padding: 0.2rem 0.3rem;
    border-radius: 5px;
}

.bpTime {
    color: #8492A6;
    font-size: 17px;
    text-align: center;
}

.bpCardContent {
    box-sizing: border-box;
    width: 100%;
    min-height: 20rem;
    color: #1F2D3D;
    font-size: 20px;
    line-height: 1.6;
}

.bpCardContent pre {
    background: #8492A6;
    overflow: auto;
    padding: 1rem;
    word-break: break-all;
}

.bpCardContent p code {
    background: #D3DCE6;
    padding: 0 0.2rem;
    margin: 0 0.2rem;
}

.bpCardContent ol,
.bpCardContent ul {
    padding-left: 1rem;
}

.bpCardContent img {
    width: 100%;
    height: 100%;
    margin: 0.5rem 0;
}

/* 覆盖Markdown样式*/

blockquote{
    border-left: 0.5rem solid black;
    margin-left: 1rem;
    padding-left: 1rem;
}

</style>