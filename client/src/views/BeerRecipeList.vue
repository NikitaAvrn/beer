<template>
  <div>
    <div class="row">
      <div class="col s12">
        <h4>Рецепты пива <small class="grey-text">Список</small></h4>
      </div>
    </div>
    <table-component
      :counter="true"
      :finder="true"
      :headers="headers"
      :rows-data="RECIPE_LIST"
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
          iconClass: 'left',
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
    tableBtnClick(e) {
      switch (e.button) {
        case 'add':
          this.$router.push('/beer-recipe')
          break
      }
    },
    rowBtnClick(e) {
      if (e.button === 'edit') {
        this.$router.push(`/beer-recipe/${e.data.id}`)
      }

      if (e.button === 'delete' && confirm('Вы действительно хотите удалить рецепт?')) {
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
