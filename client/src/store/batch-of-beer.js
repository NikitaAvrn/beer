export default {
  state: {
    batch: null,
    batchList: []
  },
  getters: {
    BATCH: (s => s.batch),
    BATCH_LIST: (s => s.batchList)
  },
  mutations: {
    CLR_BATCH: (s => s.batch = {
      recipe: '',
      dateStart: '',
      dateFermentation: '',
      dateCorbonization: '',
      dateBottling: '',
      dateReady: '',
      dateFinish: '',
      primer: '',
      waterStart: '',
      waterWash: '',
      volume: '',
      comment: '',
      clarification: ''
    }),
    SET_BATCH: ((s, batch) => s.batch = batch),
    ADD_BATCH_LIST: ((s, batch) => {
      s.batchList.push(batch)
    }),
    DEL_BATCH_LIST: ((s, batch) => {
      const index = s.batchList.findIndex(m => m.id === batch.id)
      s.batchList.splice(index, 1)
    }),
    SET_BATCH_LIST: ((s, list) => s.batchList = list),
    UPD_BATCH_LIST: ((s, batch) => {
      const index = s.batchList.findIndex(m => m.id === batch.id)
      s.batchList.splice(index, 1, batch)
    }),
  },
  actions: {
    async getBatchOfBeerList({ commit, dispatch }) {
      const result = await dispatch('fetchMethod', {
        url: `/batch-of-beer`,
        method: 'get'
      })
      if (result.success) {
        commit('SET_BATCH_LIST', result.data)
      }
    },
    async getBatchOfBeerByCode({ commit, dispatch }, code) {
       const result = await dispatch('fetchMethod', {
        url: `/batch-of-beer/link/${code}`,
        method: 'get'
      })
      
      if (result.success) {
        commit('SET_BATCH', result.data)
      }
    },
    async getBatchOfBeerById({ commit, dispatch }, batchId) {
       const result = await dispatch('fetchMethod', {
        url: `/batch-of-beer/${batchId}`,
        method: 'get'
      })
      if (result.success) {
        commit('SET_BATCH', result.data)
      }
    },
    async postBatchOfBeer({ commit, dispatch }, batch) {
      const result = await dispatch('fetchMethod', {
        url: `/batch-of-beer`,
        method: 'post',
        obj: batch
      })
      if (result.success) {
        batch.id = result.data.id
        commit('ADD_BATCH_LIST', batch)
      }
    },
    async putBatchOfBeer({ commit, dispatch }, batch) {
      const result = await dispatch('fetchMethod', {
        url: `/batch-of-beer`,
        method: 'put',
        obj: batch
      })
      if (result.success) {
        commit('UPD_BATCH_LIST', batch)
      }
    },
    async deleteBatchOfBeerById({ commit, dispatch }, batchId) {
      const result = await dispatch('fetchMethod', {
        url: `/batch-of-beer/${batchId}`,
        method: 'delete'
      })
      if (result.success) {
        commit('DEL_BATCH_LIST', {id: batchId})
      }
    }
  },
}
