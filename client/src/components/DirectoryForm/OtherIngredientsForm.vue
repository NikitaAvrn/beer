<template>
  <div class="row">
    <form class="col s12" v-if="OTHER_INGREDIENT" ref="form">
      <div class="row">
        <div class="input-field col s12">
          <input id="title" v-model="OTHER_INGREDIENT.title" type="text" class="validate" required />
          <label for="title">Название</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s6">
          <input id="country" v-model="OTHER_INGREDIENT.country" type="text" />
          <label for="country">Страна</label>
        </div>
        <div class="input-field col s6">
          <input id="manufacturer" v-model="OTHER_INGREDIENT.manufacturer" type="text" />
          <label for="manufacturer">Производитель</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s6">
          <input type="text" id="extractivity" v-model="OTHER_INGREDIENT.extractivity" class="validate" required />
          <label for="extractivity">Экстрактивность СВ, %</label>
        </div>
        <div class="input-field col s6">
          <input type="text" id="color" v-model="OTHER_INGREDIENT.color" />
          <label for="color">Цветность, ЕВС</label>
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
    ...mapGetters(['OTHER_INGREDIENT']),
  },
  mixins: [validate],
}
</script>

<style></style>
