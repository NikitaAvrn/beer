<template>
  <div class="row">
    <form class="col s12" v-if="RECIPE_PAUSE_TEMP" ref="form">
      <div class="row">
        <div class="input-field col s12 m6">
          <select v-model="RECIPE_PAUSE_TEMP.name" class="browser-default" required>
            <option disabled value="">Наименование паузы</option>
            <option v-for="lp0 in LIST_PAUSE0" :key="lp0.id" :value="lp0.title">{{ lp0.title }}</option>
          </select>
        </div>
        <div class="input-field col s12 m6">
          <select v-model="RECIPE_PAUSE_TEMP.heat" class="browser-default" required>
            <option disabled value="">Нагрев</option>
            <option v-for="lp1 in LIST_PAUSE1" :key="lp1.id" :value="lp1.title">{{ lp1.title }}</option>
          </select>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12 m6">
          <input :id="'temperature' + _uid" v-model.number="RECIPE_PAUSE_TEMP.temperature" type="number" class="validate" required />
          <label :for="'temperature' + _uid">Температура (°C)</label>
        </div>
        <div class="input-field col s12 m6">
          <input :id="'time' + _uid" v-model.number="RECIPE_PAUSE_TEMP.time" type="number" class="validate" required />
          <label :for="'time' + _uid">Продолжительность (мин.)</label>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import validate from '@/mixins/validate.mixin'

export default {
  computed: {
    ...mapGetters(['RECIPE_PAUSE_TEMP', 'LIST_PAUSE0', 'LIST_PAUSE1']),
  },
  methods: {
    ...mapActions(['getListPause0', 'getListPause1']),
    updateField() {
      setTimeout(() => {
        M.updateTextFields()
      }, 0)
    },
  },
  mixins: [validate],
  mounted() {
    this.getListPause0()
    this.getListPause1()
  },
}
</script>

<style></style>
