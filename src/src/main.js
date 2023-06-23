import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false

Vue.use(ElementUI);

new Vue({
  router,
  render: h => h(App),
  data: {//Bus总线
    //自定义的事件总线对象，用于父子组件的通信
    Bus: new Vue()
  }
}).$mount('#app')
