<template>
  <div id="login-view">
    <div class="row">
      <div class="col s10 m4 offset-m4 offset-s1">
        <div class="card">
          <div class="card-content">
            <span class="card-title">Пивные рецепты <small>[Авторизация]</small></span>
            <div class="row">
              <form class="col s12" ref="form" @submit.prevent="submitHandler">
                <div class="row">
                  <div class="input-field col s12">
                    <input id="login" type="email" v-model="email" class="validate" required />
                    <label for="login">Логин</label>
                  </div>
                </div>
                <div class="row">
                  <div class="input-field col s12">
                    <input id="password" type="password" v-model="password" class="validate" required minlength="6" />
                    <label for="password">Пароль</label>
                  </div>
                </div>
                <div class="row">
                  <div class="col s12 center">
                    <button type="submit" class="btn waves-effect waves-light mt1">Войти<i class="fa fa-right-to-bracket right"></i></button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <!-- <div class="card-action center">
            <a href="#">Блог</a>
            <a href="#">Регистрация</a>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['AUTH']),
  },
  data: () => ({
    email: localStorage.getItem('loginEmail') || '',
    password: '',
  }),
  methods: {
    ...mapActions(['login']),
    async submitHandler() {
      await this.login({
        email: this.email,
        password: this.password,
      })
      if (this.AUTH) {
        localStorage.setItem('loginEmail', this.email)
        this.$router.push('/batch-of-beer-list')
      }
    },
  },
  mounted() {
    setTimeout(() => {
      M.updateTextFields()
    }, 0)
  },
  name: 'Login',
}
</script>
