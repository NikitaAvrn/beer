<template>
  <div class="row">
    <form class="col s12" v-if="RECIPE_OTHER_INGREDIENT" ref="form">
      <autocomplete-other v-model="RECIPE_OTHER_INGREDIENT.other"></autocomplete-other>
      <div class="row">
        <div class="input-field col s12 m6">
          <input :id="'weight' + _uid" v-model.number="RECIPE_OTHER_INGREDIENT.weight" step="0.01" type="number" class="validate" required />
          <label :for="'weight' + _uid">Вес (кг.)</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12 m6">
          <select v-model="RECIPE_OTHER_INGREDIENT.entry" class="browser-default" required>
            <option value="">Внесение</option>
            <option v-for="le in LIST_OTHER" :key="le.id" :value="le.title">{{ le.title }}</option>
          </select>
        </div>
        <div class="input-field col s12 m6" v-show="RECIPE_OTHER_INGREDIENT.entry == 'Кипячение'">
          <input :id="'time' + _uid" v-model.number="RECIPE_OTHER_INGREDIENT.time" type="number" />
          <label :for="'time' + _uid">Вносить на (мин.)</label>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import validate from '@/mixins/validate.mixin'
import AutocompleteOther from '../Autocomplete/AutocompleteOther.vue'

export default {
  components: { AutocompleteOther },
  computed: {
    ...mapGetters(['RECIPE_OTHER_INGREDIENT', 'LIST_OTHER', 'OTHER_INGREDIENT']),
    otherChange() {
      if (!this.RECIPE_OTHER_INGREDIENT) {
        return 0
      }
      return this.RECIPE_OTHER_INGREDIENT.other
    },
  },
  methods: {
    ...mapActions(['getListOther', 'getOtherIngredientById']),
    updateField() {
      setTimeout(() => {
        M.updateTextFields()
      }, 0)
    },
  },
  mixins: [validate],
  mounted() {
    this.getListOther()
  },
  watch: {
    async otherChange() {
      if (!this.otherChange) {
        return
      }
      await this.getOtherIngredientById(this.RECIPE_OTHER_INGREDIENT.other)
      this.RECIPE_OTHER_INGREDIENT['otherTitle'] = this.OTHER_INGREDIENT.title
      this.updateField()
    },
  },
}
</script>

<style></style>
