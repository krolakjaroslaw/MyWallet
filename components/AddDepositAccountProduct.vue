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
          <v-text-field
            v-model="price"
            label="Value"
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

      <v-row class="my-0">
        <v-col
          cols="6"
          class="py-0 mx-auto"
        >
          <!--TODO: as select from api-->
          <v-text-field
            v-model="currency"
            label="Currency"
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
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'AddDepositAccountProduct',
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
    currency: {
      get () { return this.getCurrency() },
      set (val) { this.setCurrency(val) }
    },
    name: {
      get () { return this.getName() },
      set (val) { this.setName(val) }
    },
    price: {
      get () { return this.getPrice() },
      set (val) { this.setPrice(val) }
    },
    stepper () { return this.getStepper() }
  },
  watch: {
    currency () {
      this.$nuxt.$emit('isValid', false)
      if (this.name && this.price >= 0 && this.currency) this.$nuxt.$emit('isValid', true)
    },
    name () {
      this.$nuxt.$emit('isValid', false)
      if (this.name && this.price >= 0 && this.currency) this.$nuxt.$emit('isValid', true)
    },
    price () {
      this.$nuxt.$emit('isValid', false)
      if (this.name && this.price >= 0 && this.currency) this.$nuxt.$emit('isValid', true)
    }
  },
  methods: {
    ...mapGetters('wallets/operate-product', ['getCurrency', 'getName', 'getPrice', 'getStepper']),
    ...mapMutations('wallets/operate-product', ['setCurrency', 'setName', 'setPrice'])
  }
}
</script>

<style lang="scss" scoped>

</style>
