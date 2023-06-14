<template>
  <div>
    <div class="row">
      <div class="col s12">
        <h4>Солод <small class="grey-text">Справочник</small></h4>
      </div>
    </div>
    <table-component
      :headers="headers"
      :counter="true"
      :min-length-find="1"
      :finder="true"
      :rows-data="MALT_LIST"
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
      title="Солод"
      :component="maltForm"
      :check-validate="true"
      @result-modal="resultModal"
      ref="modal"
    ></modal>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import Modal from '../../components/Modal.vue'
import MaltForm from '../../components/DirectoryForm/MaltForm.vue'
import TableComponent from '../../components/TableComponent.vue'

export default {
  components: { Modal, MaltForm, TableComponent },
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
    tableBtnClick(e) {
      if (e.button == 'add') {
        this.CLR_MALT()
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

      if (this.MALT.id) {
        this.putMaltById(this.MALT)
      } else {
        this.postMalt(this.MALT)
      }

      this.$refs.modal.close()
    },
    rowBtnClick(e) {
      if (e.button === 'delete' && confirm('Вы действительно хотите удалить элемент?')) {
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
