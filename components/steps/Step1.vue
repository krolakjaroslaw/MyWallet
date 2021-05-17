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
          label="Wallet"
          class="select"
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
        <!--TODO: selling product (check if wallet has this product)-->
        <v-select
          v-model="group"
          :items="groups"
          label="Group"
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
        <!--TODO: select with search-->
        <!--TODO: selling product (check if wallet has this product)-->
        <v-select
          v-model="product"
          :items="products"
          item-text="symbol"
          label="Product"
          class="select"
          :disabled="['Deposit', 'Real_Estate', 'Time_Deposit'].includes(group)"
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
import { mapGetters, mapMutations } from 'vuex'

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
      this.$nuxt.$emit('isValid', false)
      // TODO: move to store
      if (this.group === 'Commodity') {
        const products = await this.$backend.products.getCommoditySymbols()
        this.products = products.data
      }
      if (this.group === 'Currency') {
        const products = await this.$backend.products.getCurrencySymbols()
        this.products = products.data
      }
      if (this.group === 'ETF_GPW') {
        const products = await this.$backend.products.getETFSymbols()
        this.products = products.data
      }
      if (this.group === 'Stock_GPW') {
        const products = await this.$backend.products.getStockSymbols()
        this.products = products.data
      }

      if (this.wallet && !!this.group && ['Deposit', 'Real_Estate', 'Time_Deposit'].includes(this.group)) {
        this.product = null
        this.$nuxt.$emit('isValid', true)
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
      this.$nuxt.$emit('isValid', false)
      if (this.wallet && !!this.group && ['Deposit', 'Real_Estate', 'Time_Deposit'].includes(this.group)) {
        this.product = null
        this.$nuxt.$emit('isValid', true)
      }
      if (this.wallet && this.group && this.product) this.$nuxt.$emit('isValid', true)
      this.resetStep2State()
    }
  },
  methods: {
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

<style lang="scss" scoped>

</style>
