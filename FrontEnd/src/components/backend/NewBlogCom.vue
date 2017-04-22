<template>
    <div class='container'>
        <el-card class='bord-card'>
            <el-input v-model='title' placeholder='标题君' class='titleInput'></el-input>
            <div class='blogTags'>
                <el-tag :key="tag" v-for="tag in dynamicTags" :closable="true" :close-transition="false" @close="handleClose(tag)">
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
                    <el-button>预览</el-button>
                    <el-button type='primary'>发布</el-button>
                </div>
            </el-card>
        </el-card>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                dynamicTags: ['标签一', '标签二', '标签三'],
                inputVisible: false,
                inputValue: '',
                title: '',
                blogContent: '',
            };
        },
        methods: {
            handleClose(tag) {
                this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
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
                    this.dynamicTags.push(inputValue);
                }
                this.inputVisible = false;
                this.inputValue = '';
            },
        },
    };
</script>

<style>
    .bord-card>div {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    
    .bord-card .titleInput {
        width: 65%;
    }
    .bord-card .blogTags{
        margin: 1rem 0 2rem 0;
        display: flex;
        align-items: center;
    }
    .blogTags .el-tag{
        margin: 0 0.3rem;
        min-width: 5rem;
        text-align: center;
    }
    .blogTags input{
        width: 5rem;
    }
    .blogTags .button-new-tag{
        height: 24px;
        line-height: 24px;
        padding: 0 0.5rem;
    }
    .bord-card .writeBlog {
        width: 100%;
        min-height: 10rem;
    }
    .writeBlog > div{
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: space-between;
    }
    .writeBlog textarea{
        width: 100%; 
        min-height: 20rem;
        padding: 1rem;
        margin-bottom: 1rem;
        border: 0;
        box-sizing: border-box;
        font-size: 20px;
    }
    .blogBtns{
    }
</style>