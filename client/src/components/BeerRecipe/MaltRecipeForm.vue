<template>
  <div class="row">
    <form class="col s12" v-if="RECIPE_MALT" ref="form">
      <autocomplete-malt v-model="RECIPE_MALT.malt"></autocomplete-malt>
      <div class="row">
        <div class="input-field col s12 m6">
          <input :id="'weight' + _uid" v-model.number="RECIPE_MALT.weight" step="0.01" type="number" class="validate" required />
          <label :for="'weight' + _uid">Вес</label>
        </div>
        <div class="input-field col s12 m6">
          <input :id="'color' + _uid" v-model.number="RECIPE_MALT.color" step="0.01" type="number" class="validate" required />
          <label :for="'color' + _uid">Цвет</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12 m6">
          <input :id="'extractivity' + _uid" v-model.number="RECIPE_MALT.extractivity" type="number" class="validate" required />
          <label :for="'extractivity' + _uid">Экстрактивность</label>
        </div>
        <div class="input-field col s12 m6">
          <select v-model="RECIPE_MALT.entry" class="browser-default">
            <option selected>Внесение</option>
            <option v-for="lm in LIST_MALT" :key="lm.id" :value="lm.title">{{ lm.title }}</option>
          </select>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import validate from '@/mixins/validate.mixin'
import AutocompleteMalt from '../Autocomplete/AutocompleteMalt.vue'

export default {
  components: { AutocompleteMalt },
  computed: {
    ...mapGetters(['RECIPE_MALT', 'LIST_MALT', 'MALT']),
    maltChange() {
      if (!this.RECIPE_MALT) {
        return 0
      }
      return this.RECIPE_MALT.malt
    },
  },
  methods: {
    ...mapActions(['getListMalt', 'getMaltById']),
    updateField() {
      setTimeout(() => {
        M.updateTextFields()
      }, 0)
    },
  },
  mixins: [validate],
  mounted() {
    this.getListMalt()
  },
  watch: {
    async maltChange() {
      if (!this.maltChange) {
        return
      }
      if (this.RECIPE_MALT.color && this.RECIPE_MALT.extractivity) {
        return
      }
      await this.getMaltById(this.RECIPE_MALT.malt)
      this.RECIPE_MALT.color = Number.parseFloat(this.MALT.color)
      this.RECIPE_MALT.extractivity = Number.parseFloat(this.MALT.extractivity)
      this.RECIPE_MALT['maltTitle'] = this.MALT.title
      this.updateField()
    },
  },
}
</script>

<style></style>
