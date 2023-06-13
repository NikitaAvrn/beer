<template>
  <div>
    <div class="row">
      <div class="col s12">
        <h2>Партии пива <small>Список</small></h2>
      </div>
    </div>
    <!-- <table-find :headers="headers" :data="batchList" @add-btn-click="addBtnClick" @table-btn-click="tableBtnClick"></table-find> -->
    <table-component
      :counter="true"
      :finder="true"
      :headers="headers"
      :rows-data="batchList"
      :min-length-find="1"
      :pages="true"
      :rows-on-page-list="[10, 25, 50, 75, 100]"
      :start-rows-on-page="50"
      :row-buttons="[
        {
          result: 'edit',
          icon: 'edit',
          class: 'btn-small waves-effect white black-text z-depth-0',
        },
        {
          result: 'delete',
          icon: 'trash',
          class: 'btn-small waves-effect white black-text z-depth-0',
        },
      ]"
      :table-buttons="[
        {
          title: 'Добавить',
          icon: 'plus',
          class: 'btn-small waves-effect',
          result: 'add',
        },
      ]"
      @table-btn-click="tableBtnClick"
      @row-btn-click="rowBtnClick"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TableComponent from '../components/TableComponent.vue'

export default {
  components: { TableComponent },
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
        b.linkUser = `<a href="/b/${b.link}" target="_blank">${b.link}</a>`
        return b
      })
    },
  },
  data: () => ({
    headers: [
      { title: 'Рецепт', name: 'titleRecipe' },
      { title: 'Варка', name: 'dateStartTitle', sort: 'dateStart', type: 'date' },
      { title: 'Розлив', name: 'dateBottlingTitle', sort: 'dateBottling', type: 'date' },
      { title: 'Готовность', name: 'dateReadyTitle', sort: 'dateReady', type: 'date' },
      { title: 'Объем (л.)', name: 'volume', type: 'number' },
      { title: 'Ссылка', name: 'linkUser', out: 'html' },
    ],
  }),
  methods: {
    ...mapActions(['getBatchOfBeerList', 'deleteBatchOfBeerById']),
    tableBtnClick(e) {
      switch (e.button) {
        case 'add':
          this.$router.push('/batch-of-beer')
          break
      }
    },
    rowBtnClick(e) {
      if (e.button === 'edit') {
        this.$router.push(`/batch-of-beer/${e.data.id}`)
      }

      if (e.button === 'delete' && confirm('Вы действительно хотите удалить рецепт?')) {
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
