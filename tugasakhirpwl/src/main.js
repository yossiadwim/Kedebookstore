import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import store from './store'
import { firestorePlugin } from 'vuefire'



Vue.use(firestorePlugin)

Vue.config.productionTip = false



new Vue({
  router,
  vuetify,
  store,

  render: h => h(App)
}).$mount('#app')
