<!--suppress JSUnresolvedVariable -->
<template>
  <v-card
    class="rounded-xl my-5"
    style="height: 220px; width: 350px;"
  >
    <v-card-title
      class="d-flex flex-row justify-space-between py-2 mb-2"
      style="background-color: #144b96; color: white"
    >
      <v-btn
        label="Name"
        type="text"
        color="transparent"
        elevation="0"
        dark
        dense
        @click="showWallet(wallet)"
      >
        {{ wallet.name }}
      </v-btn>
      <div>
        <v-btn icon @click.stop="editDialog(wallet)">
          <v-icon color="white">
            mdi-pencil
          </v-icon>
        </v-btn>
        <v-btn icon @click.stop="deleteDialog(wallet)">
          <v-icon color="white">
            mdi-trash-can
          </v-icon>
        </v-btn>
      </div>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col class="pb-0" cols="6">
          <span class="font-weight-bold">Suma:</span>
        </v-col>
        <v-col class="pb-0 text-right" cols="6">
          <span class="font-weight-bold">
            {{ parseFloat(getDetailedProductInfo(wallet, 'SUM') || 0).toFixed(2) }} {{ wallet.currency }}
          </span>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="py-0" cols="6">
          <span>Inwestycje:</span>
        </v-col>
        <v-col class="py-0 text-right" cols="6">
          <span>
            {{ parseFloat(getDetailedProductInfo(wallet, 'INVESTMENT') || 0).toFixed(2) }} {{ wallet.currency }}
          </span>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="py-0" cols="6">
          <span>Konta bankowe:</span>
        </v-col>
        <v-col class="py-0 text-right" cols="6">
          <span>
            {{ parseFloat(getDetailedProductInfo(wallet, 'DEPOSIT') || 0).toFixed(2) }} {{ wallet.currency }}
          </span>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="py-0" cols="6">
          <span>Lokaty:</span>
        </v-col>
        <v-col class="py-0 text-right" cols="6">
          <span>
            {{ parseFloat(getDetailedProductInfo(wallet, 'TIME_DEPOSIT') || 0).toFixed(2) }} {{ wallet.currency }}
          </span>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="py-0" cols="6">
          <span>Nieruchomości:</span>
        </v-col>
        <v-col class="py-0 text-right" cols="6">
          <span>
            {{ parseFloat(getDetailedProductInfo(wallet, 'REAL_ESTATE') || 0).toFixed(2) }} {{ wallet.currency }}
          </span>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12 text-right">
          <v-tooltip top>
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
          <v-tooltip top>
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
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'WalletCard',
  props: {
    wallet: {
      type: Object,
      default: () => {}
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
    selectedItem: {
      get () { return this.getSelectedItem() },
      set (val) { this.setSelectedItem(val) }
    },
    showDeleteDialog: {
      get () { return this.getDeleteWalletDialog() },
      set (val) { this.setDeleteWalletDialog(val) }
    },
    showEditDialog: {
      get () { return this.getEditWalletDialog() },
      set (val) { this.setEditWalletDialog(val) }
    }
  },
  methods: {
    ...mapGetters('wallets', ['getDeleteWalletDialog', 'getEditWalletDialog', 'getCurrency', 'getName', 'getSelectedItem']),
    ...mapMutations('wallets', ['setDeleteWalletDialog', 'setEditWalletDialog', 'setCurrency', 'setName', 'setSelectedItem']),

    deleteDialog (wallet) {
      this.showDeleteDialog = true
      this.selectedItem = wallet
    },

    editDialog (wallet) {
      this.showEditDialog = true
      this.selectedItem = wallet
      this.name = this.selectedItem.name
      this.currency = this.selectedItem.currency
    },

    showWallet (wallet) {
      this.$router.push({ name: 'wallets-id', params: { id: wallet.id } })
    },

    getDetailedProductInfo (wallet, productType) {
      if (wallet.detailedProductInfoResponse) {
        if (productType === 'SUM') {
          return wallet.detailedProductInfoResponse
            .map(item => item.totalScore)
            .reduce((a, b) => a + b, 0)
        }
        if (productType === 'INVESTMENT') {
          return wallet.detailedProductInfoResponse
            .filter(item => ['ETF_GPW', 'STOCK_GPW', 'CURRENCY', 'COMMODITY'].includes(item.productType))
            .map(item => item.totalScore)
            .reduce((a, b) => a + b, 0)
        }
        return wallet.detailedProductInfoResponse
          .filter(item => item.productType === productType)
          .map(item => item.totalScore)[0]
      }
    }
  }
}
</script>
