<template>
  <div class="row">
    <div class="col s12" v-if="RECIPE">
      <blockquote>
        <p>
          Название: {{ RECIPE.title }} <br />
          Эффективность варки: {{ RECIPE.efficiency }}% <br />
          Время кипячения: {{ RECIPE.boil }} мин. <br />
          Гидромодуль: {{ RECIPE.hydromodule }} <br />
          Начальная плотность: {{ RECIPE.startExtractivity }}% <br />
          Конечная плотность: {{ RECIPE.finishExtractivity }}% <br />
          Объём этилового спирта: {{ RECIPE.abv }}% <br />
          Горечь: {{ RECIPE.ibu }} IBU
        </p>
        <p>
          Праймер: {{ RECIPE.primer }} <br />
          Температура брожения: {{ RECIPE.temperature }}˚C <br />
          Процент СО<sub>2</sub>: {{ RECIPE.co2 }}%
        </p>
        <p>Дополнительная информация: {{ RECIPE.description }}</p>
      </blockquote>
      <blockquote>
        <recipe-list></recipe-list>
      </blockquote>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import RecipeList from './RecipeList.vue'

export default {
  components: { RecipeList },
  computed: {
    ...mapGetters(['RECIPE']),
  },
  data: () => ({}),
}
</script>

<style></style>
