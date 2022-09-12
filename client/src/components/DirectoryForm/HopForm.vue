<template>
  <div class="row">
    <form class="col s12" v-if="HOP" ref="form">
      <div class="row">
        <div class="input-field col s12">
          <input id="title" type="text" v-model.trim="HOP.title" class="validate" required />
          <label for="title">Название</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s6">
          <input id="country" type="text" v-model.trim="HOP.country" />
          <label for="country">Страна</label>
        </div>
        <div class="input-field col s6">
          <input id="manufacturer" type="text" v-model.trim="HOP.manufacturer" />
          <label for="manufacturer">Производитель</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s6">
          <input id="alpha" type="text" v-model.trim="HOP.alpha" class="validate" required />
          <label for="alpha">Альфа-кислота (%)</label>
        </div>
        <!-- <div class="col s6">
          <div ref="alpha"></div>
        </div> -->
        <div class="input-field col s6">
          <input id="fragrance" type="text" v-model.trim="HOP.fragrance" />
          <label for="fragrance">Аромат</label>
        </div>
      </div>
      <div class="row">
        <div class="col s6">
          <p>
            <label>
              <input type="checkbox" id="bitter" v-model="HOP.bitter" />
              <span>Горечь</span>
            </label>
          </p>
        </div>
        <div class="col s6">
          <p>
            <label>
              <input type="checkbox" id="aroma" v-model="HOP.aroma" />
              <span>Аромат</span>
            </label>
          </p>
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
    ...mapGetters(['HOP']),
  },
  data: () => ({
    //slider: null,
  }),
  mixins: [validate],
  mounted() {
    //console.log(noUiSlider)
  },
}
</script>

<style></style>
