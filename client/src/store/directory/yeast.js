export default {
  state: {
    yeast: null,
    yeastList: []
  },
  getters: {
    YEAST: (s => s.yeast),
    YEAST_LIST: (s => s.yeastList)
  },
  mutations: {
    CLR_YEAST: (s => s.yeast = {
      title: '',
      country: '',
      manufacturer: '',
      abbreviation: '',
      typeFermentation: '',
      use: '',
      fermentationTemp: '',
      optimalFermentationTemp: '',
      flocculation: '',
      alcoholResistance: ''
    }),
    SET_YEAST: ((s, yeast) => s.yeast = yeast),
    ADD_YEAST_LIST: ((s, yeast) => {
      s.yeastList.push(yeast)
    }),
    DEL_YEAST_LIST: ((s, yeast) => {
      const index = s.yeastList.findIndex(m => m.id === yeast.id)
      s.yeastList.splice(index, 1)
    }),
    SET_YEAST_LIST: ((s, list) => s.yeastList = list),
    UPD_YEAST_LIST: ((s, yeast) => {
      const index = s.yeastList.findIndex(m => m.id === yeast.id)
      s.yeastList.splice(index, 1, yeast)
    }),
  },
  actions: {
    async getYeastList({ commit, dispatch }) {
      const result = await dispatch('fetchMethod', {
        url: `/directory/yeast`,
        method: 'get'
      })
      if (result.success) {
        commit('SET_YEAST_LIST', result.data)
      }
    },
    async getYeastById({ commit, dispatch }, yeastId) {
       const result = await dispatch('fetchMethod', {
        url: `/directory/yeast/${yeastId}`,
        method: 'get'
      })
      if (result.success) {
        commit('SET_YEAST', result.data)
      }
    },
    async postYeast({ commit, dispatch }, yeast) {
      const result = await dispatch('fetchMethod', {
        url: `/directory/yeast`,
        method: 'post',
        obj: yeast
      })
      if (result.success) {
        yeast.id = result.data.id
        commit('ADD_YEAST_LIST', yeast)
      }
    },
    async putYeastById({ commit, dispatch }, yeast) {
      const result = await dispatch('fetchMethod', {
        url: `/directory/yeast`,
        method: 'put',
        obj: yeast
      })
      if (result.success) {
        commit('UPD_YEAST_LIST', yeast)
      }
    },
    async deleteYeastById({ commit, dispatch }, yeastId) {
      const result = await dispatch('fetchMethod', {
        url: `/directory/yeast/${yeastId}`,
        method: 'delete'
      })
      if (result.success) {
        commit('DEL_YEAST_LIST', {id: yeastId})
      }
    }
  },
}
