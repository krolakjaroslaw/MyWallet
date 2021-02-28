<template>
  <v-app>
    <Navbar :primary-on-scroll="400" />
    <v-main>
      <nuxt />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
export default {
  name: 'Welcome'
}
</script>

<style lang="scss" scoped>

</style>
