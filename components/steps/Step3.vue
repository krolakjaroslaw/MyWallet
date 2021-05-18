<template>
  <div>
    <v-row class="my-0">
      <v-col
        cols="6"
        class="py-0 mx-auto"
      >
        <v-text-field
          v-model="wallet.name"
          class="mt-4"
          label="Wallet"
          type="text"
          readonly
          dense
        />
      </v-col>
    </v-row>

    <v-row
      v-if="!['DEPOSIT', 'REAL_ESTATE', 'TIME_DEPOSIT'].includes(group)"
      class="my-0"
    >
      <v-col
        cols="6"
        class="py-0 mx-auto"
      >
        <v-text-field
          v-model="product.symbol"
          label="Product"
          type="text"
          readonly
          dense
        />
      </v-col>
    </v-row>

    <AddDepositAccountProduct v-if="group === 'DEPOSIT'" />
    <AddRealEstateProduct v-else-if="group === 'REAL_ESTATE'" />
    <AddTimeDepositProduct v-else-if="group === 'TIME_DEPOSIT'" />
    <AddInvestmentProduct v-else />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Step3',
  data () {
    return {
      menu: false
    }
  },
  computed: {
    group () { return this.getGroup() },
    product () { return this.getProduct() },
    wallet () { return this.getWallet() }
  },
  methods: {
    ...mapGetters('wallets/operate-product', ['getGroup', 'getProduct', 'getWallet'])
  }
}
</script>

<style scoped>

</style>
