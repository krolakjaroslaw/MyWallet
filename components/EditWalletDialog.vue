<template>
  <v-dialog
    v-model="showEditDialog"
    width="500"
    persistent
  >
    <v-card class="rounded-xl">
      <v-card-title class="headline">
        Zmień nazwę portfela
      </v-card-title>

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
      </v-card-text>

      <v-card-actions>
        <v-spacer />

        <v-btn color="primary" text rounded outlined @click="closeDialog">
          Anuluj
        </v-btn>

        <v-btn color="primary" rounded depressed @click="editWalletName">
          Zapisz
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'EditWalletDialog',
  computed: {
    name: {
      get () { return this.getName() },
      set (val) { this.setName(val) }
    },
    selectedItem () { return this.getSelectedItem() },
    showEditDialog () { return this.getEditWalletDialog() }
  },
  methods: {
    ...mapActions('wallets', ['updateWalletName']),
    ...mapGetters('wallets', ['getEditWalletDialog', 'getName', 'getSelectedItem']),
    ...mapMutations('wallets', ['resetState', 'setName']),

    editWalletName () {
      this.updateWalletName(this.selectedItem.id)
    },

    closeDialog () {
      this.resetState()
    }
  }
}
</script>
