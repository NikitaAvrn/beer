<template>
  <div>
    <div class="row">
      <div class="col s12">
        <h2>Рецепты пива <small>Список</small></h2>
      </div>
    </div>
    <table-find :headers="headers" :data="RECIPE_LIST" @add-btn-click="addBtnClick" @table-btn-click="tableBtnClick"></table-find>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TableFind from '../components/TableFind.vue'

export default {
  components: { TableFind },
  computed: {
    ...mapGetters(['RECIPE_LIST']),
  },
  data: () => ({
    headers: [
      { title: 'Название рецепта', name: 'title' },
      { title: 'Начальная плотность (%)', name: 'startExtractivity' },
      { title: 'Объем этилового спирта (%)', name: 'abv' },
      { title: 'Горечь (IBU)', name: 'ibu' },
      { title: 'Варки', name: 'brewingBeer' },
      { title: 'Отзывы', name: 'reviewCount' },
    ],
  }),
  methods: {
    ...mapActions(['getBeerRecipeList', 'deleteBeerRecipeById']),
    addBtnClick() {
      this.$router.push('/beer-recipe')
    },
    tableBtnClick(e) {
      if (e.button === 'edit') {
        this.$router.push(`/beer-recipe/${e.data.id}`)
      }

      if (e.button === 'delete') {
        this.deleteBeerRecipeById(e.data.id)
      }
    },
  },
  mounted() {
    this.getBeerRecipeList()
  },
}
</script>

<style></style>
