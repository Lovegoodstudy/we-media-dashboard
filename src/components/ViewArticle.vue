<template>
  <div class="view-article">
    <div class="article-title">
      {{this.article.title}}
    </div>
    <div class="tool-bar">
      <el-tooltip content="编辑文章" placement="top">
        <span class="edit-icon-button" @click="clickEditButton(article.id)"><i class="el-icon-edit-outline"></i></span>
      </el-tooltip>
      <el-tooltip content="删除文章" placement="top">
        <span class="delete-icon-button" @click="clickDeleteButton(article.id)"><i class="el-icon-delete"></i></span>
      </el-tooltip>
    </div>
    <div class="article-sub-title">
      作者：{{this.article.author}}&nbsp;&nbsp;&nbsp;&nbsp;发表于：{{this.article.date}}
    </div>
    <div class="article-content" v-html="article.content">
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ViewArticle',
  mounted() {
    this.loadArticleDetail();
  },
  methods: {
    loadArticleDetail() {
      axios.get(this.$store.state.API_HOST + `/articles/${this.$route.params.id}`)
        .then((res) => {
          this.article = res.data.result;
        })
        .catch(() => {
          this.$message.error('获取文章内容失败');
        })
    },
    clickEditButton(id) {
      this.$router.push({
        name: 'edit-article',
        params: {
          id: id
        }
      });
    },
    clickDeleteButton(id) {
      this.$confirm('操作将删除该文章，无法恢复，是否继续？', '删除文章', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.delete(this.$store.state.API_HOST + `/articles/${id}`)
          .then(() => {
            this.$message.success('删除文章成功');
            setTimeout(() => {
              this.$router.push({
                name: 'manage-article'
              });
            }, 1000);
          })
          .catch(() => {
            this.$message.error('删除文章失败');
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    }
  },
  data: () => {
    return {
      article: {
        title: '',
        author: '',
        content: '',
        introduction: '',
        date: ''
      }
    }
  }
}
</script>

<style>
.view-article {
  position: relative;
  padding: 16px;
  background-color: #ffffff;
  border-radius: 6px;
}
.view-article .article-title {
  font-size: 32px;
  font-weight: border;
  color: #0aa89e;
}
.view-article .article-sub-title {
  text-align: right;
  font-size: 12px;
  color: #999999;
}
.view-article .article-content {
  text-align: left;
}
.view-article .tool-bar {
  position: absolute;
  top: 12px;
  right: 16px;
  font-size: 20px;
}
.view-article .edit-icon-button{
  cursor: pointer;
}
.view-article .delete-icon-button {
  cursor: pointer;
  margin-left: 12px;
}
.view-article .edit-icon-button:hover, .view-article .delete-icon-button:hover {
  color: #0aa89e;
}
</style>
