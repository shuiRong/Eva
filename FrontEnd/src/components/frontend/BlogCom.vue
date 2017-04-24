<template>
    <div class='blogPage'>
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
            <vue-markdown :source='blog.content' v-highlight>
            </vue-markdown>
        </el-card>
    </div>
</template>

<script>
    import VueMarkdown from 'vue-markdown';
    
    export default {
        data() {
            return {
                blog: {},
                clientHeight: {
                    height: '600px',
                },
                getUrl: 'http://127.0.0.1:3000/api/getblog',
            };
        },
        created() {
            this.$http.post(this.getUrl, {
                id: this.$route.params.id,
            }).then((res) => {
                this.blog = res.data;
            }).catch((err) => {
                console.error('Error: Get the blog infomation failed! ', err);
            });
            // 动态设置bgimage高度为屏幕高度
            this.clientHeight.height = `${document.documentElement.clientHeight}px`;
        },
        methods: {
            // 点击背景图就回到主页，贴心吧，嘻嘻．
            backToHome() {
                this.$router.push({
                    name: 'HomeRoute',
                });
            },
        },
        components: {
            VueMarkdown,
        },
    };
</script>

<style>
    @import url('../../assets/css/markdown-github.css');
    .blogPage {
        word-break: break-all;
    }
    
    #bgImage2 {
        background-image: url('../../assets/image/girl.jpg');
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
        margin: auto;
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
    }
    
    .bpCardContent p code {
        background: #C0CCDA;
    }
</style>