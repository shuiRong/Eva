<template>
    <div class='container'>
        <el-card class='bord-card'>
            <div class='mainContent'>
                <div class='nav'>
                    <el-button type='primary' v-on:click='select("all")'>全部</el-button>
                    <template v-for='(tag,index) in tags'>
                                                                                <el-button　:type='computedColor(index)' @click='select(tag)'>{{tag}}</el-button>
</template>
                </div>
                <router-link :to='{name: "NewBlogRoute",params:{id:"0"}}'>
                    <el-button type='primary' icon='plus' class='writeBtn'>写博客</el-button>
                </router-link>
                <div class='blogInfo'>
<template v-for='blog in blogs'>
    <el-card class='blogCard'>
        <div class='blogLeft'>
            <router-link :to='{name: "BlogRoute",params:{id:blog._id}}'>{{blog.title}}</router-link>
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
                                <i class='el-icon-edit' @click='editBlog(blog._id)'></i>
                                <i class='el-icon-delete' @click='deleteBlog(blog._id)' ></i>
                            </div>
                        </el-card>
                    </template>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
    const config = require('../../config.json');

    export default {
        name: 'LoginComName',
        data() {
            return {
                tags: [],
                blogs: [],
                constBlogs: [],
                colors: ['danger', 'warning', 'success', 'info', '', 'primary'],
                // 记录标签是否被选中，１表示标签被选择了（即点了＂全部＂之外的其他标签），0表示标签没有被选中（即标签没有点，或者点了全部）
                // recored the status of whether whether tags are selected.
                // 1 means that tags are selected.
                // (In the other way, users clicked on of the tag except the "All Tag").
                // 0 means that tags are not selected
                // (In the other way, users haven't clicked on of the tag
                // except the "All Tag" or clicked the "All tag").
                selectStatus: 0,
                getUrl: `${config.root}:3000/api/getblogs`,
                deleteUrl: `${config.root}:3000/api/deleteblog`,
            };
        },
        methods: {
            // 按照顺序返回颜色值．
            // reutrn color in the order.
            computedColor(index) {
                return this.colors[index % this.colors.length];
            },
            // 向服务器发送删除博客的请求，同时从data里删除该博客信息，
            // 然后重新计算标签信息
            // post a request for delete the blog, meantime, delete this blog data from data．
            // And then recompute the tags data.
            deleteBlog(blogId) {
                this.$confirm('此操作将永久删除该博客, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!',
                    });
                    this.$http.post(this.deleteUrl, {
                        id: blogId,
                    }).then(() => {
                        // 顺便一提，服务器端删除博客成功之后，主动删除this.blogs里的相关数据．这样正好会触发vue视图更新．双向绑定特性用着挺爽的．
                        // 注： 在标签选中状态下删除博客，和未选中状态下删除博客需要两种方式去处理上方标签和this.blogs/this.constBlogs的更新．
                        // btw, the view will update while delete infomation from this.blogs.
                        // Vue.js is convenient.
                        // Attention: We need two way to update tags
                        // and `this.blogs` and `this.constBlogs`,
                        // depend on deleting blog whether tag are selected and tag are not selected.
                        const blogss = [];
                        this.blogs.forEach((ele) => {
                            if (ele._id !== blogId) {
                                blogss.push(ele);
                            }
                        });
                        this.blogs = blogss;
                        if (this.selectStatus === 0) {
                            this.constBlogs = blogss;
                        } else {
                            const blogs = [];
                            this.constBlogs.forEach((ele) => {
                                if (ele._id !== blogId) {
                                    blogs.push(ele);
                                }
                                this.constBlogs = blogs;
                            });
                        }
                        this.reComputeTags();
                    }).catch((err) => {
                        console.error('Failed: Delete The Blog Failed ', err);
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除',
                    });
                });
            },
            editBlog(blogId) {
                this.$router.push({
                    name: 'NewBlogRoute',
                    params: {
                        id: blogId,
                    },
                });
            },
            reComputeTags() {
                const tags = [];
                this.constBlogs.forEach((ele) => {
                    ele.tags.forEach((tag) => {
                        tags.push(tag);
                    });
                });
                this.tags = [...new Set(tags)];
            },
            select(arr) {
                // 干啥被选标签更新`this.blogs`数据
                // update `this.blogs` according to which tag is selected.
                if (arr === 'all') {
                    this.blogs = this.constBlogs;
                    this.selectStatus = 0;
                } else {
                    this.selectStatus = 1;
                    const blogs = [];
                    this.constBlogs.forEach((ele) => {
                        if (ele.tags.indexOf(arr) >= 0) {
                            blogs.push(ele);
                        }
                    });
                    this.blogs = blogs;
                }
            },
        },
        mounted() {
            // get the blogs data from remote server.
            this.$http({
                url: this.getUrl,
                methods: 'get',
            }).then((res) => {
                this.blogs = res.data.reverse();
                this.constBlogs = this.blogs;
                this.reComputeTags();
            }).catch((err) => {
                console.error('Error: LoginCom.vue,get blogs informations failed! ', err);
            });
        },
    };
</script>

<style>
    @import url('https://cdn.bootcss.com/element-ui/1.2.8/theme-default/index.css');
    .container {
        display: flex;
        justify-content: center;
        margin-top: 2.5%;
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
        min-width: 100%;
    }
    
    .nav {
        background: #EFF2F7;
        margin: 1rem 0 3rem 0;
        font-size: 25px;
        padding: 0.5rem;
        min-width: 100%;
        min-height: 5rem;
        box-sizing: border-box;
    }
    
    .nav .el-button {
        margin: 0.4rem 0.5rem;
    }
    
    .mainContent .writeBtn {
        margin: 1rem;
    }
    
    .blogInfo {
        min-height: 5rem;
        display: flex;
        flex-direction: column;
    }
    
    .blogInfo .blogCard {
        margin-bottom: 0.5rem;
    }
    
    .blogInfo .blogCard>div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #E5E9F2;
        padding: 0.7rem;
        box-sizing: border-box;
        min-width: 100%;
        min-height: 4rem;
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