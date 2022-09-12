export default {
  state: {
    listHop0: [],   
    listHop1: [],  
    listMalt: [],  
    listOther: [], 
    listPause0: [],
    listPause1: [],
    listPrimer: [],
    listYeast: [], 
  },
  getters: {
    LIST_HOP0: s => s.listHop0,
    LIST_HOP1: s => s.listHop1,
    LIST_MALT: s => s.listMalt,
    LIST_OTHER: s => s.listOther,
    LIST_PAUSE0: s => s.listPause0,
    LIST_PAUSE1: s => s.listPause1,
    LIST_PRIMER: s => s.listPrimer,
    LIST_YEAST: s => s.listYeast,
  },
  mutations: {
    SET_LIST_HOP0: (s, list) => s.listHop0 = list,
    SET_LIST_HOP1: (s, list) => s.listHop1 = list,
    SET_LIST_MALT: (s, list) => s.listMalt = list,
    SET_LIST_OTHER: (s, list) => s.listOther = list,
    SET_LIST_PAUSE0: (s, list) => s.listPause0 = list,
    SET_LIST_PAUSE1: (s, list) => s.listPause1 = list,
    SET_LIST_PRIMER: (s, list) => s.listPrimer = list,
    SET_LIST_YEAST: (s, list) => s.listYeast = list,
  },
  actions: {
    async getListYeast({ commit, dispatch }) {
      const result = await dispatch('fetchMethod', {
        url: `/directory/list/yeast`,
        method: 'get'
      })
      if (result.success) {
        commit('SET_LIST_YEAST', result.data)
      }
    },
    async getListHop0({ commit, dispatch }) {
      const result = await dispatch('fetchMethod', {
        url: `/directory/list/hop0`,
        method: 'get'
      })
      if (result.success) {
        commit('SET_LIST_HOP0', result.data)
      }
    },
    async getListHop1({ commit, dispatch }) {
      const result = await dispatch('fetchMethod', {
        url: `/directory/list/hop1`,
        method: 'get'
      })
      if (result.success) {
        commit('SET_LIST_HOP1', result.data)
      }
    },
    async getListMalt({ commit, dispatch }) {
      const result = await dispatch('fetchMethod', {
        url: `/directory/list/malt`,
        method: 'get'
      })
      if (result.success) {
        commit('SET_LIST_MALT', result.data)
      }
    },
    async getListOther({ commit, dispatch }) {
      const result = await dispatch('fetchMethod', {
        url: `/directory/list/other`,
        method: 'get'
      })
      if (result.success) {
        commit('SET_LIST_OTHER', result.data)
      }
    },
    async getListPause0({ commit, dispatch }) {
      const result = await dispatch('fetchMethod', {
        url: `/directory/list/pause0`,
        method: 'get'
      })
      if (result.success) {
        commit('SET_LIST_PAUSE0', result.data)
      }
    },
    async getListPause1({ commit, dispatch }) {
      const result = await dispatch('fetchMethod', {
        url: `/directory/list/pause1`,
        method: 'get'
      })
      if (result.success) {
        commit('SET_LIST_PAUSE1', result.data)
      }
    },
    async getListPrimer({ commit, dispatch }) {
      const result = await dispatch('fetchMethod', {
        url: `/directory/list/primer`,
        method: 'get'
      })
      if (result.success) {
        commit('SET_LIST_PRIMER', result.data)
      }
    },
  },
}
