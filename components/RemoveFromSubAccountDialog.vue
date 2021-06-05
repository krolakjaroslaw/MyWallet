<template>
  <v-dialog
    v-model="showRemoveDialog"
    width="500"
    persistent
  >
    <v-card class="rounded-xl">
      <v-card-title class="headline">
        Wypłać środki z subkonta
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
          @click="removeValueFromSubAccount"
        >
          Wypłać
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'RemoveFromSubAccountDialog',
  data () {
    return {
      value: 0.0
    }
  },
  computed: {
    showRemoveDialog: {
      get () { return this.getShowRemoveDialog() },
      set (val) { this.setShowRemoveDialog(val) }
    }
  },
  methods: {
    ...mapActions('wallets/entity', ['removeFromSubAccount']),
    ...mapGetters('wallets/entity', ['getShowRemoveDialog']),
    ...mapMutations('wallets/entity', ['setShowRemoveDialog']),

    removeValueFromSubAccount () {
      this.removeFromSubAccount(this.value)
      this.showRemoveDialog = false
    },

    closeDialog () {
      this.showRemoveDialog = false
    }
  }
}
</script>

<style scoped>

</style>
