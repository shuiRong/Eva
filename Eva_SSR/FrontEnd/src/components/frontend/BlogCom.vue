<template>
    <div class='blogPage'>
        <div class="yinyang">
        </div>
        <div class='content'>
            <div id='bgImage2' :style='clientHeight' @click='backToHome'>
            </div>
            <el-card class='bpCardTitle'>{{blog.title}}</el-card>
            <div class='bpTags'>
                <template v-for='tag in blog.tags'>
                    <el-tag type='gray'>
                        {{tag}}
                    </el-tag>
                </template>
            </div>
            <p class='bpTime'>{{blog.created_at}}</p>
            <el-card class='bpCardContent'>
                <vue-markdown :source='blog.content'>
                </vue-markdown>
            </el-card>
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
            document.getElementsByClassName('yinyang')[0].style.display = 'none'
            document.getElementsByClassName('content')[0].style.display = 'block'
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
}

.content {
    display: none;
}

#bgImage2 {
    background-image: url('../../assets/image/girl-min.jpg');
    width: 100%;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: fixed;
    top: 0;
    left: 0;
    opacity: 0.99;
}

.bpCardTitle {
    font-size: 30px;
    color: #1F2D3D;
    width: 40%;
    margin: auto;
    text-align: center;
    opacity: 0.75;
}

.bpTags {
    margin: 1rem auto;
    width: 30%;
    text-align: center;
    opacity: 0.8;
}

.el-tag {
    margin: auto 0.3rem;
}

.bpTime {
    color: #EFF2F7;
    font-size: 17px;
    text-align: center;
    opacity: 0.7;
}

.bpCardContent {
    box-sizing: border-box;
    padding: 1rem;
    margin: 2rem auto;
    width: 75%;
    min-height: 20rem;
    color: #1F2D3D;
    font-size: 25px;
    line-height: 1.6;
    opacity: 0.75;
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

blockquote {
    border-left: 0.5rem solid black;
    margin-left: 1rem;
    padding-left: 1rem;
}



/* loading 动画*/

body {
    background-color: #E5E9F2;
}

.yinyang {
    position: absolute;
    left: 45%;
    left: calc(50% - 100px);
    top: 30%;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: linear-gradient(to bottom, black 0%, black 50%, white 50%, white 100%);
    box-shadow: 6px 6px 27px 4px rgba(0, 0, 0, 0.16);
    display: flex;
    align-items: center;
    justify-content: center;
    animation: 2s rotate linear infinite;
}

.yinyang:after,
.yinyang:before {
    content: '';
    display: block;
    border-radius: 50%;
}

.yinyang:after {
    width: 75%;
    height: 75%;
    background: radial-gradient(ellipse at center, black 0%, black 25%, white 25%, white 100%);
    animation: inner-size 3s ease-in-out infinite;
    animation-delay: -1.5s;
}

.yinyang:before {
    width: 25%;
    height: 25%;
    background: radial-gradient(ellipse at center, white 0%, white 25%, black 25%, black 100%);
    animation: inner-size 3s ease-in-out infinite;
}

@keyframes inner-size {
    0%,
    100% {
        width: 75%;
        height: 75%;
    }

    50% {
        width: 25%;
        height: 25%;
    }
}

@keyframes rotate {
    to {
        transform: rotate(-360deg)
    }
}
</style>