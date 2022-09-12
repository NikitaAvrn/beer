export default {
  install(Vue, options) {
    Vue.prototype.$message = function(html) {
      M.toast({html})
    }
  }
}