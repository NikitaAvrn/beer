export default {
  state: {
    auth: JSON.parse(localStorage.getItem('auth')) || null
  },
  getters: {
    AUTH: s => s.auth,
  },
  mutations: {
    CLR_AUTH: s => {
      s.auth = null
      localStorage.removeItem('auth')
    },
    SET_AUTH: (s, auth) => {
      s.auth = auth
      localStorage.setItem('auth', JSON.stringify(auth))
    }
  },
  actions: {
    async login({ dispatch, commit }, auth) {
      const response = await dispatch('fetchMethod', {
        url: `/auth/login`,
        method: 'post',
        obj: auth
      })
      if (response.success) {
        commit('SET_AUTH', response.data)
      }
    },
    async checkAutorization({ dispatch, getters }) {
      let userId
      if (getters.AUTH && getters.AUTH.id) {
        userId = getters.AUTH.id
      } else {
        return false
      }

      const response = await dispatch('fetchMethod', {
        url: `/auth/check-autorization/${userId}`,
        method: 'get',
      })
      return response.success
    }
  }
}