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
    component: () => import('../views/MainPage.vue'),
  },
  {
    path: '/manMainPage',
    name: 'manMainPage',
    component: () => import('../views/manMainPage.vue'),
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/Signup',
    name: 'Signup',
    component: () => import('../views/Signup.vue'),
  },
  {
    path: '/Userpage',
    name: 'Userpage',
    component: () => import('../views/Userpage.vue'),
  },
  {
    path: '/PetList',
    name: 'PetList',
    component: () => import('../views/PetList.vue'),
  },
  {
    path: '/PetUpload',
    name: 'PetUpload',
    component: () => import('../views/PetUpload.vue'),
  },
  {
    path: '/MyApply',
    name: 'MyApply',
    component: () => import('../views/MyApply.vue'),
  },
  {
    path: '/OtherApply',
    name: 'OtherApply',
    component: () => import('../views/OtherApply.vue'),
  },
  {
    path: '/ChatPage',
    name: 'ChatPage',
    component: () => import('../views/ChatPage.vue'),
  },
  {
    path: '/Creatorganization',
    name: 'Creatorganization',
    component: () => import('../views/Createorganization.vue'),
  },
  {
    path: '/Organize',
    name: 'Organize',
    component: () => import('../views/Organize.vue'),
  },
  {
    path: '/UploadPost',
    name: 'UploadPost',
    component: () => import('../views/UploadPost.vue'),
  },
  {
    path: '/PostPage',
    name: 'PostPage',
    component: () => import('../views/PostPage.vue'),
  },
  {
    path: '/Project',
    name: 'Project',
    component: () => import('../views/ProjectPage.vue'),
  },
  {
    path: '/Finance',
    name: 'Finance',
    component: () => import('../views/FinancePage.vue'),
  },
  {
    path: '/manFinance',
    name: 'manFinance',
    component: () => import('../views/manFinance.vue'),
  },
  {
    path: '/MyPost',
    name: 'MyPost',
    component: () => import('../views/MyPost.vue'),
  },
  {
    path: '/OtherApplyPet',
    name: 'OtherApplyPet',
    component: () => import('../views/OtherApplyPet.vue'),
  },
  {
    path: '/qingjia',
    name: 'qingjia',
    component: () => import('../views/qingjia.vue'),
  },
  {
    path: '/qingjia2',
    name: 'qingjia2',
    component: () => import('../views/qingjia2.vue'),
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('../views/user.vue'),
  },
  {
    path: '/kaoqin',
    name: 'kaoqin',
    component: () => import('../views/kaoqin.vue'),
  }
]

const router = new VueRouter({
  routes
})

export default router
