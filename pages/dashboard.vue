<!--suppress CssOverwrittenProperties, CssUnknownTarget -->
<template>
  <div>
    <div class="page-header">
      <!--TODO: move to separate component-->
      <parallax
        class="parallax"
        style="
          background: -webkit-linear-gradient(rgba(20, 75, 150, 0.6), rgba(44, 44, 44, 0.6)), url('profile.jpg') center center no-repeat; /* For Safari 5.1 to 6.0 */
          background: -o-linear-gradient(rgba(20, 75, 150, 0.6), rgba(44, 44, 44, 0.6)), url('profile.jpg') center center no-repeat; /* For Opera 11.1 to 12.0 */
          background: -moz-linear-gradient(rgba(20, 75, 150, 0.6), rgba(44, 44, 44, 0.6)), url('profile.jpg') center center no-repeat; /* For Firefox 3.6 to 15 */
          background: linear-gradient(rgba(20, 75, 150, 0.6), rgba(44, 44, 44, 0.6)), url('profile.jpg') center center no-repeat; /* Standard syntax */
          -webkit-background-size: cover;
          -moz-background-size: cover;
          -o-background-size: cover;
          background-size: cover;
        "
      />
    </div>
    <!--TODO: modularity-->
    <div class="section">
      <v-container class="d-flex flex-row">
        <div class="col-md-7">
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
                          Wartość:
                          <span class="bold"> {{ parseFloat(wallet.productScore).toFixed(2) }} {{ wallet.currency }} </span>
                        </td>
                        <td class="text-center">
                          Subkonto:
                          <span class="bold"> {{ parseFloat(wallet.subAccountBalance).toFixed(2) }} {{ wallet.currency }} </span>
                        </td>
                        <td class="text-right">
                          <v-btn
                            icon
                            small
                            @click="$router.push({ name: 'buy-product', params: { id: wallet.id } })"
                          >
                            <v-icon color="primary">
                              mdi-database-plus
                            </v-icon>
                          </v-btn>
                          <v-btn
                            icon
                            small
                            @click="$router.push({ name: 'sell-product', params: { id: wallet.id } })"
                          >
                            <v-icon color="primary">
                              mdi-database-minus
                            </v-icon>
                          </v-btn>
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </div>
            </v-card-text>
          </v-card>

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
        </div>

        <div class="col-md-5">
          <v-card
            class="mb-6 rounded-xl"
            style="height: 300px; background-color: #f6f6f6"
            outlined
          >
            <v-card-title class="py-2">
              Wykresy
            </v-card-title>
            <!--TODO:-->
            <v-card-text class="d-flex justify-center py-1">
              <v-carousel
                cycle
                light
                height="240"
                interval="3000"
                style="width: 500px;"
                hide-delimiter-background
                show-arrows-on-hover
              >
                <v-carousel-item
                  v-for="(table, i) in tables"
                  :key="i"
                  justify="center"
                >
                  <div class="display-1">
                    <v-data-table
                      dense
                      calculate-widths
                      hide-default-header
                      hide-default-footer
                      loading-text="Loading items..."
                      :headers="headers"
                      :items="tables[i]"
                      item-key="name"
                      class="elevation-3 rounded-lg"
                      style="width: 500px;"
                      :footer-props="{
                        howCurrentPage: false,
                        showFirstLastPage: false,
                        itemsPerPageOptions: [5]
                      }"
                    >
                      <template #header="{ props: { headers } }">
                        <thead>
                          <tr>
                            <th :colspan="headers.length">
                              {{ titles[i] }}
                            </th>
                          </tr>
                        </thead>
                      </template>
                      <template #[`item.name`]="{ item }">
                        <v-icon v-if="item.change.includes('0.0000')">
                          mdi-equal
                        </v-icon>
                        <v-icon v-else :color="getColor(item)">
                          {{ item.change.includes('-') ? 'mdi-menu-down' : 'mdi-menu-up' }}
                        </v-icon>
                        <span class="bold">{{ item.name }}</span>
                      </template>
                      <template #[`item.rate`]="{ item }">
                        <span class="bold" :class="getColor(item)">{{ item.value }}</span>
                      </template>
                      <template #[`item.change`]="{ item }">
                        <span :class="getColor(item)">{{ item.change }}</span>
                      </template>
                    </v-data-table>
                  </div>
                </v-carousel-item>
              </v-carousel>
            </v-card-text>
          </v-card>

          <v-card
            class="mb-6 rounded-xl"
            style="height: 300px; background-color: #f6f6f6"
            outlined
          >
            <v-card-title class="py-2">
              Kursy
            </v-card-title>

            <!--TODO:-->
            <v-card-text class="d-flex justify-center py-1">
              <v-carousel
                cycle
                light
                height="240"
                interval="3000"
                style="width: 500px;"
                hide-delimiter-background
                show-arrows-on-hover
              >
                <v-carousel-item
                  v-for="(table, i) in tables"
                  :key="i"
                  justify="center"
                >
                  <div class="display-1">
                    <v-data-table
                      dense
                      calculate-widths
                      hide-default-header
                      hide-default-footer
                      loading-text="Loading items..."
                      :headers="headers"
                      :items="tables[i]"
                      item-key="name"
                      class="elevation-3 rounded-lg"
                      style="width: 500px;"
                      :footer-props="{
                        howCurrentPage: false,
                        showFirstLastPage: false,
                        itemsPerPageOptions: [5]
                      }"
                    >
                      <template #header="{ props: { headers } }">
                        <thead>
                          <tr>
                            <th :colspan="headers.length">
                              {{ titles[i] }}
                            </th>
                          </tr>
                        </thead>
                      </template>
                      <template #[`item.name`]="{ item }">
                        <v-icon v-if="item.change.includes('0.0000')">
                          mdi-equal
                        </v-icon>
                        <v-icon v-else :color="getColor(item)">
                          {{ item.change.includes('-') ? 'mdi-menu-down' : 'mdi-menu-up' }}
                        </v-icon>
                        <span class="bold">{{ item.name }}</span>
                      </template>
                      <template #[`item.rate`]="{ item }">
                        <span class="bold" :class="getColor(item)">{{ item.value }}</span>
                      </template>
                      <template #[`item.change`]="{ item }">
                        <span :class="getColor(item)">{{ item.change }}</span>
                      </template>
                    </v-data-table>
                  </div>
                </v-carousel-item>
              </v-carousel>
            </v-card-text>
          </v-card>
        </div>
      </v-container>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Dashboard',
  layout: 'parallax',
  data () {
    return {
      commodities: [],
      currencies: [],
      etfs: [],
      stock: [],
      panel: 0,
      panel2: 0,
      titles: ['SUROWCE', 'WALUTY', 'ETFY', 'GIEŁDA'],
      tables: []
    }
  },
  computed: {
    headers () {
      return [
        { text: 'Walor', value: 'name', align: 'start' },
        { text: 'Kurs', value: 'rate', align: 'right' },
        { text: 'Zmiana', value: 'change', align: 'right' }
      ]
    },
    showAddDialog: {
      get () { return this.getAddWalletDialog() },
      set (val) { this.setAddWalletDialog(val) }
    },
    wallets () { return this.getWallets() }
  },
  async created () {
    await this.loadWallets()
    this.commodities = (await this.$backend.stock.getCommodity()).data
      .sort((a, b) => b.askPrice - a.askPrice)
      .slice(0, 5)
      .map(item => ({
        name: item.symbol,
        value: parseFloat(item.askPrice).toFixed(4),
        change: parseFloat(item.bidDatChangePercentage).toFixed(2) + '%'
      }))
    this.tables.push(this.commodities)
    this.currencies = (await this.$backend.stock.getCurrency()).data
      .filter(item => item.symbol.includes('PLN') && !item.symbol.includes('BOSSA'))
      .map(item => ({
        name: item.symbol.split('.')[0],
        value: parseFloat(item.askPrice).toFixed(4),
        change: parseFloat(item.bidDatChangePercentage).toFixed(2) + '%'
      }))
    this.tables.push(this.currencies)
    this.etfs = (await this.$backend.stock.getAllEtf()).data
      .sort((a, b) => b.askSize - a.askSize)
      .slice(0, 5)
      .map(item => ({
        name: item.symbol,
        value: parseFloat(item.askSize).toFixed(4),
        change: parseFloat(item.change).toFixed(2) + '%'
      }))
    this.tables.push(this.etfs)
    this.stock = (await this.$backend.stock.getAllStock()).data
      .sort((a, b) => b.askSize - a.askSize)
      .slice(0, 5)
      .map(item => ({
        name: item.symbol,
        value: parseFloat(item.askSize).toFixed(4),
        change: parseFloat(item.change).toFixed(2) + '%'
      }))
    this.tables.push(this.stock)
  },
  methods: {
    ...mapActions('wallets', ['loadWallets']),
    ...mapGetters('wallets', ['getAddWalletDialog', 'getWallets']),
    ...mapMutations('wallets', ['setAddWalletDialog']),
    openAddDialog () {
      this.$router.push({ name: 'wallets' })
      this.showAddDialog = true
    },
    getColor (item) {
      if (item.change.includes('-')) return 'red'
      if (item.change.includes('0.0000')) return 'black'
      else return 'green'
    },
    getColor2 (item) {
      if (item.sum < 0) return 'red'
      if (item.sum === 0) return 'black'
      else return 'green'
    }
  }
}
</script>

<style lang="scss" scoped>
.page-header {
  width: 100%;
  height: 17vh;
}

.parallax {
  width: 100%;
  height: 150px !important;
}

.section {
  padding: 10px 0;
  position: relative;
}

.bold {
  font-weight: bold;
}

.red {
  background-color: transparent !important;
  color: #C62828;
}

.green {
  background-color: transparent !important;
  color: #43A047;
}

.black {
  background-color: transparent !important;
}

.v-expansion-panel-header {
  min-height: 24px !important;
  padding: 6px 24px !important;
}

.v-expansion-panel-header--active {
  padding: 8px 24px !important;
}
</style>
