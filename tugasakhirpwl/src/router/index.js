import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MyLogin from '../components/MyLogin'
import MyRegister from '../components/MyRegister'
import MySearch from '../components/MySearch'
import MyCheckOut from '../components/MyCheckOut'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta:{
      requireAuth: true
    }
  },
  {
    path: '/login',
    name: 'MyLogin',
    component: MyLogin
  },
  {
    path: '/register',
    name: 'MyRegister',
    component: MyRegister
  },
  {
    path: '/search',
    name: 'MySearch',
    component: MySearch
  },
  {
    path: '/checkout',
    name: 'MycheckOut',
    component: MyCheckOut
    
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
