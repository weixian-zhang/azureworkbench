import Vue from 'vue'
import axios from 'axios'
import router from './router/index'
import { store } from 'components/helpers/store'
import { sync } from 'vuex-router-sync'
import App from 'components/app-root'

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


Vue.prototype.$http = axios

sync(store, router)

const app = new Vue({
  store,
  router,
  ...App
})

export {
  app,
  router,
  store
}
