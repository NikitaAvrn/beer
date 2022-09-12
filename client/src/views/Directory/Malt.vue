<template>
  <div>
    <div class="row">
      <div class="col s12">
        <h2>Солод <small>Справочник</small></h2>
      </div>
    </div>
    <table-find :headers="headers" :data="MALT_LIST" @add-btn-click="addBtnClick" @table-btn-click="tableBtnClick"></table-find>
    <modal title="Солод" :component="maltForm" :check-validate="true" @result-modal="resultModal" ref="modal"></modal>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import Modal from '../../components/Modal.vue'
import TableFind from '../../components/TableFind.vue'
import MaltForm from '../../components/DirectoryForm/MaltForm.vue'
export default {
  components: { Modal, MaltForm, TableFind },
  computed: {
    ...mapGetters(['MALT_LIST', 'MALT']),
  },
  data: () => ({
    maltForm: MaltForm,
    headers: [
      { title: 'Название', name: 'title' },
      { title: 'Экстрактивность', name: 'extractivity' },
      { title: 'Цветность, EBC', name: 'color' },
      { title: 'Производитель', name: 'manufacturer' },
      { title: 'Страна', name: 'country' },
    ],
  }),
  methods: {
    ...mapActions(['getMaltList', 'getMaltById', 'postMalt', 'putMaltById', 'deleteMaltById']),
    ...mapMutations(['CLR_MALT']),
    addBtnClick() {
      this.CLR_MALT()
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

      if (this.MALT.id) {
        this.putMaltById(this.MALT)
      } else {
        this.postMalt(this.MALT)
      }

      this.$refs.modal.close()
    },
    tableBtnClick(e) {
      if (e.button === 'delete') {
        this.deleteMaltById(e.data.id)
      }
      if (e.button === 'edit') {
        this.getMaltById(e.data.id)
        this.$refs.modal.open()
      }
    },
  },
  mounted() {
    this.getMaltList()
  },
}
</script>

<style></style>
