<template>
  <div id="user-layout">
    <nav>
      <div class="nav-wrapper">
        <a href="#" class="brand-logo black-text">&#127867; beer.mel16bit.ru</a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li>
            <router-link class="black-text" tag="a" to="/login">Авторизация<i class="fa fa-right-to-bracket right"></i></router-link>
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
          © 2022 Averyanov.xyz
          <a class="black-text right" :href="mailto"><i class="fa fa-envelope"></i> Написать автору</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  computed: {
    mailto() {
      const email = 'aloneshooter@mail.ru'
      const subject = 'Письмо с сайта Пивные рецепты'
      const body = `\tЗдавствуйте, Никита!\r\r\r-------------\rДата отправки ${new Date().toLocaleDateString('ru-RU')}`
      return `mailto:${email}?subject=${subject}&body=${encodeURIComponent(body)}`
    },
  },
  metaInfo: {
    title: 'Пивные рецепты',
  },
}
</script>

<style></style>
