<template>
  <div class="row">
    <div class="input-field col s12">
      <input type="text" v-model="yeast" class="autocomplete" id="yeast-autocomplete" ref="autocomplete" />
      <label for="yeast-autocomplete">Дрожжи</label>
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
    ...mapGetters(['YEAST_LIST']),
  },
  data: () => ({
    autocomplete: null,
    yeast: '',
  }),
  methods: {
    ...mapActions(['getYeastList']),
    getYeastTitleAutocomplete(yeast) {
      return `${yeast.title} (${yeast.abbreviation} - ${yeast.manufacturer})`
    },
    onAutocomplete(e) {
      this.YEAST_LIST.forEach((m) => {
        if (e === this.getYeastTitleAutocomplete(m)) {
          this.yeast = e
          this.$emit('input', m.id)
          return
        }
      })
    },
    setYeastTitle() {
      if (this.value) {
        const yeast = this.YEAST_LIST.find((m) => m.id === this.value)
        this.yeast = this.getYeastTitleAutocomplete(yeast)
      }
    },
  },
  async mounted() {
    await this.getYeastList()
    let list = {}
    this.YEAST_LIST.forEach((yeast) => {
      const name = this.getYeastTitleAutocomplete(yeast)
      list[name] = null
    })
    this.autocomplete = M.Autocomplete.init(this.$refs.autocomplete, {
      minLength: 2,
      data: list,
      onAutocomplete: this.onAutocomplete,
    })
    this.setYeastTitle()
  },
  props: ['value'],
  watch: {
    value() {
      if (!this.value) {
        this.yeast = ''
        return
      }
      this.setYeastTitle()
    },
  },
}
</script>

<style></style>
