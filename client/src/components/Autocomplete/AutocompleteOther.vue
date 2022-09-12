<template>
  <div class="row">
    <div class="input-field col s12">
      <input type="text" v-model="other" class="autocomplete" id="other-autocomplete" ref="autocomplete" />
      <label for="other-autocomplete">Другие ингридиенты</label>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  beforeDestroy() {
    if (this.autocomplete && this.autocomplete.destroy) {
      this.autocomplete.destroy()
    }
  },
  computed: {
    ...mapGetters(['OTHER_INGREDIENT_LIST']),
  },
  data: () => ({
    autocomplete: null,
    other: '',
  }),
  methods: {
    ...mapActions(['getOtherIngredientList']),
    getOtherTitleAutocomplete(other) {
      return `${other.title}`
    },
    onAutocomplete(e) {
      this.OTHER_INGREDIENT_LIST.forEach((m) => {
        if (e === this.getOtherTitleAutocomplete(m)) {
          this.other = e
          this.$emit('input', m.id)
          return
        }
      })
    },
    setOtherTitle() {
      if (this.value) {
        const other = this.OTHER_INGREDIENT_LIST.find((m) => m.id === this.value)
        this.other = this.getOtherTitleAutocomplete(other)
      }
    },
  },
  async mounted() {
    await this.getOtherIngredientList()
    let list = {}
    this.OTHER_INGREDIENT_LIST.forEach((other) => {
      const name = this.getOtherTitleAutocomplete(other)
      list[name] = null
    })
    this.autocomplete = M.Autocomplete.init(this.$refs.autocomplete, {
      minLength: 2,
      data: list,
      onAutocomplete: this.onAutocomplete,
    })
    this.setOtherTitle()
  },
  props: ['value'],
  watch: {
    value() {
      if (!this.value) {
        this.other = ''
        return
      }
      this.setOtherTitle()
    },
  },
}
</script>

<style></style>
