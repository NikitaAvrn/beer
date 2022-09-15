import Vue from 'vue'
import Vuex from 'vuex'

import config from '../../../config/default.json'
//import config from '../../../config/production.json'

import list from './directory/list'
import malt from './directory/malt'
import hop from './directory/hop'
import yeast from './directory/yeast'
import otherIngredient from './directory/other-ingredient'

import beerRecipe from './beer-recipe'
import batchOfBeer from './batch-of-beer'
import review from './review'
import auth from './auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    errMessage: '',
    message: '',
    scsMessage: ''
  },
  getters: {
    MESSAGE: (s) => s.message,
    ERR_MESSAGE: (s) => s.errMessage,
    SCS_MESSAGE: (s) => s.scsMessage,
  },
  mutations: {
    SET_MESSAGE: ((s, m) => s.message = m),
    SET_ERR_MESSAGE: ((s, m) => s.errMessage = m),
    SET_SCS_MESSAGE: ((s, m) => s.scsMessage = m),
    CLR_MESSAGES: (s => {
      s.message = '',
      s.errMessage = '',
      s.scsMessage = ''
    })
  },
  actions: {
    async fetchMethod(context, {url, method, obj = null}) {
      try {
        let autorization = {} 
        if (context.getters.AUTH && context.getters.AUTH.token) {
          autorization = {
            Autorization: `Bearer ${context.getters.AUTH.token}`
          }
        }
        let requestInit = {
          method,
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            ...autorization
          },
        }
        if ((obj != null) && (method.toLowerCase() !== 'get')) {
          requestInit.body = JSON.stringify(obj)
        }
        const response = await fetch(config.apiUrl + url, requestInit)
          .then(async (res) => {
            let data = {
              ...await res.json(),
              status: res.status,
            }
            return data
          })
        if (response.message) {
          if (response.success) {
            context.commit('SET_SCS_MESSAGE', response.message)
          }
          if (!response.success) {
            context.commit('SET_ERR_MESSAGE', response.message)
            if (response.status === 401) {
              window.location.replace('/login')
            }
          }
        }
        return response
      } catch (err) {
        const msg = `Ошибка отправки запроса fetch &mdash; url: ${url}; method: ${method}`
        console.error(msg, err)
        context.commit('SET_ERR_MESSAGE', msg)
        throw(err)
      }
    }
  },
  modules: {
    list,
    malt,
    hop,
    yeast,
    otherIngredient,
    beerRecipe,
    batchOfBeer,
    review,
    auth
  }
})