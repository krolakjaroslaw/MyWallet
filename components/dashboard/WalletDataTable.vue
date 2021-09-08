<!--suppress JSUnresolvedVariable -->
<template>
  <v-card
    class="mb-6 rounded-xl"
    style="height: 225px; background-color: #f6f6f6"
    outlined
  >
    <v-card-title class="py-2">
      Portfele
    </v-card-title>

    <v-card-text class="py-1">
      <div
        v-if="wallets.length === 0"
        class="d-flex flex-column flex-wrap justify-center mt-8"
      >
        <div class="text-center">
          Nie posiadasz jeszcze żadnego portfela finansowego.
        </div>
        <div class="text-center">
          Kliknij przycisk, aby dodać nowy portfel
          <v-btn fab x-small color="primary" @click.stop="openAddDialog">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </div>
      </div>
      <div
        v-else
        class="display-1"
      >
        <v-simple-table dense>
          <template #default>
            <tbody>
              <tr
                v-for="wallet in wallets"
                :key="wallet.id"
              >
                <td class="text-left">
                  <router-link :to="{ name: 'wallets-id', params: { id: wallet.id } }">
                    <b>{{ wallet.name }}</b>
                  </router-link>
                </td>
                <td class="text-center">
                  <span class="bold"> {{ parseFloat(wallet.productScore).toFixed(2) }} {{ wallet.currency }} </span>
                </td>
                <td class="text-center">
                  Subkonto: {{ parseFloat(wallet.subAccountBalance).toFixed(2) }} {{ wallet.currency }}
                </td>
                <td class="text-right">
                  <v-tooltip bottom>
                    <template #activator="{ on }">
                      <v-btn
                        icon
                        small
                        v-on="on"
                        @click="$router.push({ name: 'buy-product', params: { id: wallet.id } })"
                      >
                        <v-icon color="primary">
                          mdi-database-plus
                        </v-icon>
                      </v-btn>
                    </template>
                    <span>Kup produkt</span>
                  </v-tooltip>
                  <v-tooltip bottom>
                    <template #activator="{ on }">
                      <v-btn
                        icon
                        small
                        v-on="on"
                        @click="$router.push({ name: 'sell-product', params: { id: wallet.id } })"
                      >
                        <v-icon color="primary">
                          mdi-database-minus
                        </v-icon>
                      </v-btn>
                    </template>
                    <span>Sprzedaj produkt</span>
                  </v-tooltip>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'

export default {
  name: 'WalletDataTable',
  computed: {
    ...mapState('wallets', ['wallets']),
    showAddDialog: {
      get () { return this.getAddWalletDialog() },
      set (val) { this.setAddWalletDialog(val) }
    }
  },
  methods: {
    ...mapGetters('wallets', ['getAddWalletDialog']),
    ...mapMutations('wallets', ['setAddWalletDialog']),
    openAddDialog () {
      this.$router.push({ name: 'wallets' })
      this.showAddDialog = true
    }
  }
}
</script>

<style lang="scss" scoped>
.bold {
  font-weight: bold;
}
</style>
