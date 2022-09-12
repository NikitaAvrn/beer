<template>
  <div>
    <div class="row">
      <div class="col s12">
        <table-find v-if="RECIPE && RECIPE.malt" :headers="headers" :data="maltList" @add-btn-click="addBtnClick" @table-btn-click="tableBtnClick"></table-find>
      </div>
    </div>
    <modal title="Солод" :component="maltRecipeForm" :check-validate="true" @result-modal="resultModal" ref="modal"></modal>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Modal from '../Modal.vue'
import TableFind from '../TableFind.vue'
import MaltRecipeForm from './MaltRecipeForm.vue'

export default {
  components: { TableFind, Modal, MaltRecipeForm },
  computed: {
    ...mapGetters(['RECIPE', 'RECIPE_MALT']),
    maltList() {
      if (!this.RECIPE) {
        return []
      }
      const sum = this.RECIPE.malt.reduce((total, m) => total + m.weight, 0)
      const percent = sum / 100
      return this.RECIPE.malt.map((m) => {
        m['percent'] = (Number.parseFloat(m.weight) / percent).toFixed(2)
        return m
      })
    },
  },
  data: () => ({
    maltRecipeForm: MaltRecipeForm,
    headers: [
      { title: 'Солод', name: 'maltTitle' },
      { title: 'Вес', name: 'weight', foot: 'sum' },
      { title: 'Цвет', name: 'color', foot: 'average' },
      { title: 'Экстрактивность', name: 'extractivity', foot: 'average' },
      { title: 'Внесение', name: 'entry' },
      { title: '%', name: 'percent', foot: 'sum' },
    ],
  }),
  methods: {
    ...mapMutations(['CLR_RECIPE_MALT', 'ADD_RECIPE_MALT', 'DEL_RECIPE_MALT', 'UPD_RECIPE_MALT', 'SET_RECIPE_MALT']),
    addBtnClick() {
      this.CLR_RECIPE_MALT()
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
      if (typeof this.RECIPE_MALT['index'] != 'undefined') {
        this.UPD_RECIPE_MALT(this.RECIPE_MALT)
      } else {
        this.ADD_RECIPE_MALT(this.RECIPE_MALT)
      }
      this.$refs.modal.close()
    },
    tableBtnClick(e) {
      switch (e.button) {
        case 'edit':
          e.data['index'] = e.index
          this.SET_RECIPE_MALT({
            ...e.data,
          })
          this.$refs.modal.open()
          break
        case 'delete':
          this.DEL_RECIPE_MALT(e.index)
          break
      }
    },
  },
}
</script>

<style></style>
