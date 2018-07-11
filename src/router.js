import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'

import DashBoard from './components/DashBoard.vue'
import AddArticle from './components/AddArticle.vue'
import ManageArticle from './components/ManageArticle.vue'
import EditArticle from './components/EditArticle.vue'
import ViewArticle from './components/ViewArticle.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '/',
          name: 'dashboard',
          component: DashBoard
        },
        {
          path: '/addArticle',
          name: 'add-article',
          component: AddArticle
        },
        {
          path: '/editArticle/:id',
          name: 'edit-article',
          component: EditArticle
        },
        {
          path: '/viewArticle/:id',
          name: 'view-article',
          component: ViewArticle
        },
        {
          path: '/manageArticle',
          name: 'manage-article',
          component: ManageArticle
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    }
  ]
})
