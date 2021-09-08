<template>
  <v-card
    elevation="0"
    style="background-color: transparent"
  >
    <v-card-title class="py-2">
      Subkonto portfela - {{ wallet.name }}:
      <v-spacer />
      <b class="green">
        {{ parseFloat(wallet.subAccountBalance).toFixed(2) }} {{ wallet.currency }}
      </b>
      <v-spacer />
      <v-btn
        color="primary"
        class="mr-3"
        rounded
        @click="showAddDialog = true"
      >
        Wpłać
      </v-btn>
      <v-btn
        color="primary"
        rounded
        @click="showRemoveDialog = true"
      >
        Wypłać
      </v-btn>
    </v-card-title>
  </v-card>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'SubAccountCard',
  props: {
    wallet: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    showAddDialog: {
      get () { return this.getShowAddDialog() },
      set (val) { this.setShowAddDialog(val) }
    },
    showRemoveDialog: {
      get () { return this.getShowRemoveDialog() },
      set (val) { this.setShowRemoveDialog(val) }
    }
  },
  methods: {
    ...mapGetters('wallets/entity', ['getShowAddDialog', 'getShowRemoveDialog']),
    ...mapMutations('wallets/entity', ['setShowAddDialog', 'setShowRemoveDialog'])
  }
}
</script>

<style lang="scss" scoped>
.green {
  background-color: transparent !important;
  color: #43A047;
}
</style>
