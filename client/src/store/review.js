export default {
  state: {
    review: null,
    reviewList: []
  },
  getters: {
    REVIEW: (s => s.review),
    REVIEW_LIST: (s => s.reviewList)
  },
  mutations: {
    CLR_REVIEW: ((s, batch) => s.review = {
      batch,
      user: 0,
      response: 0,
      name: '',
      email: '',
      message: '',
    }),
    SET_REVIEW: ((s, review) => s.review = review),
    ADD_REVIEW_LIST: ((s, review) => {
      s.reviewList.push(review)
    }),
    DEL_REVIEW_LIST: ((s, review) => {
      const index = s.reviewList.findIndex(m => m.id === review.id)
      s.reviewList.splice(index, 1)
    }),
    SET_REVIEW_LIST: ((s, list) => s.reviewList = list),
    UPD_REVIEW_LIST: ((s, review) => {
      const index = s.reviewList.findIndex(m => m.id === review.id)
      s.reviewList.splice(index, 1, review)
    }),
  },
  actions: {
    async getReviewList({ commit, dispatch }, batchId) {
      const result = await dispatch('fetchMethod', {
        url: `/review/${batchId}`,
        method: 'get'
      })
      if (result.success) {
        commit('SET_REVIEW_LIST', result.data)
      }
    },
    async getReviewById({ commit, dispatch }, reviewId) {
       const result = await dispatch('fetchMethod', {
        url: `/review/${reviewId}`,
        method: 'get'
      })
      if (result.success) {
        commit('SET_REVIEW', result.data)
      }
    },
    async postReview({ commit, dispatch }, review) {
      const result = await dispatch('fetchMethod', {
        url: `/review`,
        method: 'post',
        obj: review
      })
      if (result.success) {
        review.id = result.data.id
        commit('ADD_REVIEW_LIST', review)
      }
    },
    async putReview({ commit, dispatch }, review) {
      const result = await dispatch('fetchMethod', {
        url: `/review`,
        method: 'put',
        obj: review
      })
      if (result.success) {
        commit('UPD_REVIEW_LIST', review)
      }
    },
    async deleteReviewById({ commit, dispatch }, reviewId) {
      const result = await dispatch('fetchMethod', {
        url: `/review/${reviewId}`,
        method: 'delete'
      })
      if (result.success) {
        commit('DEL_REVIEW_LIST', {id: reviewId})
      }
    }
  },
}
