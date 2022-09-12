<template>
  <div class="mt1">
    <div class="row">
      <div class="col s12">
        <ul class="tabs" ref="panel">
          <li v-for="tab in tabs" :key="tab.id" class="tab">
            <a :href="'#' + tab.id"><i v-show="false" :class="'left fa fa-' + tab.icon"></i>{{ tab.title }}</a>
          </li>
        </ul>
      </div>
      <div v-for="tab in tabs" :key="tab.id" :id="tab.id" class="col s12">
        <component :is="tab.id" :ref="tab.id"></component>
      </div>
    </div>
    <div class="row">
      <div class="col s12">
        <button class="btn waves-effect white green-text text-darken-1 right mb1" @click="saveBtnClick"><i class="fa fa-save left"></i>Сохранить</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import General from '../components/BeerRecipe/General.vue'
import Malt from '../components/BeerRecipe/Malt.vue'
import Hop from '../components/BeerRecipe/Hop.vue'
import Yeast from '../components/BeerRecipe/Yeast.vue'
import OtherIngredients from '../components/BeerRecipe/OtherIngredients.vue'
import TemperaturePauses from '../components/BeerRecipe/TemperaturePauses.vue'

export default {
  beforeDestroy() {
    if (this.panel && this.panel.destroy) {
      this.panel.destroy()
    }
  },
  computed: {
    ...mapGetters(['RECIPE']),
  },
  components: {
    General,
    Malt,
    Hop,
    Yeast,
    OtherIngredients,
    TemperaturePauses,
  },
  data: () => ({
    panel: null,
    tabs: [
      {
        title: 'Общие',
        icon: 'info',
        id: 'general',
      },
      {
        title: 'Солод',
        icon: 'wheat-awn',
        id: 'malt',
      },
      {
        title: 'Другие инредиенты',
        icon: 'bowl-rice',
        id: 'other-ingredients',
      },
      {
        title: 'Хмель',
        icon: 'spa',
        id: 'hop',
      },
      {
        title: 'Дрожжи',
        icon: 'bread-slice',
        id: 'yeast',
      },
      {
        title: 'Температурные паузы',
        icon: 'temperature-high',
        id: 'temperature-pauses',
      },
    ],
  }),
  methods: {
    ...mapActions(['getBeerRecipeById', 'postBeerRecipe', 'putBeerRecipe']),
    ...mapMutations(['CLR_RECIPE']),
    async saveBtnClick() {
      if (!this.$refs.general[0].validateForm()) {
        return
      }
      if (this.RECIPE.id && this.$route.params.id) {
        this.putBeerRecipe(this.RECIPE)
      } else {
        const recipeId = await this.postBeerRecipe(this.RECIPE)
        this.$router.push(`/beer-recipe/${recipeId.id}`)
      }
    },
  },
  async mounted() {
    this.id = this.$route.params.id
    if (this.$route.params.id) {
      await this.getBeerRecipeById(this.$route.params.id)
    } else {
      this.CLR_RECIPE()
    }

    this.panel = M.Tabs.init(this.$refs.panel, {})
    if (this.panel) {
      this.panel.select(this.tabs[0].id)
    }

    setTimeout(() => {
      M.updateTextFields()
    }, 0)
  },
  name: 'BeerRecipe',
}
</script>
