<template>
  <v-app-bar
    :color="bgColor"
    class="navbar-container"
    dense
    flat
    fixed
    dark
  >
    <v-btn
      v-if="logged"
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
      Start
    </v-btn>

    <v-btn
      plain
      @click="$router.push({name: 'wallets'})"
    >
      Portfele
    </v-btn>

    <v-btn
      plain
      @click="$router.push({name: 'operations'})"
    >
      Operacje
    </v-btn>

    <v-btn
      plain
      @click="$router.push({name: 'stock'})"
    >
      Giełda
    </v-btn>

    <v-btn
      v-if="isAdmin"
      plain
      @click="$router.push({name: 'users'})"
    >
      Użytkownicy
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
      <v-icon left>
        mdi-logout
      </v-icon>
      {{ logged ? 'Wyloguj' : 'Zaloguj' }}
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
    isAdmin () {
      return this.getCurrentUser() && this.getIsAdmin()
    },
    logged () {
      console.log('logged', this.getCurrentUser())
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
    ...mapGetters('authorization', ['getCurrentUser', 'getIsAdmin']),
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
