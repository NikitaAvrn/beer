<template>
  <div class="center">
    <div class="preloader-wrapper active">
      <div class="spinner-layer" :class="color">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div>
        <div class="gap-patch">
          <div class="circle"></div>
        </div>
        <div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    color() {
      const colors = ['red', 'yellow', 'green', 'blue']
      const rnd = Math.round(Math.random() * colors.length)
      return 'spinner-' + colors[rnd] + '-only'
    },
  },
}
</script>

<style></style>
