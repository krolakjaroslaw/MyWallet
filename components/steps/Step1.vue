<!--suppress JSUnresolvedVariable -->
<template>
  <div>
    <v-row class="mt-10">
      <v-col
        cols="6"
        class="py-0 mx-auto"
      >
        <v-select
          v-model="wallet"
          :items="wallets"
          item-text="name"
          label="Portfel"
          class="select"
          :disabled="!!$route.params.id"
          dense
          rounded
          outlined
          return-object
        />
      </v-col>
    </v-row>

    <hr class="mt-6 mb-10">

    <v-row>
      <v-col
        cols="6"
        class="py-0 mx-auto"
      >
        <v-select
          v-model="group"
          :items="groups"
          label="Typ produktu"
          class="select mt-2"
          dense
          rounded
          outlined
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col
        cols="6"
        class="py-0 mx-auto"
      >
        <v-autocomplete
          v-model="product"
          :items="products"
          item-text="symbol"
          label="Produkt"
          class="select"
          :disabled="['DEPOSIT', 'REAL_ESTATE', 'TIME_DEPOSIT'].includes(group)"
          clearable
          dense
          rounded
          outlined
          return-object
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { CONSTANTS } from 'assets/constant/components'
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Step1',
  computed: {
    groups: {
      get () { return this.getGroups() },
      set (val) { this.setGroups(val) }
    },
    products: {
      get () { return this.getProducts() },
      set (val) { this.setProducts(val) }
    },
    wallets () { return this.getWallets() },

    group: {
      get () { return this.getGroup() },
      set (val) { this.setGroup(val) }
    },
    product: {
      get () { return this.getProduct() },
      set (val) { this.setProduct(val) }
    },
    wallet: {
      get () { return this.getWallet() },
      set (val) { this.setWallet(val) }
    }
  },
  watch: {
    async group () {
      const routeName = this.$route.name
      this.$nuxt.$emit('isValid', false)
      if (!CONSTANTS.depositRealEstateTimeDepositTypes.includes(this.group)) await this.loadProducts(routeName)

      if (this.wallet && this.group && CONSTANTS.depositRealEstateTimeDepositTypes.includes(this.group)) {
        this.product = null
        setTimeout(() => this.$nuxt.$emit('isValid', true), 100)
      }
      if (this.wallet && this.group && this.product) this.$nuxt.$emit('isValid', true)
      this.resetStep2State()
    },
    product () {
      this.$nuxt.$emit('isValid', false)
      if (this.wallet && this.group && this.product) this.$nuxt.$emit('isValid', true)
      this.resetStep2State()
    },
    wallet () {
      if (this.$route.name === 'sell-product' && this.wallet) this.loadGroupsInWallet(this.wallet.id)
      else if (this.$route.name === 'buy-product') this.loadGroups()

      this.$nuxt.$emit('isValid', false)
      if (this.wallet && !!this.group && CONSTANTS.depositRealEstateTimeDepositTypes.includes(this.group)) {
        this.product = null
        this.$nuxt.$emit('isValid', true)
      }
      if (this.wallet && this.group && this.product) this.$nuxt.$emit('isValid', true)
      this.resetStep2State()
    }
  },
  created () {
    if (this.$route.params) this.wallet = this.wallets.filter(item => item.id === this.$route.params.id)[0]
  },
  methods: {
    ...mapActions('wallets/operate-product', ['loadGroups', 'loadGroupsInWallet', 'loadProducts']),
    ...mapGetters('wallets/operate-product', [
      'getGroup',
      'getGroups',
      'getProduct',
      'getProducts',
      'getWallet',
      'getWallets'
    ]),
    ...mapMutations('wallets/operate-product', [
      'resetStep2State',
      'setGroup',
      'setGroups',
      'setProduct',
      'setProducts',
      'setWallet'
    ])
  }
}
</script>
