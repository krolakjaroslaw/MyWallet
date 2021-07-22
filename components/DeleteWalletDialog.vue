<template>
  <v-dialog
    v-model="showDeleteDialog"
    width="500"
    persistent
  >
    <v-card class="rounded-xl">
      <v-card-title class="headline">
        Usuń portfel {{ selectedItem.name }}
      </v-card-title>

      <v-card-text>
        Czy na pewno chcesz usunąć portfel?
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
          Anuluj
        </v-btn>
        <v-btn
          color="primary"
          rounded
          depressed
          @click="removeWallet"
        >
          Usuń
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'DeleteWalletDialog',
  computed: {
    selectedItem () { return this.getSelectedItem() },
    showDeleteDialog () { return this.getDeleteWalletDialog() }
  },
  methods: {
    ...mapActions('wallets', ['deleteWallet']),
    ...mapGetters('wallets', ['getDeleteWalletDialog', 'getSelectedItem']),
    ...mapMutations('wallets', ['resetState']),

    removeWallet () {
      this.deleteWallet(this.selectedItem.id)
    },

    closeDialog () {
      this.resetState()
    }
  }
}
</script>
