<template>
  <div class="row">
    <form class="col s12" v-if="TARIFF" ref="form">
      <div class="row">
        <div class="input-field col s6">
          <input
            type="number"
            id="price"
            step=".0001"
            min="0"
            class="validate"
            v-model.number="TARIFF.price"
            required
          />
          <label for="price">Тариф за м^2 (руб.)</label>
        </div>
        <div class="input-field col s6">
          <input type="date" id="date" min="" class="validate" v-model="TARIFF.date" required />
          <label for="date">Дата начала действия тарифа</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input type="text" id="comment" v-model.trim="TARIFF.comment" />
          <label for="comment">Основание</label>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['TARIFF']),
  },
  data: () => ({}),
  mounted() {
    this.updateFields()
  },
  methods: {
    validate() {
      const isValid = this.$refs.form.checkValidity()
      if (!isValid) {
        this.$refs.form.reportValidity()
      }
      return isValid
    },
    updateFields() {
      setTimeout(() => {
        M.updateTextFields()
      }, 0)
    },
  },
}
</script>

<style></style>
