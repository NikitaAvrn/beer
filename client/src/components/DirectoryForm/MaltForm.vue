<template>
  <div class="row">
    <form class="col s12" v-if="MALT" ref="form">
      <div class="row">
        <div class="input-field col s12">
          <input id="title" v-model.trim="MALT.title" type="text" class="validate" required />
          <label for="title">Название</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s6">
          <input id="country" v-model.trim="MALT.country" type="text" />
          <label for="country">Страна</label>
        </div>
        <div class="input-field col s6">
          <input id="manufacturer" v-model.trim="MALT.manufacturer" type="text" />
          <label for="manufacturer">Производитель</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s6">
          <input type="text" v-model.trim="MALT.extractivity" id="extractivity" />
          <label for="extractivity">Экстрактивность СВ, %</label>
        </div>
        <div class="input-field col s6">
          <input type="text" v-model.trim="MALT.protein" id="protein" />
          <label for="protein">Содержание белка, %</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s6">
          <input type="text" v-model.trim="MALT.color" id="color" />
          <label for="color">Цветность, ЕВС</label>
        </div>
        <div class="input-field col s6">
          <input type="text" v-model.trim="MALT.colorBoiling" id="color-boiling" />
          <label for="color-boiling">Цветность после кипячения, ЕВС</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s6">
          <input type="text" v-model.trim="MALT.humidity" id="humidity" />
          <label for="humidity">Влажность, %</label>
        </div>
        <div class="input-field col s6">
          <input type="text" v-model.trim="MALT.viscosity" id="viscosity" />
          <label for="viscosity">Вязкость, мПа*с</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s6">
          <input type="text" v-model.trim="MALT.kolbach" id="kolbach" />
          <label for="kolbach">Число Кольбаха, %</label>
        </div>
        <div class="input-field col s6">
          <input type="text" v-model.trim="MALT.differenceExtract" id="difference-extract" />
          <label for="difference-extract">Разность экстрактов, %</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s6">
          <input type="text" v-model.trim="MALT.diastaticStrength" id="diastatic-strength" />
          <label for="diastatic-strength">Диастатическая сила, WK</label>
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
    ...mapGetters(['MALT']),
  },
  mixins: [validate],
  methods: {
    ...mapActions([]),
  },
}
</script>

<style></style>
