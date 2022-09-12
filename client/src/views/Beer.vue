<template>
  <div>
    <h3 v-if="RECIPE">
      <span class="hide-on-small-only">Пиво </span>«{{ RECIPE.title }}» <small class="hide-on-small-only">{{ BATCH.dateStart | date }}</small>
    </h3>
    <div class="row" v-if="BATCH && RECIPE">
      <div class="col s12 m3">
        <div class="collection">
          <a v-for="block in blocks" :key="block.component" href="#!" @click="selectTab(block)" class="collection-item" :class="{ active: block.active }">{{
            block.title
          }}</a>
        </div>
      </div>
      <div class="col s12 m9">
        <div v-for="block in blocks" :key="block.component" :id="block.component" :class="{ hide: !block.active }">
          <component :is="block.component"></component>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Batch from '../components/Beer/Batch.vue'
import Recipe from '../components/Beer/Recipe.vue'
import Reviews from '../components/Beer/Reviews.vue'

export default {
  name: 'Beer',
  components: { Reviews, Recipe, Batch },
  computed: {
    ...mapGetters(['RECIPE', 'BATCH']),
  },
  data: () => ({
    batch: Batch,
    reviews: Reviews,
    recipe: Recipe,
    blocks: [
      { title: 'Партия пива', component: 'batch', icon: '', active: true },
      { title: 'Рецепт', component: 'recipe', icon: '', active: false },
      { title: 'Отзывы', component: 'reviews', icon: '', active: false },
    ],
  }),
  methods: {
    ...mapActions(['getBatchOfBeerByCode', 'getBeerRecipeById']),
    selectTab(block) {
      this.blocks.forEach((block) => {
        block.active = false
      })
      block.active = true
    },
  },
  async mounted() {
    if (!this.$route.params.code) {
      this.$router.push('/login')
    }
    await this.getBatchOfBeerByCode(this.$route.params.code)
    await this.getBeerRecipeById(this.BATCH.recipe)
  },
}
</script>
