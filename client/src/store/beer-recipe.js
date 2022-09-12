export default {
  state: {
    recipe: null,
    recipeList: [],
    malt: null,
    hop: null,
    yeast: null,
    otherIngredient: null,
    pauseTemp: null
  },
  getters: {
    RECIPE: s => s.recipe,
    RECIPE_LIST: s => s.recipeList,
    RECIPE_MALT: s => s.malt,
    RECIPE_HOP: s => s.hop,
    RECIPE_YEAST: s => s.yeast,
    RECIPE_OTHER_INGREDIENT: s => s.otherIngredient,
    RECIPE_PAUSE_TEMP: s => s.pauseTemp
  },
  mutations: {
    CLR_RECIPE_MALT: s => s.malt = {
      malt: null,
      weight: '',
      color: '',
      extractivity: '',
      entry: ''
    },
    CLR_RECIPE_HOP: s => s.hop = {
      hop: null,
      weight: '',
      alpha: '',
      type: '',
      entry: '',
      time: ''
    },
    CLR_RECIPE_YEAST: s => s.yeast = {
      yeast: null,
      temperature: '',
      fermentation: '',
      attenuation: ''
    },
    CLR_RECIPE_OTHER_INGREDIENT: s => s.otherIngredient = {
      other: null,
      entry: '',
      weight: '',
      time: ''
    },
    CLR_RECIPE_PAUSE_TEMP: s => s.pauseTemp = {
      name: '',
      heat: '',
      temperature: '',
      time: ''
    },
    CLR_RECIPE: s => s.recipe = {
      title: '',
      efficiency: '75',
      boil: '90',
      hydromodule: '4',
      startExtractivity: '',
      finishExtractivity: '',
      abv: '',
      ibu: '',
      description: '',
      primer: '',
      temperature: '',
      co2: '',
      malt: [],
      hop: [],
      yeast: [],
      otherIngredient: [],
      pauseTemp: []
    },
    ADD_RECIPE_LIST: (s, recipe) => {
      s.recipeList.push(recipe)
    },
    ADD_RECIPE_MALT: (s, malt) => {
      s.recipe.malt.push(malt)
    },
    ADD_RECIPE_HOP: (s, hop) => {
      s.recipe.hop.push(hop)
    },
    ADD_RECIPE_YEAST: (s, yeast) => {
      s.recipe.yeast.push(yeast)
    },
    ADD_RECIPE_OTHER_INGREDIENT: (s, otherIngredient) => {
      s.recipe.otherIngredient.push(otherIngredient)
    },
    ADD_RECIPE_PAUSE_TEMP: (s, pauseTemp) => {
      s.recipe.pauseTemp.push(pauseTemp)
    },
    DEL_RECIPE_LIST: (s, recipe) => {
      const index = s.recipeList.findIndex(r => recipe.id === r.id)
      s.recipeList.splice(index, 1)
    },
    DEL_RECIPE_MALT: (s, index) => {
      s.recipe.malt.splice(index, 1)
    },
    DEL_RECIPE_HOP: (s, index) => {
      s.recipe.hop.splice(index, 1)
    },
    DEL_RECIPE_YEAST: (s, index) => {
      s.recipe.yeast.splice(index, 1)
    },
    DEL_RECIPE_OTHER_INGREDIENT: (s, index) => {
      s.recipe.otherIngredient.splice(index, 1)
    },
    DEL_RECIPE_PAUSE_TEMP: (s, index) => {
      s.recipe.pauseTemp.splice(index, 1)
    },
    SET_RECIPE: (s, recipe) => s.recipe = recipe,
    SET_RECIPE_LIST: (s, list) => s.recipeList = list,
    SET_RECIPE_MALT: (s, malt) => s.malt = malt,
    SET_RECIPE_HOP: (s, hop) => s.hop = hop,
    SET_RECIPE_YEAST: (s, yeast) => s.yeast = yeast,
    SET_RECIPE_OTHER_INGREDIENT: (s, otherIngredient) => s.otherIngredient = otherIngredient,
    SET_RECIPE_PAUSE_TEMP: (s, pauseTemp) => s.pauseTemp = pauseTemp,
    /* 
    SET_RECIPE_MALT: (s, list) => s.recipe.malt = list,
    SET_RECIPE_HOP: (s, list) => s.recipe.hop = list,
    SET_RECIPE_YEAST: (s, list) => s.recipe.yeast = list,
    SET_RECIPE_OTHER_INGREDIENT: (s, list) => s.recipe.otherIngredient = list,
    SET_RECIPE_PAUSE_TEMP: (s, list) => s.recipe.pauseTemp = list,
    */
    UPD_RECIPE_LIST: (s, recipe) => {
      const index = s.recipeList.findIndex(r => recipe.id === r.id)
      s.recipeList.splice(index, 1, recipe)
    },
    UPD_RECIPE_MALT: (s, malt) => {
      //const index = s.recipe.malt.findIndex(m => malt.id === m.id)
      s.recipe.malt.splice(malt.index, 1, malt)
    },
    UPD_RECIPE_HOP: (s, hop) => {
      //const index = s.recipe.hop.findIndex(h => hop.id === h.id)
      s.recipe.hop.splice(hop.index, 1, hop)
    },
    UPD_RECIPE_YEAST: (s, yeast) => {
      //const index = s.recipe.yeast.findIndex(y => yeast.id === y.id)
      s.recipe.yeast.splice(yeast.index, 1, yeast)
    },
    UPD_RECIPE_OTHER_INGREDIENT: (s, otherIngredient) => {
      //const index = s.recipe.otherIngredient.findIndex(o => otherIngredient.id === o.id)
      s.recipe.otherIngredient.splice(otherIngredient.index, 1, otherIngredient)
    },
    UPD_RECIPE_PAUSE_TEMP: (s, pauseTemp) => {
      //const index = s.recipe.pauseTemp.findIndex(p => pauseTemp.id === p.id)
      s.recipe.pauseTemp.splice(pauseTemp.index, 1, pauseTemp)
    },
  },
  actions: {
    async getBeerRecipeList({ commit, dispatch }) {
      const result = await dispatch('fetchMethod', {
        url: `/beer-recipe`,
        method: 'get'
      })
      if (result.success) {
        commit('SET_RECIPE_LIST', result.data)
      }
    },
    async getBeerRecipeById({ commit, dispatch }, recipeId) {
      const result = await dispatch('fetchMethod', {
        url: `/beer-recipe/${recipeId}`,
        method: 'get'
      })
      if (result.success) {
        commit('SET_RECIPE', result.data)
      }
    },
    async postBeerRecipe({ dispatch }, recipe) {
      const result = await dispatch('fetchMethod', {
        url: `/beer-recipe`,
        method: 'post',
        obj: recipe
      })
      if (result.success) {
        return result.data
      }
    },
    async putBeerRecipe({ dispatch }, recipe) {
      const result = await dispatch('fetchMethod', {
        url: `/beer-recipe`,
        method: 'put',
        obj: recipe
      })
      return result
    },
    async deleteBeerRecipeById({ commit, dispatch }, recipeId) {
      const result = await dispatch('fetchMethod', {
        url: `/beer-recipe/${recipeId}`,
        method: 'delete'
      })
      if (result.success) {
        commit('DEL_RECIPE_LIST', { id: recipeId })
      }
    },
  },
}
