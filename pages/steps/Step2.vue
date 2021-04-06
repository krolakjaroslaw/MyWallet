<template>
  <div>
    <v-row class="my-0">
      <v-col
        cols="6"
        class="py-0 mx-auto"
      >
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
        >
          <template #activator="{ on, attrs }">
            <v-text-field
              v-model="dateFormatted"
              hint="MM/DD/YYYY"
              prepend-icon="mdi-calendar"
              label="Date"
              persistent-hint
              v-bind="attrs"
              v-on="on"
              @blur="date = parseDate(dateFormatted)"
            />
          </template>
          <v-date-picker
            v-model="date"
            no-title
            @input="menu = false"
          />
        </v-menu>
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
          outlined
          rounded
          dense
        />
      </v-col>
    </v-row>

    <v-row class="my-0">
      <v-col cols="3" />

      <v-col cols="5">
        <v-text-field
          v-model="price"
          label="Price"
          type="number"
          outlined
          rounded
          dense
        />
      </v-col>

      <v-col cols="1">
        <v-btn
          color="primary"
          :disabled="!date"
          rounded
        >
          Verify
        </v-btn>
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
          outlined
          rounded
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
          disabled
          outlined
          rounded
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
          v-model="comment"
          label="Comment"
          rows="3"
          auto-grow
          outlined
          no-resize
          clearable
          rounded
          dense
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'Step2',
  data: vm => ({
    comment: '',
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

<style lang="scss" scoped>

</style>
