<template>
  <div>
    <div class="row">
      <div class="col s12">
        <table-find
          v-if="RECIPE && RECIPE.pauseTemp"
          :headers="headers"
          :data="RECIPE.pauseTemp"
          @add-btn-click="addBtnClick"
          @table-btn-click="tableBtnClick"
        ></table-find>
      </div>
    </div>
    <modal title="Температурные паузы" :component="pauseTempRecipeForm" :check-validate="true" @result-modal="resultModal" ref="modal"></modal>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Modal from '../Modal.vue'
import TableFind from '../TableFind.vue'
import TemperaturePauseRecipeForm from './TemperaturePauseRecipeForm.vue'

export default {
  components: { TableFind, Modal, TemperaturePauseRecipeForm },
  computed: {
    ...mapGetters(['RECIPE', 'RECIPE_PAUSE_TEMP']),
  },
  data: () => ({
    pauseTempRecipeForm: TemperaturePauseRecipeForm,
    headers: [
      { title: 'Тип паузы', name: 'name' },
      { title: 'Нагрев', name: 'heat' },
      { title: 'Температура', name: 'temperature' },
      { title: 'Продолжительность', name: 'time', foot: 'sum' },
    ],
  }),
  methods: {
    ...mapMutations(['CLR_RECIPE_PAUSE_TEMP', 'ADD_RECIPE_PAUSE_TEMP', 'DEL_RECIPE_PAUSE_TEMP', 'UPD_RECIPE_PAUSE_TEMP', 'SET_RECIPE_PAUSE_TEMP']),
    addBtnClick() {
      this.CLR_RECIPE_PAUSE_TEMP()
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
      if (typeof this.RECIPE_PAUSE_TEMP['index'] != 'undefined') {
        this.UPD_RECIPE_PAUSE_TEMP(this.RECIPE_PAUSE_TEMP)
      } else {
        this.ADD_RECIPE_PAUSE_TEMP(this.RECIPE_PAUSE_TEMP)
      }
      this.$refs.modal.close()
    },
    tableBtnClick(e) {
      switch (e.button) {
        case 'edit':
          e.data['index'] = e.index
          this.SET_RECIPE_PAUSE_TEMP({
            ...e.data,
          })
          this.$refs.modal.open()
          break
        case 'delete':
          this.DEL_RECIPE_PAUSE_TEMP(e.index)
          break
      }
    },
  },
}
</script>

<style></style>
