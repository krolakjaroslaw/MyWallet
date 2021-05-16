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

    <v-row class="my-0">
      <v-col
        cols="6"
        class="py-0 mx-auto"
      >
        <v-text-field
          v-model="product"
          label="Product"
          type="text"
          readonly
          dense
        />
      </v-col>
    </v-row>

    <v-row class="my-0">
      <v-col
        cols="6"
        class="py-0 mx-auto"
      >
        <v-text-field
          v-model="date"
          label="Date"
          readonly
        />
      </v-col>
    </v-row>

    <v-row class="my-0">
      <v-col
        cols="6"
        class="py-0 mx-auto"
      >
        <v-text-field
          v-model="number"
          label="Number"
          type="number"
          class="mt-2"
          readonly
          dense
        />
      </v-col>
    </v-row>

    <v-row class="my-0">
      <v-col
        cols="6"
        class="py-0 mx-auto"
      >
        <v-text-field
          v-model="price"
          label="Price"
          type="number"
          readonly
          dense
        />
      </v-col>
    </v-row>

    <v-row class="my-0">
      <v-col
        cols="6"
        class="py-0 mx-auto"
      >
        <v-text-field
          v-model="commission"
          label="Commission"
          type="number"
          readonly
          dense
        />
      </v-col>
    </v-row>

    <v-row class="my-0">
      <v-col
        cols="6"
        class="py-0 mx-auto"
      >
        <v-text-field
          v-model="amount"
          label="Amount"
          type="number"
          readonly
          dense
        />
      </v-col>
    </v-row>

    <v-row class="my-0">
      <v-col
        cols="6"
        class="py-0 mx-auto"
      >
        <v-textarea
          label="Comment"
          rows="3"
          auto-grow
          disabled
          outlined
          no-resize
          clearable
          readonly
          dense
        />
      </v-col>
    </v-row>
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
    amount () {
      return parseFloat(this.number) * parseFloat(this.price) + parseFloat(this.commission)
    },
    comment () { return this.getComment() },
    commission () { return this.getCommission() },
    date () { return this.getDate() },
    number () { return this.getNumber() },
    price () { return this.getPrice() },
    product () { return this.getProduct() },
    wallet () { return this.getWallet() }
  },
  methods: {
    ...mapGetters('wallets/operate-product', [
      'getComment',
      'getCommission',
      'getDate',
      'getGroup',
      'getNumber',
      'getPrice',
      'getProduct',
      'getWallet'
    ])
  }
}
</script>

<style scoped>

</style>
