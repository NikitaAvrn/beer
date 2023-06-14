<template>
  <div class="modal" ref="modal">
    <div class="modal-content">
      <h4>
        {{ title }}
        <span class="right"
          ><button class="btn grey lighten-5 black-text waves-effect z-depth-0 modal-close" type="button">
            <i class="fa fa-times"></i></button
        ></span>
      </h4>
      <div class="body-modal">
        <component :is="component" ref="component"></component>
      </div>
    </div>
    <div class="modal-footer">
      <a href="#!" @click="ok" class="waves-effect waves-green btn-flat"
        ><i class="left fa fa-save"></i>Сохранить</a
      >
      <a href="#!" @click="cancel" class="waves-effect waves-red btn-flat"
        ><i class="left fa fa-xmark"></i>Отменить</a
      >
    </div>
  </div>
</template>

<script>
export default {
  beforeDestroy() {
    if (this.modal && this.modal.destroy) {
      this.modal.destroy()
    }
  },
  data: () => ({
    modal: null,
  }),
  methods: {
    cancel() {
      this.$emit('result-modal', {
        result: false,
        validate: true,
      })
    },
    ok() {
      this.$emit('result-modal', {
        result: true,
        validate: this.validate(),
      })
    },
    open() {
      this.modal.open()
    },
    close() {
      this.modal.close()
    },
    validate() {
      if (this.checkValidate && this.$refs.component.validateForm) {
        return this.$refs.component.validateForm()
      }
      return true
    },
  },
  mounted() {
    this.modal = M.Modal.init(this.$refs.modal, {
      dismissible: false,
      onOpenEnd: () => {
        setTimeout(() => {
          M.updateTextFields()
        }, 0)
      },
    })
  },
  props: ['title', 'component', 'checkValidate'],
}
</script>

<style></style>
