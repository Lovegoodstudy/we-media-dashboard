<template>
  <div class="edit-article">
    <el-form ref="edit-article-form" :model="form" label-width="80px" :rules="rules">
      <el-form-item label="标题：" prop="title">
        <el-input v-model="form.title" placeholder="请输入标题（必填）"></el-input>
      </el-form-item>
      <el-form-item label="作者：">
        <el-input v-model="form.author" placeholder="请输入作者，默认为佚名"></el-input>
      </el-form-item>
      <el-form-item label="内容：">
        <vue-editor v-model="form.content" placeholder="请输入文章内容" class="vue-editor"></vue-editor>
      </el-form-item>
      <el-form-item label="摘要：">
        <el-input type="textarea" v-model="form.introduction" placeholder="请输入文章摘要，默认会选取当前文章内容的前80个字符"></el-input>
      </el-form-item>
      <el-form-item label="时间：">
        <el-date-picker
          v-model="form.date"
          type="datetime"
          placeholder="请选择日期时间，默认为当前时间"
          value-format="yyyy-MM-dd HH-mm-ss"
          style="width: 100%;">
        </el-date-picker>
      </el-form-item>
      <el-form-item class="edit-buttons">
        <el-button type="primary" @click="onSubmit">保存编辑</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor';
import axios from 'axios';
import moment from 'moment';

export default {
  name: 'EditArticle',
  components: {
    VueEditor
  },
  mounted() {
    this.loadArticle();
  },
  methods: {
    loadArticle() {
      if (this.$route.params.id) {
        axios.get(this.$store.state.API_HOST + `/articles/${this.$route.params.id}`)
          .then((res) => {
            this.form.title = res.data.result.title;
            this.form.author = res.data.result.author;
            this.form.content = res.data.result.content;
            this.form.introduction = res.data.result.introduction;
            this.form.date = res.data.result.date;
          })
          .catch(() => {
            this.$message.error('加载文章失败');
          });
      }
    },
    onSubmit() {
      this.$refs['edit-article-form'].validate((valid) => {
        if (valid) {
          let formData = {};
          formData.title = this.form.title;
          if (this.form.author) {
            formData.author = this.form.author;
          } else {
            formData.author = '佚名';
          }
          if (this.form.content) {
            formData.content = this.form.content;
          } else {
            formData.content = '';
          }
          if (this.form.introduction) {
            formData.introduction = this.form.introduction;
          } else {
            formData.introduction = formData.content;
            formData.introduction = formData.introduction.replace(/<\/div>/ig, '');
            formData.introduction = formData.introduction.replace(/<\/li>/ig, '');
            formData.introduction = formData.introduction.replace(/<li>/ig, '');
            formData.introduction = formData.introduction.replace(/<\/ul>/ig, '');
            //-- remove BR tags and replace them with line break
            formData.introduction = formData.introduction.replace(/<br\s*\/?>/gi, "");
            //-- remove P and A tags but preserve what's inside of them
            formData.introduction=formData.introduction.replace(/<p.*?>/gi, "");
            formData.introduction=formData.introduction.replace(/<a.*href="(.*?)".*>(.*?)<\/a>/gi, " $2 ($1)");
            //-- remove all inside SCRIPT and STYLE tags
            formData.introduction=formData.introduction.replace(/<script.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/script>/gi, "");
            formData.introduction=formData.introduction.replace(/<style.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/style>/gi, "");
            //-- remove all else
            formData.introduction=formData.introduction.replace(/<(?:.|\s)*?>/g, "");
            //-- get rid of more than 2 multiple line breaks:
            formData.introduction=formData.introduction.replace(/(?:(?:|\r|\n)\s*){2,}/gim, "");
            //-- get rid of more than 2 spaces:
            formData.introduction = formData.introduction.replace(/ +(?= )/g,'');
            //-- get rid of html-encoded characters:
            formData.introduction=formData.introduction.replace(/ /gi," ");
            formData.introduction=formData.introduction.replace(/&/gi,"&");
            formData.introduction=formData.introduction.replace(/"/gi,'"');
            formData.introduction=formData.introduction.replace(/</gi,'<');
            formData.introduction=formData.introduction.replace(/>/gi,'>');
            if (formData.introduction.length > 80) {
              formData.introduction = formData.introduction.substring(0, 80) + '...'
            }
          }
          if (this.form.date) {
            formData.date = this.form.date;
          } else {
            formData.date = moment().format("YYYY-MM-DD HH:mm:ss");
          }
          axios.put(this.$store.state.API_HOST + `/articles/${this.$route.params.id}`, formData)
            .then(()=> {
              this.$message.success('修改文章成功');
              setTimeout(() => {
                this.$router.push({
                  name: 'view-article',
                  params: {
                    id: this.$route.params.id
                  }
                })
              }, 1000);
            })
            .catch(() => {
              this.$message.error('修改文章失败');
            });
        } else {
          this.$message.error('表单错误，请检查填写要求');
        }
      })
    }
  },
  data: () => {
    return {
      form: {
        title: '',
        author: '',
        content: '',
        introduction: '',
        date: '',
      },
      rules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' }
        ]
      }
    }
  }
}
</script>

<style>
.vue-editor {
  background-color: #ffffff;
}
.edit-buttons {
  text-align: right;
}
</style>
