<!--suppress JSUnresolvedVariable, JSCheckFunctionSignatures -->
<template>
  <v-card
    class="mb-6 rounded-xl"
    style="height: 375px; background-color: #f6f6f6"
    outlined
  >
    <v-card-title class="py-2">
      Portfele - szczegóły
    </v-card-title>

    <v-card-text class="d-flex justify-center py-1">
      <div
        v-if="wallets.length === 0"
        class="d-flex flex-column flex-wrap justify-center mt-16"
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
      <v-expansion-panels
        v-else
        v-model="panel"
        focusable
        style="width: 700px;"
      >
        <v-expansion-panel
          v-for="(wallet, index) in wallets"
          :key="index"
          class="elevation-3"
          expand
        >
          <v-expansion-panel-header>
            <template #default>
              <v-row no-gutters>
                {{ wallet.name }}
              </v-row>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content class="my-2">
            <v-row>
              <v-col class="pb-0" cols="3">
                <span class="font-weight-bold">Suma:</span>
              </v-col>
              <v-col class="pb-0 text-right" cols="3">
                <span class="font-weight-bold">
                  {{
                    parseFloat(wallet.detailedProductInfoResponse
                      .map(item => item.totalScore)
                      .reduce((a, b) => a + b, 0) || 0).toFixed(2)
                  }} {{ wallet.currency }}
                </span>
              </v-col>
              <v-col class="pb-0" cols="3">
                <span class="font-weight-bold">Inwestycje:</span>
              </v-col>
              <v-col class="pb-0 text-right" cols="3">
                <span class="font-weight-bold">
                  {{
                    parseFloat(wallet.detailedProductInfoResponse
                      .filter(item => ['ETF_GPW', 'STOCK_GPW', 'CURRENCY', 'COMMODITY'].includes(item.productType))
                      .map(item => item.totalScore)
                      .reduce((a, b) => a + b, 0) || 0).toFixed(2)
                  }} {{ wallet.currency }}
                </span>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="py-0" cols="3">
                <span>Inwestycje:</span>
              </v-col>
              <v-col class="py-0 text-right" cols="3">
                <span>
                  {{
                    parseFloat(wallet.detailedProductInfoResponse
                      .filter(item => ['ETF_GPW', 'STOCK_GPW', 'CURRENCY', 'COMMODITY'].includes(item.productType))
                      .map(item => item.totalScore)
                      .reduce((a, b) => a + b, 0) || 0).toFixed(2)
                  }} {{ wallet.currency }}
                </span>
              </v-col>
              <v-col class="py-0" cols="3">
                <span>ETF_GPW:</span>
              </v-col>
              <v-col class="py-0 text-right" cols="3">
                <span>
                  {{
                    parseFloat(wallet.detailedProductInfoResponse
                      .filter(item => item.productType === 'ETF_GPW')
                      .map(item => item.totalScore)[0] || 0).toFixed(2)
                  }} {{ wallet.currency }}
                </span>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="py-0" cols="3">
                <span>Konta bankowe:</span>
              </v-col>
              <v-col class="py-0 text-right" cols="3">
                <span>
                  {{
                    parseFloat(wallet.detailedProductInfoResponse
                      .filter(item => item.productType === 'DEPOSIT')
                      .map(item => item.totalScore)[0] || 0).toFixed(2)
                  }} {{ wallet.currency }}
                </span>
              </v-col>
              <v-col class="py-0" cols="3">
                <span>Giełda_GPW:</span>
              </v-col>
              <v-col class="py-0 text-right" cols="3">
                <span>
                  {{
                    parseFloat(wallet.detailedProductInfoResponse
                      .filter(item => item.productType === 'STOCK_GPW')
                      .map(item => item.totalScore)[0] || 0).toFixed(2)
                  }} {{ wallet.currency }}
                </span>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="py-0" cols="3">
                <span>Lokaty:</span>
              </v-col>
              <v-col class="py-0 text-right" cols="3">
                <span>
                  {{
                    parseFloat(wallet.detailedProductInfoResponse
                      .filter(item => item.productType === 'TIME_DEPOSIT')
                      .map(item => item.totalScore)[0] || 0).toFixed(2)
                  }} {{ wallet.currency }}
                </span>
              </v-col>
              <v-col class="py-0" cols="3">
                <span>Surowce:</span>
              </v-col>
              <v-col class="py-0 text-right" cols="3">
                <span>
                  {{
                    parseFloat(wallet.detailedProductInfoResponse
                      .filter(item => item.productType === 'COMMODITY')
                      .map(item => item.totalScore)[0] || 0).toFixed(2)
                  }} {{ wallet.currency }}
                </span>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="py-0" cols="3">
                <span>Nieruchomości:</span>
              </v-col>
              <v-col class="py-0 text-right" cols="3">
                <span>
                  {{
                    parseFloat(wallet.detailedProductInfoResponse
                      .filter(item => item.productType === 'REAL_ESTATE')
                      .map(item => item.totalScore)[0] || 0).toFixed(2)
                  }} {{ wallet.currency }}
                </span>
              </v-col>
              <v-col class="py-0" cols="3">
                <span>Waluty:</span>
              </v-col>
              <v-col class="py-0 text-right" cols="3">
                <span>
                  {{
                    parseFloat(wallet.detailedProductInfoResponse
                      .filter(item => item.productType === 'CURRENCY')
                      .map(item => item.totalScore)[0] || 0).toFixed(2)
                  }} {{ wallet.currency }}
                </span>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'

export default {
  name: 'WalletDetailsDataTable',
  data () {
    return {
      panel: 0
    }
  },
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
.v-expansion-panel-header {
  min-height: 24px !important;
  padding: 6px 24px !important;
}

.v-expansion-panel-header--active {
  padding: 8px 24px !important;
}
</style>
