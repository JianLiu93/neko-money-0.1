import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Nav from '@/components/Nav.vue'
import Wrapper from '@/components/Wrapper.vue'
import Icon from '@/components/Icon.vue'
import AddButton from '@/components/AddButton.vue'
import { tagsModel } from '@/models/tagsModel'
import { recordModel } from '@/models/recordModel'

Vue.config.productionTip = false

Vue.component('Nav', Nav)
Vue.component('Wrapper', Wrapper)
Vue.component('Icon', Icon)
Vue.component('AddButton', AddButton)

window.tagData = tagsModel.fetch();
window.recordData = recordModel.fetch();

new Vue({
  router: router,
  store,
  render: h => h(App)
}).$mount('#app')
