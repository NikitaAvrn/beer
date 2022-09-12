<template>
  <div>
    <div class="row">
      <div class="col s12">
        <h2>Дрожжи <small>Справочник</small></h2>
      </div>
    </div>
    <table-find :headers="headers" :data="YEAST_LIST" @add-btn-click="addBtnClick" @table-btn-click="tableBtnClick"></table-find>
    <modal title="Дрожжи" :component="yeastForm" :check-validate="true" @result-modal="resultModal" ref="modal"></modal>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import Modal from '../../components/Modal.vue'
import YeastForm from '../../components/DirectoryForm/YeastForm.vue'
import TableFind from '../../components/TableFind.vue'

export default {
  components: { Modal, YeastForm, TableFind },
  computed: {
    ...mapGetters(['YEAST_LIST', 'YEAST']),
  },
  data: () => ({
    yeastForm: YeastForm,
    headers: [
      { title: 'Название', name: 'title' },
      { title: 'Тип', name: 'typeFermentation' },
      { title: 'Температура', name: 'fermentationTemp' },
      { title: 'Применение', name: 'use' },
      { title: 'Производитель', name: 'manufacturer' },
      { title: 'Страна', name: 'country' },
    ],
  }),
  methods: {
    ...mapActions(['getYeastList', 'getYeastById', 'postYeast', 'putYeastById', 'deleteYeastById']),
    ...mapMutations(['CLR_YEAST']),
    addBtnClick() {
      this.CLR_YEAST()
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

      if (this.YEAST.id) {
        this.putYeastById(this.YEAST)
      } else {
        this.postYeast(this.YEAST)
      }

      this.$refs.modal.close()
    },
    tableBtnClick(e) {
      if (e.button === 'delete') {
        this.deleteYeastById(e.data.id)
      }
      if (e.button === 'edit') {
        this.getYeastById(e.data.id)
        this.$refs.modal.open()
      }
    },
  },
  mounted() {
    this.getYeastList()
  },
}
</script>

<style></style>
