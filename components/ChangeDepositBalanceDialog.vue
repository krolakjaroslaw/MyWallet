<template>
  <v-dialog
    v-model="showChangeValueDialog"
    width="500"
    persistent
  >
    <v-card class="rounded-xl">
      <v-card-title class="headline">
        Zmień stan konta
      </v-card-title>
      <v-card-text>
        <!--TODO: form + validation-->
        <v-text-field
          v-model="balance"
          label="Kwota"
          class="mt-4"
          type="number"
          :rules="[
            $rules.required
          ]"
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
          @click="changeBalance"
        >
          Zmień
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'ChangDepositBalanceDialog',
  data () {
    return {
      balance: 0.0,
      valid: true
    }
  },
  computed: {
    dateFormatted: {
      get () { return this.formatDate(this.date) },
      set (val) { this.date = this.parseDate(val) }
    },
    showChangeValueDialog: {
      get () { return this.getShowChangeValueDialog() },
      set (val) { this.setShowChangeValueDialog(val) }
    }
  },
  methods: {
    ...mapActions('products/entity', ['changeDepositBalance']),
    ...mapGetters('products/entity', ['getShowChangeValueDialog']),
    ...mapMutations('products/entity', ['setShowChangeValueDialog']),

    changeBalance () {
      this.changeDepositBalance(this.balance)
      this.showChangeValueDialog = false
    },

    closeDialog () {
      this.showChangeValueDialog = false
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
