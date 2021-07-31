<template>
  <v-dialog
    v-model="showAccountDialog"
    width="500"
    persistent
  >
    <v-card class="rounded-xl">
      <v-card-title class="headline">
        Subkonto
      </v-card-title>
      <v-card-text>
        Czy chcesz dodać środki ze sprzedaży do subkonta?
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="primary"
          text
          rounded
          outlined
          @click="closeDialog"
        >
          Nie
        </v-btn>
        <v-btn
          color="primary"
          rounded
          depressed
          @click="addToSubAccount"
        >
          Tak
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'SubAccountDialog',
  computed: {
    showAccountDialog: {
      get () { return this.getShowAccountDialog() },
      set (val) { this.setShowAccountDialog(val) }
    }
  },
  methods: {
    ...mapActions('wallets/entity', ['updateSubAccountBalance']),
    ...mapGetters('wallets/operate-product', ['getShowAccountDialog']),
    ...mapMutations('wallets/operate-product', ['resetState', 'setShowAccountDialog']),

    addToSubAccount () {
      this.updateSubAccountBalance()
      this.resetState()
      this.showAccountDialog = false
    },

    closeDialog () {
      this.resetState()
      this.showAccountDialog = false
    }
  }
}
</script>

<style scoped>

</style>
