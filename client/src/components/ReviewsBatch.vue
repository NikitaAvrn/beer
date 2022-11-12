<template>
  <div class="row">
    <div class="col s12">
      <table-find v-if="REVIEW_LIST" :headers="headers" :data="REVIEW_LIST" @add-btn-click="addBtnClick" @table-btn-click="tableBtnClick"></table-find>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TableFind from './TableFind.vue'

export default {
  components: { TableFind },
  computed: {
    ...mapGetters(['REVIEW_LIST', 'BATCH']),
  },
  data: () => ({
    headers: [
      { title: 'Пользователь', name: 'name' },
      { title: 'E-mail', name: 'email' },
      { title: 'Отзыв', name: 'message' },
    ],
  }),
  methods: {
    ...mapActions(['getReviewList', 'deleteReviewById']),
    addBtnClick() {
      alert('Добавлять отзывы можно только из под интерфейса пользователей.')
    },
    tableBtnClick(e) {
      switch (e.button) {
        case 'delete':
          this.deleteReviewById(e.data.id)
          break
        case 'edit':
          alert('Редактировать сообщения пользователей нельзя!')
          break
      }
    },
  },
  mounted() {
    //this.getReviewList(this.BATCH.id)
  },
}
</script>

<style></style>
