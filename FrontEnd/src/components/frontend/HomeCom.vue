<template>
    <div class='homePage'>
        <i class='el-icon-more' @click='aboutDialog=true'></i>
        <el-dialog title='林水溶' v-model='aboutDialog' size='tiny'>
            <p>要做我的小迷妹嘛？（ 滑稽 ）</p>
            <a href='https://github.com/shuiRong' 　target='_blank'>Github</a>
            <a href='https://www.zhihu.com/people/linShuiRong' target='_blank'>知乎</a>
        </el-dialog>
        <div id='bgImage' :style='clientHeight'>
        </div>
        <div id='blogSec' :style='distanceOfTop'>
            <template v-for='blog in blogs'>
                                                                                                                        <el-card class='homeBlogCard'>
                                                                                                                            <router-link :to='{name: "BlogRoute", params:{id: blog._id}}'>
                                                                                                                                {{blog.title}}
                                                                                                                            </router-link>
                                                                                                                            <div>
                                                                                                                                <template v-for='tag in blog.tags'>
                                                                                                                                    <el-tag type='gray'>
                                                                                                                                        {{tag}}
                                                                                                                                    </el-tag>
</template>
                    </div>
                </el-card>
            </template>
        </div>
    </div>
</template>

<script>
    const config = require('../../config.json');
    
    export default {
        data() {
            return {
                clientHeight: {
                    height: '600px',
                },
                height: document.documentElement.clientHeight,
                blogs: [],
                distanceOfTop: {
                    'margin-top': '5rem',
                },
                aboutDialog: false,
                getUrl: `${config.root}:3000/api/getblogs`,
            };
        },
        created() {
            // 在Vue实例created时期从服务器获取博客数据．
            // Get the blog data from remote server in the created period.
            this.$get(this.getUrl).then((res) => {
                this.blogs = res.reverse();
                // 动态设置博客块的margin-top.
                // Set the blog section's margin-top dynamically.
                if (this.blogs.length <= 3) {
                    this.distanceOfTop['margin-top'] = '5rem';
                } else {
                    this.distanceOfTop['margin-top'] = '2rem';
                }
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
            this.$route.meta.authed = true;
            next();
        },
    };
</script>

<style>
    .homePage {
        width: 100%;
    }
    
    .homePage .el-icon-more {
        color: white;
        opacity: 1;
        font-size: 30px;
        z-index: 100;
        position: absolute;
        top: 5%;
        right: 5%;
        border-radius: 50%;
        padding: 5px;
    }
    
    .homePage>i:hover {
        background: white;
        color: #99A9BF;
    }
    
    .homePage .el-dialog__body {
        font-size: 20px;
        line-height: 1.6;
        color: #8492A6;
    }
    
    .homePage .el-dialog a {
        text-decoration: none;
        color: #1F2D3D;
    }
    
    #bgImage {
        background-image: url('../../assets/image/girl-min.jpg');
        width: 100%;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        position: fixed;
        top: 0;
        left: 0;
        opacity: 0.99;
    }
    
    .homeBlogCard {
        width: 45%;
        margin: 0.7rem auto 0 10%;
        opacity: 0.7;
    }
    
    .homeBlogCard a {
        text-decoration: none;
        color: black;
        font-size: 25px;
    }
    
    .el-tag {
        margin: 0.5rem 0.2rem 0 0.2rem;
    }
</style>