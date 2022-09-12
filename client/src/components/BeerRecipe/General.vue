<template>
  <div class="row">
    <form class="col s12" v-if="RECIPE" ref="form">
      <div class="row">
        <div class="input-field col s12">
          <input id="title" v-model.trim="RECIPE.title" type="text" class="validate" required />
          <label for="title">Название рецепта</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12 m4">
          <input id="cooking-efficiency" v-model.number="RECIPE.efficiency" type="number" class="validate" required />
          <label for="cooking-efficiency">Эффективность затирания (%)</label>
        </div>
        <div class="input-field col s12 m4">
          <input id="boil-time" v-model.number="RECIPE.boil" type="number" class="validate" required />
          <label for="boil-time">Время кипячения (мин.)</label>
        </div>
        <div class="input-field col s12 m4">
          <input id="hydromodule" v-model.number="RECIPE.hydromodule" type="number" class="validate" required />
          <label for="hydromodule">Гидромодуль</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12 m3">
          <input id="start-extractivity" v-model.number="RECIPE.startExtractivity" step="0.1" type="number" class="validate" required />
          <label for="start-extractivity">Начальная экстрактивность (%)</label>
        </div>
        <div class="input-field col s12 m3">
          <input id="finish-extractivity" v-model.number="RECIPE.finishExtractivity" step="0.1" type="number" class="validate" required />
          <label for="finish-extractivity">Конечная экстрактивность (%)</label>
        </div>
        <div class="input-field col s12 m3">
          <input id="abv" v-model.number="RECIPE.abv" type="number" step="0.1" class="validate" required />
          <label for="abv">Объемная доля спирта ABV (%)</label>
        </div>
        <div class="input-field col s12 m3">
          <input id="ibu" v-model.number="RECIPE.ibu" type="number" step="0.1" class="validate" required />
          <label for="ibu">Расчетная горечь (IBU)</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <textarea id="description" v-model.trim="RECIPE.description" class="materialize-textarea"></textarea>
          <label for="description">Дополнительная информация</label>
        </div>
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="carbonization" />
          <span>Карбонизация</span>
        </label>
      </p>
      <div class="section" v-show="carbonization">
        <div class="row">
          <div class="input-field col s12 m4">
            <select class="browser-default" v-model="RECIPE.primer">
              <option disabled>Тип праймера</option>
              <option v-for="primer in LIST_PRIMER" :key="primer.id">{{ primer.title }}</option>
            </select>
          </div>
          <div class="input-field col s12 m4">
            <input id="beer-temperature" v-model.number="RECIPE.temperature" type="number" class="validate" />
            <label for="beer-temperature">Температура пива (t&deg;)</label>
          </div>
          <div class="input-field col s12 m4">
            <input id="co2" v-model.number="RECIPE.co2" type="number" step="0.1" class="validate" />
            <label for="co2">СО₂ (%)</label>
          </div>
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
    ...mapGetters(['RECIPE', 'LIST_PRIMER']),
  },
  data: () => ({
    carbonization: false,
  }),
  methods: {
    ...mapActions(['getListPrimer']),
  },
  mixins: [validate],
  mounted() {
    this.getListPrimer()
  },
  watch: {
    RECIPE() {
      if (this.RECIPE) {
        if (this.RECIPE.primer || this.RECIPE.temperature || this.RECIPE.co2) {
          this.carbonization = true
        }
      }
    },
  },
}
</script>

<style></style>
