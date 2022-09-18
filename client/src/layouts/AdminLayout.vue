<template>
  <div id="admin-layout">
    <ul id="directory-dropdown" class="dropdown-content">
      <router-link v-for="route in directory" :key="route.url" :to="route.url" active-class="active" tag="li"
        ><a href="#!" class="black-text"><i v-show="route.icon" :class="'left fa fa-' + route.icon"></i>{{ route.title }}</a></router-link
      >
    </ul>
    <nav>
      <div class="nav-wrapper">
        <a href="#" class="brand-logo black-text">beer.mel16bit.ru</a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <router-link v-for="route in routes" :key="route.url" tag="li" :to="route.url" active-class="active"
            ><a href="#!" class="black-text">{{ route.title }}<i v-show="route.icon" :class="'right fa fa-' + route.icon"></i></a
          ></router-link>
          <li>
            <a class="dropdown-trigger black-text" href="#!" data-target="directory-dropdown" ref="directory">Справочники<i class="right fa fa-book"></i></a>
          </li>
          <li>
            <a href="#!" class="black-text" @click.prevent="logout"><i class="right fa fa-right-from-bracket"></i>Выход</a>
          </li>
        </ul>
      </div>
    </nav>

    <main class="container">
      <router-view />
    </main>

    <footer class="page-footer">
      <div class="footer-copyright">
        <div class="container black-text">
          © 2022 beer.mel16bit.ru
          <a class="black-text right" v-if="AUTH" :href="mailto"><i class="fa fa-envelope"></i> {{ AUTH.name }}</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  beforeDestroy() {
    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy()
    }
  },
  computed: {
    ...mapGetters(['AUTH']),
    mailto() {
      const email = this.AUTH.email
      const subject = 'Письмо с сайта Пивные рецепты от ' + this.AUTH.name
      const body = `\tЗдавствуйте, ${this.AUTH.name}!\r\r\r---------------------------\rДата отправки ${new Date().toLocaleDateString('ru-RU')}`
      return `mailto:${email}?subject=${subject}&body=${encodeURIComponent(body)}`
    },
  },
  data: () => ({
    routes: [
      {
        url: '/batch-of-beer-list',
        title: 'Партия',
        icon: 'beer-mug-empty',
      },
      {
        url: '/beer-recipe-list',
        title: 'Рецепт',
        icon: 'plate-wheat',
      },
    ],
    directory: [
      {
        url: '/malt',
        title: 'Солод',
        icon: 'wheat-awn',
      },
      {
        url: '/hop',
        title: 'Хмель',
        icon: 'spa',
      },
      {
        url: '/yeast',
        title: 'Дрожжи',
        icon: 'bread-slice',
      },
      {
        url: '/other-ingredients',
        title: 'Другие ингридиенты',
        icon: 'wheat-awn-circle-exclamation',
      },
    ],
    dropdown: null,
  }),
  metaInfo: {
    title: 'Пивные рецепты [Панель администратора]',
  },
  methods: {
    ...mapMutations(['CLR_AUTH']),
    ...mapActions(['checkAutorization']),
    logout() {
      this.CLR_AUTH()
      this.$router.push('/login')
    },
  },
  async mounted() {
    this.dropdown = M.Dropdown.init(this.$refs.directory, {
      constrainWidth: false,
    })

    if (!(await this.checkAutorization())) {
      this.logout()
    }
  },
}
</script>

<style></style>
