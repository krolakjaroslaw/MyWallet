<!--suppress JSUnresolvedVariable -->
<template>
  <div>
    <v-form v-model="valid">
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
                :rules="[
                  $rules.required
                ]"
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
            :rules="[
              $rules.required,
              $rules.greaterThan(0)
            ]"
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
            :rules="[
              $rules.required,
              $rules.greaterThan(0)
            ]"
            outlined
            rounded
            dense
          />
        </v-col>

        <v-col cols="1">
          <v-btn
            color="primary"
            :disabled="!date || number === 0"
            rounded
            @click="verify"
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
            :rules="[
              $rules.required,
              $rules.greaterThanEquals(0)
            ]"
            outlined
            rounded
            dense
          />
        </v-col>
      </v-row>
    </v-form>

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
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Step2',
  data () {
    return {
      valid: true,
      menu: false
    }
  },
  computed: {
    amount () {
      return parseFloat(this.number) * parseFloat(this.price) + parseFloat(this.commission)
    },
    comment: {
      get () { return this.getComment() },
      set (val) { this.setComment(val) }
    },
    commission: {
      get () { return this.getCommission() },
      set (val) { this.setCommission(val) }
    },
    date: {
      get () { return this.getDate() },
      set (val) { this.setDate(val) }
    },
    dateFormatted: {
      get () { return this.formatDate(this.date) },
      set (val) { this.date = this.parseDate(val) }
    },
    number: {
      get () { return this.getNumber() },
      set (val) { this.setNumber(val) }
    },
    price: {
      get () { return this.getPrice() },
      set (val) { this.setPrice(val) }
    }
  },
  watch: {
    date () {
      this.dateFormatted = this.formatDate(this.date)
      if (this.date && this.number > 0 && this.price > 0) this.$emit('isValid')
    },
    number () {
      if (this.date && this.number > 0 && this.price > 0) this.$emit('isValid')
    },
    price () {
      if (this.date && this.number > 0 && this.price > 0) this.$emit('isValid')
    }
  },
  methods: {
    ...mapGetters('wallets/operate-product', ['getComment', 'getCommission', 'getDate', 'getNumber', 'getPrice']),
    ...mapMutations('wallets/operate-product', ['setComment', 'setCommission', 'setDate', 'setNumber', 'setPrice']),

    formatDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    },

    parseDate (date) {
      if (!date) return null

      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
    verify () {
      // TODO: implement
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
