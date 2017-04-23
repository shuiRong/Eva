<template>
    <div class='container'>
        <el-card class='bord-card'>
            <el-input v-model='title' placeholder='标题君' class='titleInput'></el-input>
            <i class='el-icon-close' @click='backOne'></i>
            <div class='blogTags'>
                <el-tag :key="tag" v-for="tag in blogTags" :closable="true" :close-transition="false" @close="handleClose(tag)">
                    {{tag}}
                </el-tag>
                <el-input class='input-new-tag' id='inputNewTag' v-if='inputVisible' v-model='inputValue' ref='saveTagInput' size='mini' @keyup.enter.native='handleInputConfirm' @blur='handleInputConfirm'>
                </el-input>
                <el-button v-else class='button-new-tag' size='small' @click='showInput'>+ New Tag</el-button>
            </div>
            <el-card class='writeBlog'>
                <el-input type='textarea' autosize resize='none' placeholder='博客内容' v-model='blogContent'>
                </el-input>
                <div class='blogBtns'>
                    <el-button type='text' @click='dialogVisible=true'>预览</el-button>
                    <el-button type='primary' @click='submitBlog'>发布</el-button>
                </div>
                <el-dialog :title='title' v-model='dialogVisible' size='small' top='5%' class='previewDialog'>
                    <div>
                        <vue-markdown :source='blogContent' v-highlight></vue-markdown>
                    </div>
                </el-dialog>
            </el-card>
        </el-card>
    </div>
</template>

<script>
    import VueMarkdown from 'vue-markdown';
    
    export default {
        data() {
            return {
                blogTags: [],
                inputVisible: false,
                inputValue: '',
                title: '',
                blogContent: '',
                dialogVisible: false,
                submitUrl: 'http://127.0.0.1:3000/api/submitblog',
            };
        },
        methods: {
            handleClose(tag) {
                this.blogTags.splice(this.blogTags.indexOf(tag), 1);
            },
    
            showInput() {
                this.inputVisible = true;
                this.$nextTick(() => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },
    
            handleInputConfirm() {
                const inputValue = this.inputValue;
                if (inputValue) {
                    this.blogTags.push(inputValue);
                }
                this.inputVisible = false;
                this.inputValue = '';
            },
            submitBlog() {
                this.$http.post(this.submitUrl, {
                    blogTitle: this.title,
                    blogTags: this.blogTags,
                    blogContent: this.blogContent,
                }).then((res) => {
                    if (res.status === 200) {
                        this.open();
                    }
                }).catch((res) => {
                    console.log('Failed: submit blog infomation failed.NewBlogCom.vue.', res);
                });
            },
            open() {
                this.$message({
                    message: '博客提交成功！',
                    type: 'success',
                });
                this.$router.push({
                    name: 'LoginRoute',
                });
            },
            backOne() {
                this.$router.push({
                    name: 'LoginRoute',
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
    .bord-card>div {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
    }
    
    .bord-card .titleInput {
        width: 65%;
    }
    
    .el-icon-close {
        position: absolute;
        right: 2rem;
        color: grey;
    }
    
    .el-icon-close:hover {
        color: #324057;
    }
    
    .bord-card .blogTags {
        margin: 1rem 0 2rem 0;
        display: flex;
        align-items: center;
    }
    
    .blogTags .el-tag {
        margin: 0 0.3rem;
        min-width: 5rem;
        text-align: center;
    }
    
    .blogTags input {
        width: 5rem;
    }
    
    .blogTags .button-new-tag {
        height: 24px;
        line-height: 24px;
        padding: 0 0.5rem;
    }
    
    .bord-card .writeBlog {
        width: 100%;
        min-height: 10rem;
    }
    
    .writeBlog>div {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: space-between;
    }
    
    .writeBlog textarea {
        width: 100%;
        min-height: 20rem;
        padding: 1rem;
        margin-bottom: 1rem;
        border: 0;
        box-sizing: border-box;
        font-size: 20px;
    }
    
    .writeBlog .previewDialog .el-dialog__body {
        padding-left: 1.5rem;
        min-height: 10rem;
    }
    
    .writeBlog .previewDialog pre code {
        background: #8492A6;
    }
    
    .writeBlog .previewDialog p code {
        background: #C0CCDA;
    }
</style>