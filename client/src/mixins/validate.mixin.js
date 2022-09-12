export default {
  methods: {
    validateForm() {
      const isValid = this.$refs.form.checkValidity()
      if (!isValid) {
        this.$refs.form.reportValidity()
      }
      return isValid
    } 
  }
}