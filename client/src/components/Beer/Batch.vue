<template>
  <div class="row">
    <div class="col s12" v-if="BATCH && RECIPE">
      <blockquote>
        <p>Рецепт пива: «{{ RECIPE.title }}»</p>
        <p>
          Варка: {{ BATCH.dateStart | date }} <br />
          Брожение: {{ BATCH.dateFermentation | date }} <br />
          <span v-show="BATCH.clarification">Осветление: {{ BATCH.clarification }} <br /></span>
          Карбонизация: {{ BATCH.dateCorbonization | date }} <br />
          Розлив: {{ BATCH.dateBottling | date }} <br />
          Готово: {{ BATCH.dateReady | date }} <br />
          Cрок годности: {{ BATCH.dateFinish | date }}
        </p>
        <p>
          Заторная вода: {{ BATCH.waterStart }} <br />
          Промывочная вода: {{ BATCH.waterWash }} <br />
          Объём готового пива: {{ BATCH.volume }} <br />
          Солод: {{ BATCH.malt }} <br />
          Праймер: {{ BATCH.primer }}
        </p>
        <p>Дополнительная информация: {{ BATCH.comment }}</p>
      </blockquote>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['BATCH', 'RECIPE']),
  },
}
</script>

<style></style>
