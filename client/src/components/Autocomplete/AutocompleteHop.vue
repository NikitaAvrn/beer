<template>
  <div class="row">
    <div class="input-field col s12">
      <input type="text" v-model="hop" class="autocomplete" id="hop-autocomplete" ref="autocomplete" />
      <label for="hop-autocomplete">Хмель</label>
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
    ...mapGetters(['HOP_LIST']),
  },
  data: () => ({
    autocomplete: null,
    hop: '',
  }),
  methods: {
    ...mapActions(['getHopList']),
    getHopTitleAutocomplete(hop) {
      return `${hop.title} (${hop.manufacturer} ${hop.country})`
    },
    onAutocomplete(e) {
      this.HOP_LIST.forEach((m) => {
        if (e === this.getHopTitleAutocomplete(m)) {
          this.hop = e
          this.$emit('input', m.id)
          return
        }
      })
    },
    setHopTitle() {
      if (this.value) {
        const hop = this.HOP_LIST.find((m) => m.id === this.value)
        this.hop = this.getHopTitleAutocomplete(hop)
      }
    },
  },
  async mounted() {
    await this.getHopList()
    let list = {}
    this.HOP_LIST.forEach((hop) => {
      const name = this.getHopTitleAutocomplete(hop)
      list[name] = null
    })
    this.autocomplete = M.Autocomplete.init(this.$refs.autocomplete, {
      minLength: 2,
      data: list,
      onAutocomplete: this.onAutocomplete,
    })
    this.setHopTitle()
  },
  props: ['value'],
  watch: {
    value() {
      if (!this.value) {
        this.hop = ''
        return
      }
      this.setHopTitle()
    },
  },
}
</script>

<style></style>
