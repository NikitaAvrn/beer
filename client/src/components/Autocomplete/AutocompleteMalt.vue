<template>
  <div class="row">
    <div class="input-field col s12">
      <input type="text" v-model="malt" class="autocomplete" id="malt-autocomplete" ref="autocomplete" />
      <label for="malt-autocomplete">Солод</label>
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
    ...mapGetters(['MALT_LIST']),
  },
  data: () => ({
    autocomplete: null,
    malt: '',
  }),
  methods: {
    ...mapActions(['getMaltList']),
    getMaltTitleAutocomplete(malt) {
      return `${malt.title} (${malt.manufacturer} ${malt.country})`
    },
    onAutocomplete(e) {
      this.MALT_LIST.forEach((m) => {
        if (e === this.getMaltTitleAutocomplete(m)) {
          this.malt = e
          this.$emit('input', m.id)
          return
        }
      })
    },
    setMaltTitle() {
      if (this.value) {
        const malt = this.MALT_LIST.find((m) => m.id === this.value)
        this.malt = this.getMaltTitleAutocomplete(malt)
      }
    },
  },
  async mounted() {
    await this.getMaltList()
    let list = {}
    this.MALT_LIST.forEach((malt) => {
      const name = this.getMaltTitleAutocomplete(malt)
      list[name] = null
    })
    this.autocomplete = M.Autocomplete.init(this.$refs.autocomplete, {
      minLength: 2,
      data: list,
      onAutocomplete: this.onAutocomplete,
    })
    this.setMaltTitle()
  },
  props: ['value'],
  watch: {
    value() {
      if (!this.value) {
        this.malt = ''
        return
      }
      this.setMaltTitle()
    },
  },
  updated() {},
}
</script>

<style></style>
