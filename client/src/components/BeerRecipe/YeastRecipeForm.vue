<template>
  <div class="row">
    <form class="col s12" v-if="RECIPE_YEAST" ref="form">
      <autocomplete-yeast v-model="RECIPE_YEAST.yeast"></autocomplete-yeast>
      <div class="row">
        <div class="input-field col s12 m6">
          <input :id="'attenuation' + _uid" v-model.number="RECIPE_YEAST.attenuation" step="0.01" type="number" class="validate" required />
          <label :for="'attenuation' + _uid">Аттенюация</label>
        </div>
        <div class="input-field col s12 m6">
          <input :id="'temperature' + _uid" v-model.number="RECIPE_YEAST.temperature" step="0.01" type="number" class="validate" required />
          <label :for="'temperature' + _uid">Температура брожения</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12 m6">
          <select v-model="RECIPE_YEAST.fermentation" class="browser-default" required>
            <option value="">Брожение</option>
            <option v-for="ly in LIST_YEAST" :key="ly.id" :value="ly.title">{{ ly.title }}</option>
          </select>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import validate from '@/mixins/validate.mixin'
import AutocompleteYeast from '../Autocomplete/AutocompleteYeast.vue'

export default {
  components: { AutocompleteYeast },
  computed: {
    ...mapGetters(['RECIPE_YEAST', 'LIST_YEAST', 'YEAST']),
    yeastChange() {
      if (!this.RECIPE_YEAST) {
        return 0
      }
      return this.RECIPE_YEAST.yeast
    },
  },
  methods: {
    ...mapActions(['getListYeast', 'getYeastById']),
    updateField() {
      setTimeout(() => {
        M.updateTextFields()
      }, 0)
    },
  },
  mixins: [validate],
  mounted() {
    this.getListYeast()
  },
  watch: {
    async yeastChange() {
      if (!this.yeastChange) {
        return
      }
      await this.getYeastById(this.RECIPE_YEAST.yeast)
      this.RECIPE_YEAST['yeastTitle'] = this.YEAST.title
      this.updateField()
    },
  },
}
</script>

<style></style>
