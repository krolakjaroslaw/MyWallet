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
            v-if="stepper === 2"
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
          >
            <template #activator="{ on, attrs }">
              <v-text-field
                v-model="dateFormatted"
                label="Data"
                hint="MM/DD/YYYY"
                prepend-icon="mdi-calendar"
                :rules="[
                  $rules.required
                ]"
                persistent-hint
                v-bind="attrs"
                v-on="on"
                @blur="date = parseDate(dateFormatted)"
              />
            </template>
            <v-date-picker
              v-model="date"
              :max="new Date().toISOString().substr(0,10)"
              no-title
              @input="menu = false"
            />
          </v-menu>

          <v-text-field
            v-else-if="stepper === 3"
            v-model="date"
            label="Data"
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
            label="Liczba jednostek"
            type="number"
            class="mt-2"
            :rules="numberRules"
            :outlined="stepper === 2"
            :rounded="stepper === 2"
            :readonly="stepper === 3"
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
            label="Cena"
            type="number"
            :rules="[
              $rules.required,
              $rules.greaterThan(0)
            ]"
            :outlined="stepper === 2"
            :rounded="stepper === 2"
            :readonly="stepper === 3"
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
            label="Prowizja"
            type="number"
            :rules="[
              $rules.required,
              $rules.greaterThanEquals(0)
            ]"
            :outlined="stepper === 2"
            :rounded="stepper === 2"
            :readonly="stepper === 3"
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
          label="Kwota"
          type="number"
          :disabled="stepper === 2"
          :outlined="stepper === 2"
          :rounded="stepper === 2"
          :readonly="stepper === 3"
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
          label="Komentarz"
          rows="3"
          auto-grow
          no-resize
          clearable
          outlined
          :rounded="stepper === 2"
          :readonly="stepper === 3"
          dense
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'AddInvestmentProduct',
  data () {
    return {
      valid: true,
      menu: false
    }
  },
  computed: {
    amount () {
      return (parseFloat(this.number) * parseFloat(this.price) + parseFloat(this.commission)).toFixed(2)
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
    numberRules () {
      const rules = [
        this.$rules.required,
        this.$rules.greaterThan(0)
      ]
      if (this.$route.name === 'sell-product') rules.push(this.$rules.lowerThanEquals(this.product.numberOfUnits))
      return rules
    },
    price: {
      get () { return this.getPrice() },
      set (val) { this.setPrice(val) }
    },
    product () { return this.getProduct() },
    stepper () { return this.getStepper() }
  },
  watch: {
    commission () {
      this.$nuxt.$emit('isValid', false)
      if (this.date && this.number > 0 && this.price > 0 && this.commission >= 0) this.$nuxt.$emit('isValid', true)
    },
    date () {
      this.$nuxt.$emit('isValid', false)
      this.dateFormatted = this.formatDate(this.date)
      if (this.date && this.number > 0 && this.price > 0 && this.commission >= 0) this.$nuxt.$emit('isValid', true)
    },
    number () {
      this.$nuxt.$emit('isValid', false)
      if (this.date && this.number > 0 && this.price > 0 && this.commission >= 0) this.$nuxt.$emit('isValid', true)
    },
    price () {
      this.$nuxt.$emit('isValid', false)
      if (this.date && this.number > 0 && this.price > 0 && this.commission >= 0) this.$nuxt.$emit('isValid', true)
    }
  },
  methods: {
    ...mapGetters('wallets/operate-product', [
      'getComment',
      'getCommission',
      'getDate',
      'getNumber',
      'getPrice',
      'getProduct',
      'getStepper'
    ]),
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
    }
  }
}
</script>

<style lang="scss" scoped>
.v-menu__content {
  min-width: 290px !important;
  max-width: 290px !important;
}
</style>
