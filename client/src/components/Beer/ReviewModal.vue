<template>
  <div class="row">
    <form class="col s12" v-if="REVIEW" ref="form">
      <p class="grey-text" v-if="REVIEW.response">Ответ на: {{ getReviewResponse(REVIEW.response) }}</p>
      <div class="row">
        <div class="input-field col s12">
          <input id="name" type="text" class="validate" v-model="REVIEW.name" required />
          <label for="name">Имя</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input id="email" type="email" class="validate" v-model="REVIEW.email" required />
          <label for="email">E-mail</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <textarea
            id="message"
            class="materialize-textarea"
            :maxlength="maxLength"
            :data-length="maxLength"
            v-model="REVIEW.message"
            ref="message"
            required
          ></textarea>
          <label for="message">Сообщение</label>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import validate from '@/mixins/validate.mixin'

export default {
  computed: {
    ...mapGetters(['REVIEW', 'REVIEW_LIST']),
  },
  data: () => ({
    maxLength: 1024,
  }),
  mixins: [validate],
  methods: {
    getReviewResponse(idResponse) {
      const review = this.REVIEW_LIST.find((r) => r.id === idResponse)
      return `${review.message} от ${review.name}`
    },
    editReview(review) {
      this.SET_REVIEW(review)
      this.updateTextField()
    },
    sendReview() {
      if (!this.validateForm()) {
        this.SET_ERR_MESSAGE('Необходимо заполнить форму')
        return
      }
      this.postReview(this.REVIEW)
      this.clearReview()
    },
    clearReview() {
      this.CLR_REVIEW(this.BATCH.id)
    },
    updateTextField() {
      setTimeout(() => {
        M.updateTextFields()
      }, 0)
    },
  },
}
</script>

<style></style>
