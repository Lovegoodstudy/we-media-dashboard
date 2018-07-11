<template>
  <div class="dashboard">
    <transition name="el-zoom-in-top">
      <el-card v-show="visitShow" class="card visit-card">
        过去的访问总数：<span class="number">{{data.allVisits}}</span>
        <br/>
        昨天访问数：<span class="number">{{data.lastDayVisits}}</span>
        <br/>
        今天访问数：<span class="number">{{data.todayVisits}}</span>
        <br/>
      </el-card>
    </transition>
    <transition name="el-zoom-in-top">
      <el-card v-show="articleShow" class="card article-card">
        文章总数：<span class="number">{{data.totalArticles}}</span>
        <br/>
        最近文章：
        <ul>
          <li v-for="item in data.recentArticles" :key="item">{{item}}</li>
        </ul>
      </el-card>
    </transition>
    <transition name="el-zoom-in-top">
      <el-card v-show="commentDataShow" class="card comment-card">
        过去的评论总数：<span class="number">{{data.totalComments}}</span>
        <br/>
        昨天访问数：<span class="number">{{data.lastDayComments}}</span>
        <br/>
        今天访问数：<span class="number">{{data.todayComments}}</span>
        <br/>
      </el-card>
    </transition>
    <transition name="el-zoom-in-top">
      <el-card v-show="commentShow" class="card latest-comment-card">
        最近评论：
        <ul>
          <li v-for="item in data.recentComments" :key="item">{{item.articleTitle}}：{{item.comment}}</li>
        </ul>
      </el-card>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'DashBoard',
  mounted() {
    setTimeout(() => {
      this.visitShow = true;
    }, 300);
    setTimeout(() => {
      this.articleShow = true;
    }, 600);
    setTimeout(() => {
      this.commentDataShow = true;
    }, 900);
    setTimeout(() => {
      this.commentShow = true;
    }, 1200);
  },
  data: () => {
    return {
      data: {
        allVisits: 1342,
        lastDayVisits: 88,
        todayVisits: 46,
        totalArticles: 10,
        recentArticles: ['这是一个新闻', '这是第二个新闻'],
        totalComments: 101,
        lastDayComments: 11,
        todayComments: 6,
        recentComments: [{
          articleTitle: '这是一个新闻',
          comment: '评论这是一个新闻的评论'
        }]
      },
      visitShow: false,
      articleShow: false,
      commentDataShow: false,
      commentShow: false
    }
  }
}
</script>

<style>
.dashboard {
  text-align: left;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.dashboard .card {
  margin-top: 16px;
  width: 45%;
  display: inline-block;
}
.dashboard .number {
  color: #0aa89e;
}
</style>