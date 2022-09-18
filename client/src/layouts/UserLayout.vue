<template>
  <div id="user-layout">
    <nav>
      <div class="nav-wrapper">
        <a href="#" data-target="slide-out" class="sidenav-trigger"><i class="fa fa-bars black-text"></i></a>
        <a href="#" class="brand-logo black-text">&#127867; beer.mel16bit.ru</a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li>
            <router-link class="black-text" tag="a" to="/login">Авторизация<i class="fa fa-right-to-bracket right"></i></router-link>
          </li>
        </ul>
      </div>
    </nav>

    <ul id="slide-out" class="sidenav" ref="sidenav">
      <li>
        <router-link class="black-text" tag="a" to="/login"><i class="left fa fa-right-to-bracket"></i>Авторизация</router-link>
      </li>
    </ul>

    <main class="container">
      <router-view />
    </main>

    <footer class="page-footer">
      <div class="footer-copyright">
        <div class="container black-text">
          © 2022 beer.mel16bit.ru
          <a class="black-text right" :href="mailto"><i class="fa fa-envelope"></i> Написать автору</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  beforeDestroy() {
    if (this.sidenav && this.sidenav.destroy) {
      this.sidenav.destroy()
    }
  },
  computed: {
    mailto() {
      const email = 'aloneshooter@mail.ru'
      const subject = 'Письмо с сайта Пивные рецепты'
      const body = `\tЗдавствуйте, Никита!\r\r\r-------------\rДата отправки ${new Date().toLocaleDateString('ru-RU')}`
      return `mailto:${email}?subject=${subject}&body=${encodeURIComponent(body)}`
    },
  },
  data: () => ({
    sidenav: null,
  }),
  metaInfo: {
    title: 'Пивные рецепты',
  },
  mounted() {
    this.sidenav = M.Sidenav.init(this.$refs.sidenav, {})
  },
}
</script>

<style></style>
