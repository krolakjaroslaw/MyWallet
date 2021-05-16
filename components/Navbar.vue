<template>
  <v-app-bar
    :color="bgColor"
    class="navbar-container"
    dense
    flat
    fixed
    dark
  >
<!--    <v-app-bar-nav-icon-->
<!--      @click="drawer = true"-->
<!--    />-->
    <v-btn
      icon
      @click="$router.go(-1)"
    >
      <v-icon>mdi-chevron-left</v-icon>
    </v-btn>

    <v-spacer />

    <v-btn
      plain
      @click="$router.push({name: 'dashboard'})"
    >
      Dashboard
    </v-btn>

    <v-btn
      plain
      @click="$router.push({name: 'wallets'})"
    >
      Wallets
    </v-btn>

    <v-btn
      plain
      @click="$router.push({name: '/'})"
    >
      Operations
    </v-btn>

    <v-btn
      plain
      @click="$router.push({name: '/'})"
    >
      Stock
    </v-btn>

    <v-btn
      plain
      @click="$router.push({name: '/'})"
    >
      About
    </v-btn>

    <v-spacer />

    <v-btn
      v-if="logged"
      plain
      @click="$router.push({ name: 'user-profile' })"
    >
      <v-icon left>
        mdi-account
      </v-icon>
      {{ username }}
    </v-btn>

    <v-btn
      plain
      @click="logged ? signOut() : $router.push({ name: 'sign-in' })"
    >
      {{ logged ? 'Logout' : 'Login' }}
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

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
    },
    logged () {
      return this.getCurrentUser()
    },
    username () {
      return this.getCurrentUser().username
    }
  },
  mounted () {
    document.addEventListener('scroll', this.scrollListener)
  },
  beforeDestroy () {
    document.removeEventListener('scroll', this.scrollListener)
  },
  methods: {
    ...mapActions('authorization', ['logout']),
    ...mapGetters('authorization', ['getCurrentUser']),
    signOut () {
      this.logout()
      this.$router.push({ name: 'sign-in' })
    },
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
