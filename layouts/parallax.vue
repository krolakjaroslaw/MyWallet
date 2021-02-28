<template>
  <v-app>
    <Navbar :primary-on-scroll="400" />
    <v-main>
      <nuxt />
    </v-main>
    <Footer :bg-color="color" />
  </v-app>
</template>

<script>
export default {
  name: 'Parallax',
  computed: {
    color () {
      return ['/login', '/sign-up'].includes(this.$route.path) ? 'transparent' : 'black'
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
