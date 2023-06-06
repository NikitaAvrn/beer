<template>
  <div class="row mt1">
    <div class="col s12">
      <ul class="tabs" ref="tabs">
        <li class="tab"><a href="#batch">Партия</a></li>
        <li class="tab"><a href="#reviews">Отзывы</a></li>
      </ul>
    </div>
    <div id="batch" class="col s12">
      <div class="row">
        <form class="col s12 mt1" v-if="BATCH" ref="form">
          <autocomplete-recipe v-model="BATCH.recipe" aria-required="true"></autocomplete-recipe>
          <div class="row">
            <div class="input-field col s12 m4">
              <input id="date-start" v-model="BATCH.dateStart" type="date" class="validate" required />
              <label for="date-start">Варка</label>
            </div>
            <div class="input-field col s12 m4">
              <input id="date-fermentation" v-model="BATCH.dateFermentation" type="date" class="validate" required />
              <label for="date-fermentation">Начало брожения</label>
            </div>
            <div class="input-field col s12 m4">
              <input id="date-corbonization" v-model="BATCH.dateCorbonization" type="date" class="validate" required />
              <label for="date-corbonization">Начало карбонизации</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12 m4">
              <input id="date-bottling" v-model="BATCH.dateBottling" type="date" class="validate" required />
              <label for="date-bottling">Розлив</label>
            </div>
            <div class="input-field col s12 m4">
              <input id="date-ready" v-model="BATCH.dateReady" type="date" class="validate" required />
              <label for="date-ready">Готовность пива</label>
            </div>
            <div class="input-field col s12 m4">
              <input id="date-finish" v-model="BATCH.dateFinish" type="date" class="validate" required />
              <label for="date-finish">Срок годности</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12 m4">
              <input id="malt" v-model="BATCH.malt" type="text" class="validate" required />
              <label for="malt">Количество солода (кг.)</label>
            </div>
            <div class="input-field col s12 m4">
              <input id="primer" v-model="BATCH.primer" type="text" class="validate" required />
              <label for="primer">Количество праймера</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12 m4">
              <input id="water-start" v-model="BATCH.waterStart" type="text" class="validate" required />
              <label for="water-start">Заторная вода (л.)</label>
            </div>
            <div class="input-field col s12 m4">
              <input id="water-wash" v-model="BATCH.waterWash" type="text" class="validate" required />
              <label for="water-wash">Промывочная вода (л.)</label>
            </div>
            <div class="input-field col s12 m4">
              <input id="volume" v-model="BATCH.volume" type="text" class="validate" required />
              <label for="volume">Конечный объем (л.)</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input id="clarification" v-model="BATCH.clarification" type="text" />
              <label for="clarification">Осветление</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <textarea id="comment" v-model="BATCH.comment" class="materialize-textarea" ref="comment"></textarea>
              <label for="comment">Дополнительная информация</label>
            </div>
          </div>
          <div class="right">
            <button class="btn waves-effect white green-text text-darken-1 mb1 mt1" @click.prevent="saveBtnClick">
              <i class="fa fa-save left"></i>Сохранить
            </button>
          </div>
        </form>
      </div>
    </div>
    <div id="reviews" class="col s12">
      <reviews-batch v-if="BATCH"></reviews-batch>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import AutocompleteRecipe from '../components/Autocomplete/AutocompleteRecipe.vue'
import ReviewsBatch from '../components/ReviewsBatch.vue'
import validate from '../mixins/validate.mixin'

export default {
  beforeDestroy() {
    if (this.tabs && this.tabs.destroy) {
      this.tabs.destroy()
    }
  },
  components: { AutocompleteRecipe, ReviewsBatch },
  computed: {
    ...mapGetters(['BATCH']),
  },
  data: () => ({
    tabs: null,
  }),
  methods: {
    ...mapActions(['getBatchOfBeerById', 'postBatchOfBeer', 'putBatchOfBeer', 'getReviewList']),
    ...mapMutations(['CLR_BATCH']),
    async saveBtnClick() {
      if (!this.validateForm()) {
        return
      }

      if (this.BATCH.id) {
        this.putBatchOfBeer(this.BATCH)
      } else {
        await this.postBatchOfBeer(this.BATCH)
        this.$router.push(`/batch-of-beer/${this.BATCH.id}`)
      }
    },
    updateTextFields() {
      setTimeout(() => {
        M.updateTextFields()
      }, 0)
    },
  },
  mixins: [validate],
  async mounted() {
    this.tabs = M.Tabs.init(this.$refs.tabs, {})
    //M.textareaAutoResize(this.$refs.comment)

    if (this.$route.params.id) {
      await this.getBatchOfBeerById(this.$route.params.id)
      await this.getReviewList(this.BATCH.id)
    } else {
      this.CLR_BATCH()
    }
  },
  name: 'Beer',
  updated() {
    this.updateTextFields()
    M.textareaAutoResize(this.$refs.comment)
  },
}
</script>
