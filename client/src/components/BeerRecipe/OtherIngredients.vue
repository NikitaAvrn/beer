<template>
  <div>
    <div class="row">
      <div class="col s12">
        <table-find
          v-if="RECIPE && RECIPE.otherIngredient"
          :headers="headers"
          :data="otherIngredientList"
          @add-btn-click="addBtnClick"
          @table-btn-click="tableBtnClick"
        ></table-find>
      </div>
    </div>
    <modal title="Другие ингридиенты" :component="otherIngredientRecipeForm" :check-validate="true" @result-modal="resultModal" ref="modal"></modal>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Modal from '../Modal.vue'
import TableFind from '../TableFind.vue'
import OtherIngedientRecipeForm from './OtherIngedientRecipeForm.vue'

export default {
  components: { TableFind, Modal, OtherIngedientRecipeForm },
  computed: {
    ...mapGetters(['RECIPE', 'RECIPE_OTHER_INGREDIENT']),
    otherIngredientList() {
      if (!this.RECIPE) {
        return []
      }
      const sum = this.RECIPE.otherIngredient.reduce((total, m) => total + m.weight, 0)
      const percent = sum / 100
      return this.RECIPE.otherIngredient.map((m) => {
        m['percent'] = (Number.parseFloat(m.weight) / percent).toFixed(2)
        return m
      })
    },
  },
  data: () => ({
    otherIngredientRecipeForm: OtherIngedientRecipeForm,
    headers: [
      { title: 'Ингридиенты', name: 'otherTitle' },
      { title: 'Вес', name: 'weight', foot: 'sum' },
      { title: 'Внесение', name: 'entry' },
      { title: '%', name: 'percent', foot: 'sum' },
    ],
  }),
  methods: {
    ...mapMutations([
      'CLR_RECIPE_OTHER_INGREDIENT',
      'ADD_RECIPE_OTHER_INGREDIENT',
      'DEL_RECIPE_OTHER_INGREDIENT',
      'UPD_RECIPE_OTHER_INGREDIENT',
      'SET_RECIPE_OTHER_INGREDIENT',
    ]),
    addBtnClick() {
      this.CLR_RECIPE_OTHER_INGREDIENT()
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
      if (typeof this.RECIPE_OTHER_INGREDIENT['index'] != 'undefined') {
        this.UPD_RECIPE_OTHER_INGREDIENT(this.RECIPE_OTHER_INGREDIENT)
      } else {
        this.ADD_RECIPE_OTHER_INGREDIENT(this.RECIPE_OTHER_INGREDIENT)
      }
      this.$refs.modal.close()
    },
    tableBtnClick(e) {
      switch (e.button) {
        case 'edit':
          e.data['index'] = e.index
          this.SET_RECIPE_OTHER_INGREDIENT({
            ...e.data,
          })
          this.$refs.modal.open()
          break
        case 'delete':
          this.DEL_RECIPE_OTHER_INGREDIENT(e.index)
          break
      }
    },
  },
}
</script>

<style></style>
