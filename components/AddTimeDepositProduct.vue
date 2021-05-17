<!--suppress JSUnresolvedVariable -->
<template>
  <div>
    <v-form v-model="valid">
      <v-row class="my-0">
        <v-col
          cols="6"
          class="py-0 mx-auto"
        >
          <v-text-field
            v-model="name"
            label="Name"
            class="mt-2"
            :rules="[
              $rules.required,
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
              :max="new Date().toISOString().substr(0, 10)"
              no-title
              @input="menu = false"
            />
          </v-menu>

          <v-text-field
            v-else-if="stepper === 3"
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
            v-model="price"
            label="Deposit base amount"
            type="number"
            class="mt-2"
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
            v-model="interestRate"
            label="Interest rate per year"
            type="number"
            :rules="[
              $rules.required,
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
            v-model="number"
            label="Investment time"
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
          <!--TODO: as select-->
          <v-text-field
            v-model="investmentTime"
            label="Investment interval"
            :rules="[
              $rules.required,
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
          <!--TODO: as select-->
          <v-text-field
            v-model="capitalization"
            label="Capitalization"
            :rules="[
              $rules.required,
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
        <v-textarea
          v-model="comment"
          label="Comment"
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
  name: 'AddTimeDepositProduct',
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
    capitalization: {
      get () { return this.getCapitalization() },
      set (val) { this.setCapitalization(val) }
    },
    comment: {
      get () { return this.getComment() },
      set (val) { this.setComment(val) }
    },
    date: {
      get () { return this.getDate() },
      set (val) { this.setDate(val) }
    },
    dateFormatted: {
      get () { return this.formatDate(this.date) },
      set (val) { this.date = this.parseDate(val) }
    },
    interestRate: {
      get () { return this.getInterestRate() },
      set (val) { this.setInterestRate(val) }
    },
    investmentTime: {
      get () { return this.getInvestmentTime() },
      set (val) { this.setInvestmentTime(val) }
    },
    name: {
      get () { return this.getName() },
      set (val) { this.setName(val) }
    },
    number: {
      get () { return this.getNumber() },
      set (val) { this.setNumber(val) }
    },
    price: {
      get () { return this.getPrice() },
      set (val) { this.setPrice(val) }
    },
    stepper () { return this.getStepper() }
  },
  watch: {
    capitalization () {
      this.$nuxt.$emit('isValid', false)
      if (this.name && this.date && this.price > 0 && this.interestRate &&
        this.number > 0 && this.investmentTime && this.capitalization) {
        this.$nuxt.$emit('isValid', true)
      }
    },
    date () {
      this.$nuxt.$emit('isValid', false)
      this.dateFormatted = this.formatDate(this.date)
      if (this.name && this.date && this.price > 0 && this.interestRate &&
        this.number > 0 && this.investmentTime && this.capitalization) {
        this.$nuxt.$emit('isValid', true)
      }
    },
    interestRate () {
      this.$nuxt.$emit('isValid', false)
      if (this.name && this.date && this.price > 0 && this.interestRate &&
        this.number > 0 && this.investmentTime && this.capitalization) {
        this.$nuxt.$emit('isValid', true)
      }
    },
    investmentTime () {
      this.$nuxt.$emit('isValid', false)
      if (this.name && this.date && this.price > 0 && this.interestRate &&
        this.number > 0 && this.investmentTime && this.capitalization) {
        this.$nuxt.$emit('isValid', true)
      }
    },
    name () {
      this.$nuxt.$emit('isValid', false)
      if (this.name && this.date && this.price > 0 && this.interestRate &&
        this.number > 0 && this.investmentTime && this.capitalization) {
        this.$nuxt.$emit('isValid', true)
      }
    },
    number () {
      this.$nuxt.$emit('isValid', false)
      if (this.name && this.date && this.price > 0 && this.interestRate &&
        this.number > 0 && this.investmentTime && this.capitalization) {
        this.$nuxt.$emit('isValid', true)
      }
    },
    price () {
      this.$nuxt.$emit('isValid', false)
      if (this.name && this.date && this.price > 0 && this.interestRate &&
        this.number > 0 && this.investmentTime && this.capitalization) {
        this.$nuxt.$emit('isValid', true)
      }
    }
  },
  methods: {
    ...mapGetters('wallets/operate-product', [
      'getCapitalization',
      'getComment',
      'getDate',
      'getInterestRate',
      'getInvestmentTime',
      'getName',
      'getNumber',
      'getPrice',
      'getStepper'
    ]),
    ...mapMutations('wallets/operate-product', [
      'setCapitalization',
      'setComment',
      'setDate',
      'setInterestRate',
      'setInvestmentTime',
      'setName',
      'setNumber',
      'setPrice'
    ]),

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
