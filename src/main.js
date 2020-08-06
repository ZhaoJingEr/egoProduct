import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './plugins/element.js'
import "./assets/css/common.css"
import "./router/permission.js"
import api from "./api"
import local from './utils/localUtils'
import "./utils/event-bus"
import i18n from "./plugins/i18n"

Vue.prototype.$api = api;
Vue.config.productionTip = false

if(local.getLocal("ego")){
  store.commit("loginModule/setUser",local.getLocal("ego"))
  // console.log(local.getLocal("ego"))
}
// i18n.locale ='zh'
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
