export default {
  state: {
    hop: null,
    hopList: []
  },
  getters: {
    HOP: (s => s.hop),
    HOP_LIST: (s => s.hopList)
  },
  mutations: {
    CLR_HOP: (s => s.hop = {
      title: '',
      country: '',
      manufacturer: '',
      alpha: '',
      fragrance: '',
      bitter: false,
      aroma: false
    }),
    SET_HOP: ((s, hop) => s.hop = hop),
    ADD_HOP_LIST: ((s, hop) => {
      s.hopList.push(hop)
    }),
    DEL_HOP_LIST: ((s, hop) => {
      const index = s.hopList.findIndex(m => m.id === hop.id)
      s.hopList.splice(index, 1)
    }),
    SET_HOP_LIST: ((s, list) => s.hopList = list),
    UPD_HOP_LIST: ((s, hop) => {
      const index = s.hopList.findIndex(m => m.id === hop.id)
      s.hopList.splice(index, 1, hop)
    }),
  },
  actions: {
    async getHopList({ commit, dispatch }) {
      const result = await dispatch('fetchMethod', {
        url: `/directory/hop`,
        method: 'get'
      })
      if (result.success) {
        commit('SET_HOP_LIST', result.data)
      }
    },
    async getHopById({ commit, dispatch }, hopId) {
       const result = await dispatch('fetchMethod', {
        url: `/directory/hop/${hopId}`,
        method: 'get'
      })
      if (result.success) {
        commit('SET_HOP', result.data)
      }
    },
    async postHop({ commit, dispatch }, hop) {
      const result = await dispatch('fetchMethod', {
        url: `/directory/hop`,
        method: 'post',
        obj: hop
      })
      if (result.success) {
        hop.id = result.data.id
        commit('ADD_HOP_LIST', hop)
      }
    },
    async putHopById({ commit, dispatch }, hop) {
      const result = await dispatch('fetchMethod', {
        url: `/directory/hop`,
        method: 'put',
        obj: hop
      })
      if (result.success) {
        commit('UPD_HOP_LIST', hop)
      }
    },
    async deleteHopById({ commit, dispatch }, hopId) {
      const result = await dispatch('fetchMethod', {
        url: `/directory/hop/${hopId}`,
        method: 'delete'
      })
      if (result.success) {
        commit('DEL_HOP_LIST', {id: hopId})
      }
    }
  },
}
