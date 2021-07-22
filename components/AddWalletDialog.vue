<template>
  <v-dialog
    v-model="showAddDialog"
    width="500"
    persistent
  >
    <v-card class="rounded-xl">
      <v-card-title class="headline">
        Dodaj portfel
      </v-card-title>
      <v-card-text>
        Czy chcesz dodać środki ze sprzedaży do subkonta?
      </v-card-text>

      <v-card-text>
        <v-text-field
          v-model="name"
          label="Nazwa portfela"
          class="mt-4"
          type="text"
          outlined
          rounded
          dense
        />

        <v-select
          v-model="currency"
          :items="currencies"
          item-text="label"
          item-value="name"
          dense
          rounded
          outlined
          return-object
        />
      </v-card-text>

      <v-card-actions>
        <v-spacer />

        <v-btn color="primary" text rounded outlined @click="closeDialog">
          Anuluj
        </v-btn>

        <v-btn color="primary" rounded depressed @click="addNewWallet">
          Zapisz
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'AddWalletDialog',
  data () {
    return {
      currencies: [
        { name: 'CHF', label: 'CHF - frank szwajcarski' },
        { name: 'EUR', label: 'EUR - euro' },
        { name: 'GBP', label: 'GBP - funt brytyjski' },
        { name: 'JPY', label: 'JPY - jen japoński' },
        { name: 'PLN', label: 'PLN - złoty polski' },
        { name: 'USD', label: 'USD - dolar amerykański' }
      ]
    }
  },
  computed: {
    name: {
      get () { return this.getName() },
      set (val) { this.setName(val) }
    },
    currency: {
      get () { return this.getCurrency() },
      set (val) { this.setCurrency(val) }
    },
    showAddDialog () { return this.getAddWalletDialog() }
  },
  methods: {
    ...mapActions('wallets', ['createWallet']),
    ...mapGetters('wallets', ['getAddWalletDialog', 'getCurrency', 'getName']),
    ...mapMutations('wallets', ['resetState', 'setCurrency', 'setName']),

    addNewWallet () {
      this.createWallet()
    },

    closeDialog () {
      this.resetState()
    }
  }
}
</script>
