<template>
  <div class="row">
    <div class="col s12">
      <!-- <button class="btn-small waves-effect white black-text right" type="button" @click="addReview"><i class="left fa fa-plus"></i>Написить отзыв</button> -->
      <div class="fixed-action-btn">
        <a href="#!" @click="addReview" class="btn-floating btn-large"><i class="large fa fa-plus"></i></a>
      </div>
      <div class="row" v-show="REVIEW_LIST && REVIEW_LIST.length">
        <div class="col s12">
          <div class="card" v-for="review in REVIEW_LIST" :key="review.id">
            <div class="card-content">
              <span class="card-title">
                {{ review.name }}
                <small class="grey-text" v-show="review.date">{{ review.date | date }}</small>
                <small class="grey-text" v-show="!review.date">Новое сообщение</small>
              </span>
              <blockquote v-if="review.response" v-html="getReviewResponse(review.response)"></blockquote>
              <p>
                {{ review.message }}
              </p>
            </div>
            <div class="card-action center" v-show="true">
              <!--               
              <button type="button" class="btn-small btn-flat waves-effect white red-text">
                <i class="fa fa-thumbs-up"></i><span class="new badge red" data-badge-caption="likes">12</span>
              </button>
              <button type="button" class="btn-small btn-flat waves-effect white blue-text">
                <i class="fa fa-thumbs-down"></i><span class="new badge blue" data-badge-caption="dislikes">12</span>
              </button>
               -->
              <!-- 
              <button type="button" class="btn-small btn-flat waves-effect black-text" @click="editReview(review)">
                <i class="left fa fa-edit"></i>Редактировать
              </button>
              <button type="button" class="btn-small btn-flat waves-effect black-text"><i class="left fa fa-trash"></i>Удалить</button>
               -->
              <button type="button" class="btn-small btn-flat waves-effect black-text" @click="responseMessage(review.id)">
                <i class="left fa fa-reply-all"></i>Ответить
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="row" v-show="!REVIEW_LIST || !REVIEW_LIST.length">
        <div class="col s12">
          <p class="grey-text">Здесь пока нет отзывов, будь первым...</p>
        </div>
      </div>
    </div>
    <modal title="Написать отзыв" :checkValidate="true" :component="reviewModal" ref="modal" @result-modal="resultModal"></modal>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import Modal from '../Modal.vue'
import ReviewModal from './ReviewModal.vue'
import DateFilter from '@/filters/date.filter'

export default {
  components: { Modal, ReviewModal },
  computed: {
    ...mapGetters(['REVIEW', 'REVIEW_LIST', 'BATCH']),
  },
  data: () => ({
    reviewModal: ReviewModal,
    textarea: null,
  }),
  methods: {
    ...mapMutations(['CLR_REVIEW', 'SET_ERR_MESSAGE', 'SET_REVIEW']),
    ...mapActions(['getReviewList', 'postReview', 'getReviewById']),
    addReview() {
      this.CLR_REVIEW(this.BATCH.id)
      this.$refs.modal.open()
    },
    editReview(review) {
      this.SET_REVIEW(review)
      this.updateTextField()
    },
    getReviewResponse(idReview) {
      const review = this.REVIEW_LIST.find((r) => r.id === idReview)
      const date = DateFilter(review.date)
      return `<b>${review.name} <small>${date}</small></b><br><i>${review.message}<i/>`
    },
    responseMessage(idResponse) {
      this.CLR_REVIEW(this.BATCH.id)
      this.REVIEW.response = idResponse
      this.$refs.modal.open()
    },
    resultModal(e) {
      if (!e.result) {
        this.$refs.modal.close()
        return
      }
      if (!e.validate) {
        return
      }
      this.postReview(this.REVIEW)
      this.$refs.modal.close()
    },
    sendReview() {
      this.clearReview()
    },
    clearReview() {
      this.CLR_REVIEW(this.BATCH.id)
    },
  },
  mounted() {
    this.getReviewList(this.BATCH.id)
  },
}
</script>

<style scoped>
.fixed-action-btn {
  bottom: 56px;
}
</style>
