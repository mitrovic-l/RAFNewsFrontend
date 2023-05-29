import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/Login.vue'
import News from '../views/News.vue'
import SingleNews from '../views/SingleNews.vue'
import PopularNews from '../views/PopularNews.vue'
import NewsInCategory from '../views/NewsInCategory.vue'
import NewsWithTag from '../views/NewsWithTag.vue'
import AddNews from '../views/AddNews.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/news',
    name: 'News',
    component: News
  },
  {
    path: '/news/:id',
    name: 'Single News',
    component: SingleNews
  },
  {
    path: '/popularnews',
    name: 'PopularNews',
    component: PopularNews
  },
  {
    path: '/category/:id',
    name: 'Category',
    component: NewsInCategory
  },
  {
    path: '/news/withtag/:id',
    name: 'NewsWithTag',
    component: NewsWithTag
  },
  {
    path: '/addnews',
    name: 'AddNews',
    component: AddNews
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
