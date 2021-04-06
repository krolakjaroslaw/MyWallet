<template>
  <div>
    <v-row class="mt-10">
      <v-col
        cols="6"
        class="py-0 mx-auto"
      >
        <v-select
          v-model="type"
          :items="types"
          item-text="name"
          label="Type"
          class="select"
          dense
          rounded
          outlined
          return-object
        />
      </v-col>
    </v-row>

    <v-row>
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
        <v-select
          v-model="group"
          :items="groups"
          item-text="name"
          label="Group"
          class="select mt-2"
          dense
          rounded
          outlined
          return-object
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col
        cols="6"
        class="py-0 mx-auto"
      >
        <v-select
          v-model="product"
          :items="products"
          item-text="name"
          label="Product"
          class="select"
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
export default {
  name: 'Step1',
  data () {
    return {
      group: '',
      product: '',
      type: 'Wallets',
      wallet: '',
      groups: [],
      products: [],
      types: [
        'Wallets', 'Master wallets'
      ],
      wallets: [
        {
          name: 'Wallet 1',
          sum: 100000.00,
          currencies: 45000.00,
          resources: 20000.00,
          stock: 35000.00
        },
        {
          name: 'Wallet 2',
          sum: 100000.00,
          currencies: 45000.00,
          resources: 20000.00,
          stock: 35000.00
        },
        {
          name: 'Wallet 3',
          sum: 100000.00,
          currencies: 45000.00,
          resources: 20000.00,
          stock: 35000.00
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
