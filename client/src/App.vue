<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import AdminLayout from './layouts/AdminLayout.vue'
import UserLayout from './layouts/UserLayout.vue'
import LoginLayout from './layouts/LoginLayout.vue'

export default {
  components: {
    AdminLayout,
    UserLayout,
    LoginLayout,
  },
  computed: {
    ...mapGetters(['MESSAGE', 'ERR_MESSAGE', 'SCS_MESSAGE']),
    layout() {
      return (this.$route.meta.layout || 'login') + '-layout'
    },
  },
  data: () => ({}),
  name: 'AppStart',
  methods: {
    ...mapMutations(['CLR_MESSAGES']),
  },
  watch: {
    MESSAGE() {
      if (this.MESSAGE) {
        this.$message('<span class="blue-text"><i class="fa fa-circle-info"></i>&nbsp;<b>' + this.MESSAGE + '</b></span>')
        this.CLR_MESSAGES()
      }
    },
    ERR_MESSAGE() {
      if (this.ERR_MESSAGE) {
        this.$message('<span class="red-text"><i class="fa fa-circle-xmark"></i>&nbsp;<b>' + this.ERR_MESSAGE + '</b></span>')
        this.CLR_MESSAGES()
      }
    },
    SCS_MESSAGE() {
      if (this.SCS_MESSAGE) {
        this.$message('<span class="green-text text-accent-4"><i class="fa fa-circle-check"></i>&nbsp;<b>' + this.SCS_MESSAGE + '</b></span>')
        this.CLR_MESSAGES()
      }
    },
  },
}
</script>

<style lang="scss">
/* @import '~materialize-css/dist/css/materialize.min.css'; */
@import '~materialize-css/sass/components/color-variables';
$primary-color: color('amber', 'lighten-1') !default;
$secondary-color: color('deep-purple', 'lighten-2') !default;
@import '~materialize-css/sass/materialize';
</style>

<style>
@import 'assets/style.css';
</style>
