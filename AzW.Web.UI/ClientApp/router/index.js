import Vue from 'vue'
import VueRouter from 'vue-router'
import { routes } from './routes'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from "axios";
window.axios = require('axios');

Vue.use(Vuetify)
Vue.use(VueRouter)

let router = new VueRouter({
  mode: 'history',
  routes
})

export default router
