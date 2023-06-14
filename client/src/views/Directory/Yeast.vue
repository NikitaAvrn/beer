<template>
  <div>
    <div class="row">
      <div class="col s12">
        <h4>Дрожжи <small class="grey-text">Справочник</small></h4>
      </div>
    </div>
    <table-component
      :headers="headers"
      :counter="true"
      :min-length-find="1"
      :finder="true"
      :rows-data="YEAST_LIST"
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
      title="Дрожжи"
      :component="yeastForm"
      :check-validate="true"
      @result-modal="resultModal"
      ref="modal"
    ></modal>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import Modal from '../../components/Modal.vue'
import YeastForm from '../../components/DirectoryForm/YeastForm.vue'
import TableComponent from '../../components/TableComponent.vue'

export default {
  components: { Modal, YeastForm, TableComponent },
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
    tableBtnClick(e) {
      if (e.button == 'add') {
        this.CLR_YEAST()
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

      if (this.YEAST.id) {
        this.putYeastById(this.YEAST)
      } else {
        this.postYeast(this.YEAST)
      }

      this.$refs.modal.close()
    },
    rowBtnClick(e) {
      if (e.button === 'delete' && confirm('Вы действительно хотите удалить элемент?')) {
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
