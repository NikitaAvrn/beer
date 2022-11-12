<template>
  <div>
    <div class="row">
      <div class="col s12">
        <table-find v-if="RECIPE && RECIPE.hop" :headers="headers" :data="hopList" @add-btn-click="addBtnClick" @table-btn-click="tableBtnClick"></table-find>
      </div>
    </div>
    <modal title="Хмель" :component="hopRecipeForm" :check-validate="true" @result-modal="resultModal" ref="modal"></modal>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Modal from '../Modal.vue'
import TableFind from '../TableFind.vue'
import HopRecipeForm from './HopRecipeForm.vue'

export default {
  components: { TableFind, Modal, HopRecipeForm },
  computed: {
    ...mapGetters(['RECIPE', 'RECIPE_HOP']),
    hopList() {
      if (!this.RECIPE) {
        return []
      }
      const sum = this.RECIPE.hop.reduce((total, m) => total + m.weight, 0)
      const percent = sum / 100
      return this.RECIPE.hop.map((m) => {
        m['percent'] = (Number.parseFloat(m.weight) / percent).toFixed(2)
        return m
      })
    },
  },
  data: () => ({
    hopRecipeForm: HopRecipeForm,
    headers: [
      { title: 'Хмель', name: 'hopTitle' },
      { title: 'Вес (гр.)', name: 'weight', foot: 'sum' },
      { title: 'Альфа (%)', name: 'alpha', foot: 'average' },
      { title: 'Тип', name: 'type' },
      { title: 'Внесение', name: 'entry' },
      { title: 'Время (мин.)', name: 'time' },
      { title: '%', name: 'percent', foot: 'sum' },
    ],
  }),
  methods: {
    ...mapMutations(['CLR_RECIPE_HOP', 'ADD_RECIPE_HOP', 'DEL_RECIPE_HOP', 'UPD_RECIPE_HOP', 'SET_RECIPE_HOP']),
    addBtnClick() {
      this.CLR_RECIPE_HOP()
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
      if (typeof this.RECIPE_HOP['index'] != 'undefined') {
        this.UPD_RECIPE_HOP(this.RECIPE_HOP)
      } else {
        this.ADD_RECIPE_HOP(this.RECIPE_HOP)
      }
      this.$refs.modal.close()
    },
    tableBtnClick(e) {
      switch (e.button) {
        case 'edit':
          e.data['index'] = e.index
          this.SET_RECIPE_HOP({
            ...e.data,
          })
          this.$refs.modal.open()
          break
        case 'delete':
          this.DEL_RECIPE_HOP(e.index)
          break
      }
    },
  },
}
</script>

<style></style>
