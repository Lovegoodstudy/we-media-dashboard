<template>
  <div class="manage-article">
    <el-table
      class="manage-table"
      :data="articleList"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="文章ID"
        width="100">
      </el-table-column>
      <el-table-column
        label="标题"
        width="360">
        <template slot-scope="scope">
          <el-tooltip content="查看文章" placement="top">
            <span class="table-article-title" @click="clickTitle(scope.row.id)">{{scope.row.title}}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        prop="author"
        label="作者"
        width="160">
      </el-table-column>
      <el-table-column
        prop="date"
        label="时间"
        width="160">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <div class="icon-button">
            <el-tooltip content="编辑文章" placement="top">
              <span class="edit-icon-button" @click="clickEditButton(scope.row.id)"><i class="el-icon-edit-outline"></i></span>
            </el-tooltip>
            <el-tooltip content="删除文章" placement="top">
              <span class="delete-icon-button" @click="clickDeleteButton(scope.row.id)"><i class="el-icon-delete"></i></span>
            </el-tooltip>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'ManageArticle',
  mounted() {
    this.getArticleList();
  },
  methods: {
    getArticleList() {
      axios.get(this.$store.state.API_HOST + '/articles')
        .then((res) => {
          this.articleList = res.data.result;
        })
        .catch(() => {
          this.$message.error('获取文章列表失败');
        });
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
            for (let k in this.articleList) {
              if (this.articleList[k].id === id) {
                this.articleList.splice(k, 1);
                this.$message.success('删除文章成功');
                break;
              }
            }
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
    },
    clickTitle(id) {
      this.$router.push({
        name: 'view-article',
        params: {
          id: id
        }
      });
    }
  },
  data: () => {
    return {
      articleList: []
    }
  }
}
</script>

<style>
.manage-article .manage-table {
  text-align: left;
}
.manage-article .icon-button {
  font-size: 20px;
}
.manage-article .edit-icon-button{
  cursor: pointer;
}
.manage-article .delete-icon-button {
  cursor: pointer;
  margin-left: 16px;
}
.manage-article .edit-icon-button:hover, .manage-article .delete-icon-button:hover {
  color: #0aa89e;
}
.manage-article .table-article-title {
  cursor: pointer;
}
.manage-article .table-article-title:hover {
  color: #0aa89e;
}
</style>
