import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import { routes } from './routes'
import VueTheMask from "vue-the-mask";
import money from "v-money";



import store from './store'
import { createProvider } from './vue-apollo'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueTheMask);
Vue.use(money, { precision: 4 });

const router = new VueRouter({
  routes,
  mode: 'history',
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
})

Vue.filter('currency', (value) => {
  return '$' + value.toLocaleString()
})

new Vue({
  vuetify,
  router,
  store,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount('#app')