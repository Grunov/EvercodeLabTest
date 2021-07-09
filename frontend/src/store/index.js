import Vue from 'vue'
import Vuex from 'vuex'
import authModule from './modules/authModule'
import CurrencyModule from './modules/CurrencyModule'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth: authModule,
    currency: CurrencyModule
  }
})
