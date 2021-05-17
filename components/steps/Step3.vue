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
      v-if="!['Deposit', 'Real_Estate', 'Time_Deposit'].includes(group)"
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

    <AddDepositAccountProduct v-if="group === 'Deposit'" />
    <AddRealEstateProduct v-else-if="group === 'Real_Estate'" />
    <AddTimeDepositProduct v-else-if="group === 'Time_Deposit'" />
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
