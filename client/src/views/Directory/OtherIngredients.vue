<template>
  <div>
    <div class="row">
      <div class="col s12">
        <h4>Другие ингредиенты <small class="grey-text">Справочник</small></h4>
      </div>
    </div>
    <table-component
      :headers="headers"
      :counter="true"
      :min-length-find="1"
      :finder="true"
      :rows-data="OTHER_INGREDIENT_LIST"
      :rows-on-page-list="[10, 25, 50, 75, 100]"
      :start-rows-on-page="50"
      :pages="true"
      :checkbox="false"
      :row-buttons="[
        {
          icon: 'edit',
          class: 'btn-small waves-effect white black-text z-depth-0',
          result: 'edit',
        },
        {
          icon: 'trash',
          class: 'btn-small waves-effect white black-text z-depth-0',
          result: 'delete',
        },
      ]"
      :table-buttons="[
        {
          title: 'Добавить',
          icon: 'plus',
          iconClass: 'left',
          result: 'add',
          class: 'btn-small waves-effect',
        },
      ]"
      @row-btn-click="rowBtnClick"
      @table-btn-click="tableBtnClick"
    />
    <modal
      title="Другие ингредиенты"
      :component="otherIngredientsForm"
      :check-validate="true"
      @result-modal="resultModal"
      ref="modal"
    ></modal>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import Modal from '../../components/Modal.vue'
import OtherIngredientsForm from '../../components/DirectoryForm/OtherIngredientsForm.vue'
import TableComponent from '../../components/TableComponent.vue'

export default {
  components: { OtherIngredientsForm, Modal, TableComponent },
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
    ...mapActions([
      'getOtherIngredientList',
      'getOtherIngredientById',
      'postOtherIngredient',
      'putOtherIngredientById',
      'deleteOtherIngredientById',
    ]),
    ...mapMutations(['CLR_OTHER_INGREDIENT']),
    tableBtnClick(e) {
      if (e.button == 'add') {
        this.CLR_OTHER_INGREDIENT()
        this.$refs.modal.open()
      }
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
    rowBtnClick(e) {
      if (e.button === 'delete' && confirm('Вы действительно хотите удалить элемент?')) {
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
