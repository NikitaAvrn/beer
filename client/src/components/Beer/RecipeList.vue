<template>
  <ul class="collapsible" ref="collapsible">
    <li>
      <div class="collapsible-header">Солод</div>
      <div class="collapsible-body">
        <p v-for="malt in RECIPE.malt" :key="malt.id">
          Солод: {{ malt.maltTitle }} <br />
          Внесение: {{ malt.entry }} <br />
          Вес: {{ malt.weight }} кг.
        </p>
      </div>
    </li>
    <li>
      <div class="collapsible-header">Хмель</div>
      <div class="collapsible-body">
        <p v-for="hop in RECIPE.hop" :key="hop.id">
          Хмель: {{ hop.hopTitle }} <br />
          Вес: {{ hop.weight }} г.<br />
          Альфа: {{ hop.alpha }} %<br />
          Внесение: {{ hop.entry }} <br />
          <span v-show="hop.time || hop.time == 0">Время: {{ hop.time }} мин.</span>
        </p>
      </div>
    </li>
    <li>
      <div class="collapsible-header">Дрожжи</div>
      <div class="collapsible-body">
        <p v-for="yeast in RECIPE.yeast" :key="yeast.id">
          Дрожжи: {{ yeast.yeastTitle }} <br />
          Температура брожения: {{ yeast.temperature }} ˚C <br />
          Тип: {{ yeast.fermentation }}
        </p>
      </div>
    </li>
    <li>
      <div class="collapsible-header">Другие ингредиенты</div>
      <div class="collapsible-body">
        <p v-for="other in RECIPE.otherIngredient" :key="other.id">
          Ингредиент: {{ other.otherTitle }} <br />
          Вес: {{ other.weight }} кг. <br />
          Внесение: {{ other.entry }} <br />
          <span v-show="other.time">Время: {{ other.time }} мин.</span>
        </p>
      </div>
    </li>
    <li>
      <div class="collapsible-header">Температурные паузы</div>
      <div class="collapsible-body">
        <p v-for="pause in RECIPE.pauseTemp" :key="pause.id">
          Пауза: {{ pause.name }} <br />
          Нагрев: {{ pause.heat }} <br />
          Температура: {{ pause.temperature }} ˚C <br />
          Продолжительность: {{ pause.time }} мин.
        </p>
      </div>
    </li>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  beforeDestroy() {
    if (this.collapsible && this.collapsible.destroy) {
      this.collapsible.destroy()
    }
  },
  computed: {
    ...mapGetters(['RECIPE']),
  },
  data: () => ({
    collapsible: null,
  }),
  mounted() {
    this.collapsible = M.Collapsible.init(this.$refs.collapsible, {})
  },
}
</script>

<style></style>
