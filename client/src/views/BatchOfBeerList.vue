<template>
  <div>
    <div class="row">
      <div class="col s12">
        <h2>Партии пива <small>Список</small></h2>
      </div>
    </div>
    <table-find :headers="headers" :data="batchList" @add-btn-click="addBtnClick" @table-btn-click="tableBtnClick"></table-find>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TableFind from '../components/TableFind.vue'

export default {
  components: { TableFind },
  computed: {
    ...mapGetters(['BATCH_LIST']),
    batchList() {
      if (!this.BATCH_LIST) {
        return []
      }

      return this.BATCH_LIST.map((b) => {
        b.dateStartTitle = Intl.DateTimeFormat('ru-RU').format(new Date(b.dateStart))
        b.dateBottlingTitle = Intl.DateTimeFormat('ru-RU').format(new Date(b.dateBottling))
        b.dateReadyTitle = Intl.DateTimeFormat('ru-RU').format(new Date(b.dateReady))
        b.commentTitle = b.comment.length > 50 ? b.comment.substring(0, 50) + '...' : b.comment
        return b
      })
    },
  },
  data: () => ({
    headers: [
      { title: 'Рецепт', name: 'titleRecipe' },
      { title: 'Варка', name: 'dateStartTitle' },
      { title: 'Розлив', name: 'dateBottlingTitle' },
      { title: 'Готовность', name: 'dateReadyTitle' },
      { title: 'Объем (л.)', name: 'volume' },
      { title: 'Отзывы', name: 'commentTitle' },
      { title: 'Ссылка', name: 'link' },
    ],
  }),
  methods: {
    ...mapActions(['getBatchOfBeerList', 'deleteBatchOfBeerById']),
    addBtnClick() {
      this.$router.push('/batch-of-beer')
    },
    tableBtnClick(e) {
      if (e.button === 'edit') {
        this.$router.push(`/batch-of-beer/${e.data.id}`)
      }

      if (e.button === 'delete') {
        this.deleteBatchOfBeerById(e.data.id)
      }
    },
  },
  mounted() {
    this.getBatchOfBeerList()
  },
}
</script>

<style></style>
