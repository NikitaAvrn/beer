<template>
  <div class="row">
    <div class="input-field col s12">
      <input type="text" v-model="recipe" class="autocomplete" id="recipe-autocomplete" ref="autocomplete" />
      <label for="recipe-autocomplete">Рецепт пива</label>
    </div>
  </div>
</template>

<script>
import { set } from 'vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  beforeDestroy() {
    if (this.autocomplete && this.autocomplete.destroy) {
      this.autocomplete.destroy()
    }
  },
  computed: {
    ...mapGetters(['RECIPE_LIST']),
  },
  data: () => ({
    autocomplete: null,
    recipe: '',
  }),
  methods: {
    ...mapActions(['getBeerRecipeList']),
    getRecipeTitleAutocomplete(recipe) {
      if (recipe && recipe.title) {
        return `${recipe.title}`
      }
      return 'Рецепт был удален'
    },
    onAutocomplete(e) {
      this.RECIPE_LIST.forEach((m) => {
        if (e === this.getRecipeTitleAutocomplete(m)) {
          this.recipe = e
          this.$emit('input', m.id)
          return
        }
      })
    },
    setRecipeTitle() {
      if (this.value) {
        const recipe = this.RECIPE_LIST.find((m) => m.id === this.value)
        this.recipe = this.getRecipeTitleAutocomplete(recipe)
      }
    },
    updateTextField() {
      setTimeout(() => {
        M.updateTextFields()
      }, 0)
    },
  },
  async mounted() {
    await this.getBeerRecipeList()
    let list = {}
    this.RECIPE_LIST.forEach((recipe) => {
      const name = this.getRecipeTitleAutocomplete(recipe)
      list[name] = null
    })
    this.autocomplete = M.Autocomplete.init(this.$refs.autocomplete, {
      minLength: 2,
      data: list,
      onAutocomplete: this.onAutocomplete,
    })
    this.setRecipeTitle()
    this.updateTextField()
  },
  props: ['value'],
  watch: {
    value() {
      if (!this.value) {
        this.recipe = ''
        return
      }
      this.setRecipeTitle()
    },
  },
}
</script>

<style></style>
