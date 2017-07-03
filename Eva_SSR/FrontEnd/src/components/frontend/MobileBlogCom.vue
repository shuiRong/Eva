<template>
    <div class="yinyang">
        <div class='blogPage'>
            <div id='bgImage2' :style='clientHeight'>
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
    },
    components: {
        VueMarkdown,
    },
    created() {
        this.$post(this.getUrl, {
            id: this.$route.params.id,
            req: '', // 返回博客所有数据,
        }).then((res) => {
            this.blog = res;
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

blockquote {
    border-left: 0.5rem solid black;
    margin-left: 1rem;
    padding-left: 1rem;
}


/* loading 动画*/

/*body,
html {
    width: 100%;
    height: 100%;
}

body {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: lightslategray;
}*/

.yinyang {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: linear-gradient(to bottom, black 0%, black 50%, white 50%, white 100%);
    display: none;
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