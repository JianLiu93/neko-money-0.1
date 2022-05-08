import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Nav from '@/components/Nav.vue'
import Wrapper from '@/components/Wrapper.vue'
import Icon from '@/components/Icon.vue'

Vue.config.productionTip = false

Vue.component('Nav', Nav)
Vue.component('Wrapper', Wrapper)
Vue.component('Icon', Icon)

new Vue({
  router: router,
  store,
  render: h => h(App)
}).$mount('#app')
