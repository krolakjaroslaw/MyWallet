<template>
  <v-app-bar
    :color="bgColor"
    class="navbar-container"
    dense
    flat
    fixed
    dark
  >
    <v-app-bar-nav-icon
      @click="drawer = true"
    />

    <v-spacer />

    <v-btn
      plain
      @click="$router.push({name: '/profile'})"
    >
      Profile
    </v-btn>

    <v-btn
      plain
      @click="$router.push({name: '/'})"
    >
      Investments
    </v-btn>

    <v-btn
      plain
      @click="$router.push({name: '/'})"
    >
      About
    </v-btn>

    <v-spacer />

    <v-btn
      plain
      @click="$router.push({name: '/login'})"
    >
      <v-icon left>
        mdi-account
      </v-icon>
      Login
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: 'Header',
  props: {
    primaryOnScroll: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      currentScrollValue: 0,
      drawer: false
    }
  },
  computed: {
    bgColor () {
      return this.currentScrollValue < this.primaryOnScroll
        ? 'transparent'
        : 'primary'
    }
  },
  mounted () {
    document.addEventListener('scroll', this.scrollListener)
  },
  beforeDestroy () {
    document.removeEventListener('scroll', this.scrollListener)
  },
  methods: {
    handleScroll () {
      this.currentScrollValue = document.body.scrollTop || document.documentElement.scrollTop
    },
    scrollListener () {
      this.handleScroll()
    }
  }
}
</script>

<style lang="scss">
.navbar-container {
  height: 64px !important;

  .v-toolbar__content {
    left: 0;
    margin: 0 auto;
    max-width: 1200px;
    padding: 32px 0;
    position: absolute;
    right: 0;
    top: 0;
  }
}
</style>
