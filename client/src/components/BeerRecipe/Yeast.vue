<template>
  <div>
    <div class="row">
      <div class="col s12">
        <table-find
          v-if="RECIPE && RECIPE.yeast"
          :headers="headers"
          :data="RECIPE.yeast"
          @add-btn-click="addBtnClick"
          @table-btn-click="tableBtnClick"
        ></table-find>
      </div>
    </div>
    <modal title="Дрожжи" :component="yeastRecipeForm" :check-validate="true" @result-modal="resultModal" ref="modal"></modal>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Modal from '../Modal.vue'
import TableFind from '../TableFind.vue'
import YeastRecipeForm from './YeastRecipeForm.vue'

export default {
  components: { TableFind, Modal, YeastRecipeForm },
  computed: {
    ...mapGetters(['RECIPE', 'RECIPE_YEAST']),
  },
  data: () => ({
    yeastRecipeForm: YeastRecipeForm,
    headers: [
      { title: 'Дрожжи', name: 'yeastTitle' },
      { title: 'Температура', name: 'temperature' },
      { title: 'Брожение', name: 'fermentation' },
      { title: 'Аттенюация', name: 'attenuation' },
    ],
  }),
  methods: {
    ...mapMutations(['CLR_RECIPE_YEAST', 'ADD_RECIPE_YEAST', 'DEL_RECIPE_YEAST', 'UPD_RECIPE_YEAST', 'SET_RECIPE_YEAST']),
    addBtnClick() {
      this.CLR_RECIPE_YEAST()
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
      if (typeof this.RECIPE_YEAST['index'] != 'undefined') {
        this.UPD_RECIPE_YEAST(this.RECIPE_YEAST)
      } else {
        this.ADD_RECIPE_YEAST(this.RECIPE_YEAST)
      }
      this.$refs.modal.close()
    },
    tableBtnClick(e) {
      switch (e.button) {
        case 'edit':
          e.data['index'] = e.index
          this.SET_RECIPE_YEAST({
            ...e.data,
          })
          this.$refs.modal.open()
          break
        case 'delete':
          this.DEL_RECIPE_YEAST(e.index)
          break
      }
    },
  },
}
</script>

<style></style>
