import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import hostMixin from './services/hostMixin'

Vue.config.productionTip = false

Vue.prototype.$host = hostMixin.host;

if(!localStorage.auth) localStorage.auth = 'none';

new Vue({
  router,
  store,
  vuetify,
  render: function (h) { return h(App) }
}).$mount('#app');

store.dispatch('getPhotos');
store.dispatch('getWindowSize');