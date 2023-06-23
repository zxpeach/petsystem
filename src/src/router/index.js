import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/MainPage',
    name: 'MainPage',
    component:()=>import('../views/MainPage.vue'),
  },
  {
    path: '/Login',
    name: 'Login',
    component:()=>import('../views/Login.vue'),
  },
  {
    path: '/Signup',
    name: 'Signup',
    component:()=>import('../views/Signup.vue'),
  },
  {
    path: '/Userpage',
    name: 'Userpage',
    component:()=>import('../views/Userpage.vue'),
  },
]

const router = new VueRouter({
  routes
})

export default router
