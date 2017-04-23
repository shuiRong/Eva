<template>
    <div class='container'>
        <el-card class='bord-card'>
            <div class='mainContent'>
                <div class='nav'>
                    <template v-for='(tag,index) in tags'>
                        <el-tag　:type='computedColor(index)'>{{tag}}</el-tag>
                    </template>
                </div>
                <router-link :to='{name: "NewBlogRoute"}'>
                    <el-button type='primary' icon='plus'>写博客</el-button>
                </router-link>
                <div class='blogInfo'>
                    <template v-for='blog in blogs'>
                        <el-card class='blogCard'>
                            <div class='blogLeft'>
                                <router-link :to='{name: "BackEndBlogRoute",params:{id:blog.id}}'>{{blog.title}}</router-link>
                                <div class='blogDown'>
                                    <div>
                                        <template v-for='tag in blog.tags'>
                                            <el-tag>{{tag}}</el-tag>
                                        </template>
                                    </div>
                                    <span class='blogTime'>{{blog.created_at}}</span>
                                </div>
                            </div>
                            <div class='blogRight'>
                                <i class='el-icon-edit'></i>
                                <i class='el-icon-delete'></i>
                            </div>
                        </el-card>
                    </template>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: 'LoginComName',
        data() {
            return {
                tags: ['前端', '后端', '生活', '读书', '随便说点什么吧', '当然我在扯淡', '前端', '后端', '生活', '读书', '随便说点什么吧', '当然我在扯淡'],
                blogs: [{
                    title: '今天说点啥呢？',
                    created_at: '2017-02-22',
                    tags: ['前端', '读书'],
                    id: '8as6d564c3zxc5v1456sd4f53s',
                }, {
                    title: '今天说点啥呢？测试的道理',
                    created_at: '2017-02-22',
                    tags: ['前端', '后端', '读书'],
                    id: '8as6d564c3zxc5v1456sd4f53s',
                }, {
                    title: '今天说点啥呢？测试的道理测试的说点啥呢？测试的道理测试的道理',
                    created_at: '2017-02-22',
                    tags: ['前端', '后端', '生活', '读书'],
                    id: '8as6d564c3zxc5v1456sd4f53s',
                }, {
                    title: '今天说点啥呢？测试的道理',
                    created_at: '2017-02-22',
                    tags: ['前端', '后端', '生活', '读书'],
                    id: '8as6d564c3zxc5v1456sd4f53s',
                }],
                colors: ['', 'gray', 'danger', 'warning', 'primary', 'success'],
                count: 0,
            };
        },
        methods: {
            computedColor(index) {
                return this.colors[index % this.colors.length];
            },
        },
    };
</script>

<style>
    @import url('https://cdn.bootcss.com/element-ui/1.2.8/theme-default/index.css');
    .container {
        display: flex;
        justify-content: center;
        margin-top: 3rem;
        margin-bottom: 2rem;
        color: black;
        font-size: 1.5rem;
    }
    
    .bord-card {
        width: 80%;
        min-height: 20rem;
        background: #F9FAFC;
    }
    
    .mainContent {
        min-height: 40rem;
    }
    
    .nav {
        background: #EFF2F7;
        margin: 1rem 0 3rem 0;
        font-size: 25px;
        padding: 0.5rem;
    }
    
    .nav .el-tag {
        min-width: 5rem;
        text-align: center;
        margin: 0.4rem 0.4rem;
        height: 2.5rem;
        line-height: 2.5rem;
        font-size: 1.25rem;
    }
    
    .mainContent button{
        margin: 1rem;
    }

    .blogInfo {
        min-height: 5rem;
        display: flex;
        flex-direction: column;
    }
    
    .blogInfo .blogCard{
        margin-bottom: 0.5rem;
    }
    .blogInfo .blogCard > div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #E5E9F2;
        padding: 0.7rem;
    }
    
    .blogInfo .blogLeft {
        width: 70%;
    }
    
    .blogInfo a {
        color: #324057;
        text-decoration: none;
    }
    
    .blogInfo .blogDown {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
    }
    
    .blogInfo .blogDown .el-tag {
        margin: 0.6rem 0.2rem 0 0.2rem;
    }
    
    .blogInfo .blogDown .blogTime {
        font-size: 1rem;
        margin-left: 3rem;
        color: #99A9BF;
    }
    
    .blogInfo .blogRight i:first-child {
        color: #1D8CE0;
        font-size: 1.3rem;
    }
    
    .blogInfo .blogRight i:last-child {
        color: #FF4949;
    }
</style>