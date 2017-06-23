<template>
    <div class='container' v-loading.fullscreen.lock='loading'>
        <el-card class='bord-card'>
            <el-input v-model='title' placeholder='标题君' class='titleInput'></el-input>
            <i class='el-icon-close' @click='backOne'></i>
            <div class='blogTags'>
                <el-tag :key='tag' v-for='tag in blogTags' :closable='true' :close-transition='false' @close='handleClose(tag)'>
                    {{tag}}
                </el-tag>
                <el-input class='input-new-tag' id='inputNewTag' v-if='inputVisible' v-model='inputValue' ref='saveTagInput' size='mini' @keyup.enter.native='handleInputConfirm' @blur='handleInputConfirm'>
                </el-input>
                <el-button v-else class='button-new-tag' size='small' @click='showInput'>+ New Tag</el-button>
            </div>
            <el-button class='uploadImage' icon='upload' :plain='true' type='info'>
                图片
                <input type='file' ref='files' @change='inputChange' id='uploadImg'>
            </el-button>
            <el-card class='writeBlog'>
                <el-input type='textarea' autosize resize='none' placeholder='博客内容' v-model='blogContent'>
                </el-input>
                <div class='blogBtns'>
                    <el-button type='text' @click='dialogVisible=true'>预览</el-button>
                    <el-button type='primary' @click='submitBlog' v-if='submitBtnVisible'>发布</el-button>
                    <el-button type='success' @click='updateBlog' v-if='updateBtnVisible'>更新</el-button>
                </div>
                <el-dialog :title='title' v-model='dialogVisible' size='small' top='5%' class='previewDialog'>
                    <div>
                        <vue-markdown :source='blogContent'></vue-markdown>
                    </div>
                </el-dialog>
            </el-card>
        </el-card>
    </div>
</template>

<script>
import VueMarkdown from 'vue-markdown';

const config = require('../../config.json');

export default {
    data() {
        return {
            blogTags: [],
            inputVisible: false,
            inputValue: '',
            title: '',
            blogContent: '',
            dialogVisible: false,
            submitUrl: `${config.root}:80/api/submitblog`,
            getUrl: `${config.root}:80/api/getblog`,
            updateUrl: `${config.root}:80/api/updateblog`,
            uploadUrl: `${config.root}:80/api/uploadimage`,
            authUrl: `${config.root}:80/api/authkey`,
            submitBtnVisible: true,
            updateBtnVisible: false,
            fileList: [],
            uploadHeaders: {
                'Content-Type': '',
            },
            loading: true,
            theCookie: document.cookie.match(/key=(.{32})/)[1],
            homeUrl: `${config.root}`,
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
        inputChange() {
            const files = document.getElementById('uploadImg').files[0];
            const reader = new FileReader();
            reader.addEventListener('load', (ee) => {
                const data = {
                    base64: ee.target.result,
                    key: this.theCookie,
                };
                this.$post(this.uploadUrl, data).then((res) => {
                    const md = `![图片](${config.root}:80${res.path})`;
                    this.blogContent += md;
                }).catch((err) => {
                    console.info('Error: newBlogCom.vue ', err);
                });
            });
            reader.readAsDataURL(files);
        },
        submitBlog() {
            // 提交新博客数据．
            // post new blog data.
            this.$post(this.submitUrl, {
                blogTitle: this.title,
                blogTags: this.blogTags,
                blogContent: this.blogContent,
                key: this.theCookie,
            }).then((res) => {
                if (res.status === 200) {
                    this.open('博客提交成功！');
                }
            }).catch((err) => {
                console.error('Failed: submit blog infomation failed.NewBlogCom.vue.', err);
            });
        },
        updateBlog() {
            // 提交更新的博客数据．
            // post updated blog data.
            this.$post(this.updateUrl, {
                id: this.$route.params.id,
                title: this.title,
                tags: this.blogTags,
                content: this.blogContent,
                key: this.theCookie,
            }).then((res) => {
                if (res.code === 200) {
                    this.open('博客更新成功！');
                }
            }).catch((err) => {
                console.error('Failed: update blog infomation failed.NewBlogCom.vue.', err);
            });
        },
        open(info) {
            this.$message({
                message: info,
                type: 'success',
            });
            this.$router.push({
                name: 'LoginRoute',
            });
        },
        backOne() {
            // back to login page.
            location.href = this.homeUrl;
        },
    },
    created() {
        // 0表示写博客，其它情况表示编辑博客
        // 0 means that this component is used for writing new blog.
        // otherwise, this component is used for editing old blog.
        const id = this.$route.params.id;
        if (id !== '0') {
            // 让发布按钮消失，换成更新按钮
            this.submitBtnVisible = false;
            this.updateBtnVisible = true;
            // 从服务器拉取博客数据，推送到视图中
            this.$post(this.getUrl, {
                id,
                req: 'preview',
            }).then((res) => {
                const data = res;
                this.loading = false;
                this.title = data.title;
                this.blogContent = data.content;
                this.blogTags = data.tags;
            }).catch((err) => {
                console.error('Error: Get the blog error:', err);
            });
        } else {
            this.loading = false;
        }
    },
    beforeRouteLeave(to, from, next) {
        if (to.name === 'LoginRoute') {
            this.$post(this.authUrl, {
                key: this.theCookie,
            }).then((res) => {
                if (res.status === 'ok') {
                    next();
                } else {
                    next({
                        path: '/auth',
                    });
                }
            });
        }
        next();
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
    margin: 1rem 0 1rem 0;
    display: flex;
    align-items: center;
}

.blogTags .el-tag {
    margin: 0 0.3rem;
    min-width: 4rem;
    text-align: center;
}

.blogTags .el-tag i {
    color: white;
    margin-left: 0.3rem;
}

.blogTags input {
    width: 5rem;
}

.blogTags .button-new-tag {
    height: 24px;
    line-height: 24px;
    padding: 0 0.5rem;
}

.uploadImage {
    width: 4rem;
    height: 24px;
    position: relative;
    border-radius: 3px;
    line-height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    margin-bottom: 1rem;
}

#uploadImg {
    opacity: 0;
    width: 4rem;
    height: 24px;
    position: absolute;
    top: 0;
    left: 0;
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
    font-size: 20px;
    line-height: 1.6;
    word-break: break-all;
}

.writeBlog .previewDialog .el-dialog__header {
    text-align: center;
}

.writeBlog .previewDialog pre {
    overflow: auto;
    background: #8492A6;
    padding: 1rem;
}

.writeBlog .previewDialog p code {
    background: #D3DCE6;
    padding: 0 0.2rem;
    margin: 0 0.2rem;
}

.writeBlog .previewDialog ul,
.writeBlog .previewDialog ol {
    padding-left: 1rem;
}

.writeBlog .previewDialog img {
    width: 99%;
    height: 99%;
}
</style>