import Vue from 'vue'
import VueRouter from 'vue-router'
//import HomeView from '../views/HomeView.vue'
//import AboutView from '../views/AboutView.vue'
import Main from '@/components/Main.vue'
//import Checkout from '@/components/checkout.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'iHome',
    component: Main,
    props:true
  },
 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
