<template>
  <div>
    <div class="row">
      <div class="col s12">
        <h2>Хмель <small>Справочник</small></h2>
      </div>
    </div>
    <table-find :headers="headers" :data="HOP_LIST" @add-btn-click="addBtnClick" @table-btn-click="tableBtnClick"></table-find>
    <modal title="Хмель" :component="hopForm" :check-validate="true" @result-modal="resultModal" ref="modal"></modal>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import Modal from '../../components/Modal.vue'
import TableFind from '../../components/TableFind.vue'
import HopForm from '../../components/DirectoryForm/HopForm.vue'

export default {
  components: { Modal, HopForm, TableFind },
  computed: {
    ...mapGetters(['HOP_LIST', 'HOP']),
  },
  data: () => ({
    hopForm: HopForm,
    headers: [
      { title: 'Название', name: 'title' },
      { title: 'Альфа-кислота', name: 'alpha', type: 'number' },
      { title: 'Аромат', name: 'fragrance' },
      { title: 'Производитель', name: 'manufacturer' },
      { title: 'Страна', name: 'country' },
    ],
  }),
  methods: {
    ...mapActions(['getHopList', 'getHopById', 'postHop', 'putHopById', 'deleteHopById']),
    ...mapMutations(['CLR_HOP']),
    addBtnClick() {
      this.CLR_HOP()
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

      if (this.HOP.id) {
        this.putHopById(this.HOP)
      } else {
        this.postHop(this.HOP)
      }

      this.$refs.modal.close()
    },
    tableBtnClick(e) {
      if (e.button === 'delete') {
        this.deleteHopById(e.data.id)
      }
      if (e.button === 'edit') {
        this.getHopById(e.data.id)
        this.$refs.modal.open()
      }
    },
  },
  mounted() {
    this.getHopList()
  },
}
</script>

<style></style>
