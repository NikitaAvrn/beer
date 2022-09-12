import Vue from 'vue'
import App from './App.vue'
import VueMeta from 'vue-meta'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'materialize-css/dist/js/materialize.min'
import messagePlugin from '@/plugins/message.plugin'
import dateFilter from '@/filters/date.filter'

Vue.config.productionTip = false
Vue.filter('date', dateFilter)
Vue.use(messagePlugin)
Vue.use(VueMeta)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
