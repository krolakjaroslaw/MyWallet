<!--suppress JSUnresolvedVariable -->
<template>
  <v-form v-model="valid">
    <v-row class="my-0">
      <v-col
        cols="6"
        class="py-0 mx-auto"
      >
        <v-text-field
          v-model="name"
          label="Nazwa"
          class="mt-2"
          :rules="[
            $rules.required
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
          label="Wartość"
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
  </v-form>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'AddRealEstateProduct',
  data () {
    return {
      valid: true,
      menu: false
    }
  },
  computed: {
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
    name () {
      this.$nuxt.$emit('isValid', false)
      if (this.name && this.price > 0) this.$nuxt.$emit('isValid', true)
    },
    price () {
      this.$nuxt.$emit('isValid', false)
      if (this.name && this.price > 0) this.$nuxt.$emit('isValid', true)
    }
  },
  methods: {
    ...mapGetters('wallets/operate-product', ['getName', 'getPrice', 'getStepper']),
    ...mapMutations('wallets/operate-product', ['setName', 'setPrice'])
  }
}
</script>

<style lang="scss" scoped>

</style>
