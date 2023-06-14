<template>
  <div>
    <div class="row">
      <div class="col s12">
        <h4>Хмель <small class="grey-text">Справочник</small></h4>
      </div>
    </div>
    <table-component
      :headers="headers"
      :counter="true"
      :min-length-find="1"
      :finder="true"
      :rows-data="HOP_LIST"
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
      title="Хмель"
      :component="hopForm"
      :check-validate="true"
      @result-modal="resultModal"
      ref="modal"
    ></modal>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import Modal from '../../components/Modal.vue'
import HopForm from '../../components/DirectoryForm/HopForm.vue'
import TableComponent from '../../components/TableComponent.vue'

export default {
  components: { Modal, HopForm, TableComponent },
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
    tableBtnClick(e) {
      if (e.button == 'add') {
        this.CLR_HOP()
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

      if (this.HOP.id) {
        this.putHopById(this.HOP)
      } else {
        this.postHop(this.HOP)
      }

      this.$refs.modal.close()
    },
    rowBtnClick(e) {
      if (e.button === 'delete' && confirm('Вы действительно хотите удалить элемент?')) {
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
