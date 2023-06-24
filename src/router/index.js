import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
}
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
  {
    path: '/PetList',
    name: 'PetList',
    component:()=>import('../views/PetList.vue'),
  },
  {
    path: '/PetUpload',
    name: 'PetUpload',
    component:()=>import('../views/PetUpload.vue'),
  },
  {
    path: '/MyApply',
    name: 'MyApply',
    component:()=>import('../views/MyApply.vue'),
  },
  {
    path: '/OtherApply',
    name: 'OtherApply',
    component:()=>import('../views/OtherApply.vue'),
  },
]

const router = new VueRouter({
  routes
})

export default router
