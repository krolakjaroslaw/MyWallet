<template>
  <v-dialog
    v-model="showAddDialog"
    width="500"
    persistent
  >
    <v-card class="rounded-xl">
      <v-card-title class="headline">
        Dodaj środki do subkonta
      </v-card-title>
      <v-card-text>
        <!--TODO: form + validation-->
        <v-text-field
          v-model="value"
          label="Wartość"
          class="mt-4"
          type="number"
          outlined
          rounded
          dense
        />
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
          @click="addValueToSubAccount"
        >
          Wpłać
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'AddToSubAccountDialog',
  data () {
    return {
      value: 0.0
    }
  },
  computed: {
    showAddDialog: {
      get () { return this.getShowAddDialog() },
      set (val) { this.setShowAddDialog(val) }
    }
  },
  methods: {
    ...mapActions('wallets/entity', ['addToSubAccount']),
    ...mapGetters('wallets/entity', ['getShowAddDialog']),
    ...mapMutations('wallets/entity', ['setShowAddDialog']),

    addValueToSubAccount () {
      this.addToSubAccount(this.value)
      this.showAddDialog = false
    },

    closeDialog () {
      this.showAddDialog = false
    }
  }
}
</script>

<style scoped>

</style>
