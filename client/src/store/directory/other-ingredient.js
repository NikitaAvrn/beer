export default {
  state: {
    otherIngredient: null,
    otherIngredientList: []
  },
  getters: {
    OTHER_INGREDIENT: (s => s.otherIngredient),
    OTHER_INGREDIENT_LIST: (s => s.otherIngredientList)
  },
  mutations: {
    CLR_OTHER_INGREDIENT: (s => s.otherIngredient = {
      title: '',
      country: '',
      manufacturer: '',
      extractivity: '',
      color: ''
    }),
    SET_OTHER_INGREDIENT: ((s, otherIngredient) => s.otherIngredient = otherIngredient),
    ADD_OTHER_INGREDIENT_LIST: ((s, otherIngredient) => {
      s.otherIngredientList.push(otherIngredient)
    }),
    DEL_OTHER_INGREDIENT_LIST: ((s, otherIngredient) => {
      const index = s.otherIngredientList.findIndex(m => m.id === otherIngredient.id)
      s.otherIngredientList.splice(index, 1)
    }),
    SET_OTHER_INGREDIENT_LIST: ((s, list) => s.otherIngredientList = list),
    UPD_OTHER_INGREDIENT_LIST: ((s, otherIngredient) => {
      const index = s.otherIngredientList.findIndex(m => m.id === otherIngredient.id)
      s.otherIngredientList.splice(index, 1, otherIngredient)
    }),
  },
  actions: {
    async getOtherIngredientList({ commit, dispatch }) {
      const result = await dispatch('fetchMethod', {
        url: `/directory/other-ingredient`,
        method: 'get'
      })
      if (result.success) {
        commit('SET_OTHER_INGREDIENT_LIST', result.data)
      }
    },
    async getOtherIngredientById({ commit, dispatch }, otherIngredientId) {
       const result = await dispatch('fetchMethod', {
        url: `/directory/other-ingredient/${otherIngredientId}`,
        method: 'get'
      })
      if (result.success) {
        commit('SET_OTHER_INGREDIENT', result.data)
      }
    },
    async postOtherIngredient({ commit, dispatch }, otherIngredient) {
      const result = await dispatch('fetchMethod', {
        url: `/directory/other-ingredient`,
        method: 'post',
        obj: otherIngredient
      })
      if (result.success) {
        otherIngredient.id = result.data.id
        commit('ADD_OTHER_INGREDIENT_LIST', otherIngredient)
      }
    },
    async putOtherIngredientById({ commit, dispatch }, otherIngredient) {
      const result = await dispatch('fetchMethod', {
        url: `/directory/other-ingredient`,
        method: 'put',
        obj: otherIngredient
      })
      if (result.success) {
        commit('UPD_OTHER_INGREDIENT_LIST', otherIngredient)
      }
    },
    async deleteOtherIngredientById({ commit, dispatch }, otherIngredientId) {
      const result = await dispatch('fetchMethod', {
        url: `/directory/other-ingredient/${otherIngredientId}`,
        method: 'delete'
      })
      if (result.success) {
        commit('DEL_OTHER_INGREDIENT_LIST', {id: otherIngredientId})
      }
    }
  },
}
