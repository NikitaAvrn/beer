<template>
  <div class="row">
    <form class="col s12" v-if="RECIPE_HOP" ref="form">
      <autocomplete-hop v-model="RECIPE_HOP.hop"></autocomplete-hop>
      <div class="row">
        <div class="input-field col s12 m6">
          <input :id="'weight' + _uid" v-model.number="RECIPE_HOP.weight" step="0.001" type="number" class="validate" required />
          <label :for="'weight' + _uid">Вес (гр.)</label>
        </div>
        <div class="input-field col s12 m6">
          <input :id="'alpha' + _uid" v-model.number="RECIPE_HOP.alpha" step="0.01" type="number" class="validate" required />
          <label :for="'alpha' + _uid">Альфа-кислота (%)</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12 m6">
          <select v-model="RECIPE_HOP.entry" class="browser-default" required>
            <option value="">Внесение</option>
            <option v-for="lh0 in LIST_HOP0" :key="lh0.id" :value="lh0.title">{{ lh0.title }}</option>
          </select>
        </div>
        <div class="input-field col s12 m6" v-show="entry.visible">
          <input :id="'time' + _uid" v-model.number="RECIPE_HOP.time" type="number" class="validate" />
          <label :for="'time' + _uid">Время внесения {{ entry.title }}</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12 m6">
          <select v-model="RECIPE_HOP.type" class="browser-default" required>
            <option value="" disabled>Форма</option>
            <option v-for="lh1 in LIST_HOP1" :key="lh1.id" :value="lh1.title">{{ lh1.title }}</option>
          </select>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import validate from '@/mixins/validate.mixin'
import AutocompleteHop from '../Autocomplete/AutocompleteHop.vue'

export default {
  components: { AutocompleteHop },
  computed: {
    ...mapGetters(['RECIPE_HOP', 'LIST_HOP0', 'LIST_HOP1', 'HOP']),
    hopChange() {
      if (!this.RECIPE_HOP) {
        return 0
      }
      return this.RECIPE_HOP.hop
    },
    entry() {
      let result = {}
      switch (this.RECIPE_HOP.entry) {
        case 'Кипячение':
          result.visible = true
          result.title = '(мин.)'
          break
        case 'Сухое охмеление':
          result.visible = true
          result.title = '(дн.)'
          break
        case 'Вирпул':
          result.visible = false
          break
      }
      return result
    },
  },
  methods: {
    ...mapActions(['getListHop0', 'getListHop1', 'getHopById']),
    updateField() {
      setTimeout(() => {
        M.updateTextFields()
      }, 0)
    },
  },
  mixins: [validate],
  mounted() {
    this.getListHop0()
    this.getListHop1()
  },
  watch: {
    async hopChange() {
      if (!this.hopChange) {
        return
      }
      if (this.RECIPE_HOP.alpha) {
        return
      }
      await this.getHopById(this.RECIPE_HOP.hop)
      this.RECIPE_HOP.alpha = Number.parseFloat(this.HOP.alpha)
      this.RECIPE_HOP['hopTitle'] = this.HOP.title
      this.updateField()
    },
  },
}
</script>

<style></style>
