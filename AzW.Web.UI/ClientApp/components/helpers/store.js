import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
      provisionContext: null
    },
    mutations: {
      updateProvisionContext(state, provisionContext) {
        state.provisionContext = provisionContext
      }
    },
    getters: {
        provisionContext: state => state.provisionContext
    }
  })