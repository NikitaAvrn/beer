<template>
  <div>
    <div class="row">
      <div class="col s12">
        <h2>Другие ингредиенты <small>Справочник</small></h2>
      </div>
    </div>
    <table-find :headers="headers" :data="OTHER_INGREDIENT_LIST" @add-btn-click="addBtnClick" @table-btn-click="tableBtnClick"></table-find>
    <modal title="Другие ингредиенты" :component="otherIngredientsForm" :check-validate="true" @result-modal="resultModal" ref="modal"></modal>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import Modal from '../../components/Modal.vue'
import OtherIngredientsForm from '../../components/DirectoryForm/OtherIngredientsForm.vue'
import TableFind from '../../components/TableFind.vue'

export default {
  components: { OtherIngredientsForm, Modal, TableFind },
  computed: {
    ...mapGetters(['OTHER_INGREDIENT_LIST', 'OTHER_INGREDIENT']),
  },
  data: () => ({
    otherIngredientsForm: OtherIngredientsForm,
    headers: [
      { title: 'Название', name: 'title' },
      { title: 'Экстрактивность СВ, %', name: 'extractivity' },
      { title: 'Цветность, ЕВС', name: 'color' },
      { title: 'Производитель', name: 'manufacturer' },
      { title: 'Страна', name: 'country' },
    ],
  }),
  methods: {
    ...mapActions(['getOtherIngredientList', 'getOtherIngredientById', 'postOtherIngredient', 'putOtherIngredientById', 'deleteOtherIngredientById']),
    ...mapMutations(['CLR_OTHER_INGREDIENT']),
    addBtnClick() {
      this.CLR_OTHER_INGREDIENT()
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

      if (this.OTHER_INGREDIENT.id) {
        this.putOtherIngredientById(this.OTHER_INGREDIENT)
      } else {
        this.postOtherIngredient(this.OTHER_INGREDIENT)
      }

      this.$refs.modal.close()
    },
    tableBtnClick(e) {
      if (e.button === 'delete') {
        this.deleteOtherIngredientById(e.data.id)
      }
      if (e.button === 'edit') {
        this.getOtherIngredientById(e.data.id)
        this.$refs.modal.open()
      }
    },
  },
  mounted() {
    this.getOtherIngredientList()
  },
}
</script>

<style></style>
