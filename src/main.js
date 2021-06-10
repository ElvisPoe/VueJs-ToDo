import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')


if (!navigator.serviceWorker.controller) {
  navigator.serviceWorker.register("../service-worker.js").then(function(reg) {
    console.log("Service worker has been registered for scope: " + reg.scope);
  });
}