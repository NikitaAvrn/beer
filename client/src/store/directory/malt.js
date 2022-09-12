export default {
  state: {
    malt: null,
    maltList: []
  },
  getters: {
    MALT: (s => s.malt),
    MALT_LIST: (s => s.maltList)
  },
  mutations: {
    CLR_MALT: (s => s.malt = {
      title: '',
      country: '',
      manufacturer: '',
      protein: '',
      kolbach: '',
      extractivity: '',
      differenceExtract: '',
      diastaticStrength: '',
      viscosity: '',
      colorBoiling: '',
      color: '',
      humidity: '',
    }),
    SET_MALT: ((s, malt) => s.malt = malt),
    ADD_MALT_LIST: ((s, malt) => {
      s.maltList.push(malt)
    }),
    DEL_MALT_LIST: ((s, malt) => {
      const index = s.maltList.findIndex(m => m.id === malt.id)
      s.maltList.splice(index, 1)
    }),
    SET_MALT_LIST: ((s, list) => s.maltList = list),
    UPD_MALT_LIST: ((s, malt) => {
      const index = s.maltList.findIndex(m => m.id === malt.id)
      s.maltList.splice(index, 1, malt)
    }),
  },
  actions: {
    async getMaltList({ commit, dispatch }) {
      const result = await dispatch('fetchMethod', {
        url: `/directory/malt`,
        method: 'get'
      })
      if (result.success) {
        commit('SET_MALT_LIST', result.data)
      }
    },
    async getMaltById({ commit, dispatch }, maltId) {
       const result = await dispatch('fetchMethod', {
        url: `/directory/malt/${maltId}`,
        method: 'get'
      })
      if (result.success) {
        commit('SET_MALT', result.data)
      }
    },
    async postMalt({ commit, dispatch }, malt) {
      const result = await dispatch('fetchMethod', {
        url: `/directory/malt`,
        method: 'post',
        obj: malt
      })
      if (result.success) {
        malt.id = result.data.id
        commit('ADD_MALT_LIST', malt)
      }
    },
    async putMaltById({ commit, dispatch }, malt) {
      const result = await dispatch('fetchMethod', {
        url: `/directory/malt`,
        method: 'put',
        obj: malt
      })
      if (result.success) {
        commit('UPD_MALT_LIST', malt)
      }
    },
    async deleteMaltById({ commit, dispatch }, maltId) {
      const result = await dispatch('fetchMethod', {
        url: `/directory/malt/${maltId}`,
        method: 'delete'
      })
      if (result.success) {
        commit('DEL_MALT_LIST', {id: maltId})
      }
    }
  },
}
