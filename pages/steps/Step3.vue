<template>
  <div>
    <v-row class="my-0">
      <v-col
        cols="6"
        class="py-0 mx-auto"
      >
        <v-text-field
          v-model="wallet"
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
          v-model="dateFormatted"
          label="Date"
          readonly
          @blur="date = parseDate(dateFormatted)"
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
export default {
  name: 'Step3',
  data: vm => ({
    comment: 'comment',
    wallet: 'Wallet1',
    product: 'EUR/PLN',
    number: 0,
    price: 0,
    commission: 0,
    date: new Date().toISOString().substr(0, 10),
    dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    menu: false
  }),

  computed: {
    amount () {
      return parseFloat(this.number) * parseFloat(this.price) + parseFloat(this.commission)
    }
  },

  watch: {
    date (val) {
      this.dateFormatted = this.formatDate(this.date)
    }
  },

  methods: {
    formatDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    },

    parseDate (date) {
      if (!date) return null

      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    }
  }
}
</script>

<style scoped>

</style>
