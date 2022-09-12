<template>
  <div class="row">
    <form class="col s12" v-if="YEAST" ref="form">
      <div class="row">
        <div class="input-field col s12">
          <input id="title" type="text" v-model="YEAST.title" class="validate" required />
          <label for="title">Название</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input type="text" v-model="YEAST.use" id="use" />
          <label for="use">Применение</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s6">
          <select id="typeFermentation" v-model="YEAST.typeFermentation" class="browser-default">
            <option value="">Выберите тип брожения</option>
            <option v-for="t in typesFermentation" :key="t" :value="t">{{ t }}</option>
          </select>
          <!-- <input type="text" id="typeFermentation" class="validate" required /> -->
          <!-- <label for="typeFermentation">Тип брожения</label> -->
        </div>
        <div class="input-field col s12 m6">
          <input id="abbreviation" type="text" v-model="YEAST.abbreviation" />
          <label for="abbreviation">Аббревиатура</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s6">
          <input id="country" type="text" v-model="YEAST.country" />
          <label for="country">Страна</label>
        </div>
        <div class="input-field col s6">
          <input id="manufacturer" type="text" v-model="YEAST.manufacturer" />
          <label for="manufacturer">Производитель</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s6">
          <input type="text" id="fermentationTemp" v-model="YEAST.fermentationTemp" class="validate" required />
          <label for="fermentationTemp">Температура брожения</label>
        </div>
        <div class="input-field col s6">
          <input type="text" v-model="YEAST.optimalFermentationTemp" id="optimalFermentationTemp" />
          <label for="optimalFermentationTemp">Оптимальная температура брожения</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s6">
          <input type="text" v-model="YEAST.flocculation" id="flocculation" />
          <label for="flocculation">Флокуляция</label>
        </div>
        <div class="input-field col s6">
          <input type="text" v-model="YEAST.alcoholResistance" id="alcoholResistance" class="validate" required />
          <label for="alcoholResistance">Устойчивость к алкоголю</label>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import validate from '@/mixins/validate.mixin'

export default {
  computed: {
    ...mapGetters(['YEAST']),
  },
  data: () => ({
    typesFermentation: ['Верховое (Эли)', 'Низовое (Лагеры)'],
  }),
  mixins: [validate],
}
</script>

<style></style>
