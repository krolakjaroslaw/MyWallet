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
              <div class="display-1">
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
              <v-expansion-panels
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
                        <span class="font-weight-bold">{{ wallet.sum }} {{ wallet.currency }}</span>
                      </v-col>
                      <v-col class="pb-0" cols="3">
                        <span class="font-weight-bold">Inwestycje:</span>
                      </v-col>
                      <v-col class="pb-0 text-right" cols="3">
                        <span class="font-weight-bold">{{ wallet.sum }} {{ wallet.currency }}</span>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col class="py-0" cols="3">
                        <span>Inwestycje:</span>
                      </v-col>
                      <v-col class="py-0 text-right" cols="3">
                        <span>{{ wallet.currencies }} {{ wallet.currency }}</span>
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
                      :loading="tables[i].length === 0"
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
                        <span class="bold" :class="getColor(item)">{{ item.rate }}</span>
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
              Giełda
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
                      :loading="tables[i].length === 0"
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
                        <span class="bold" :class="getColor(item)">{{ item.rate }}</span>
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
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  layout: 'parallax',
  data () {
    return {
      panel: 0,
      panel2: 0,
      titles: [
        'WALUTY', 'SUROWCE', 'CENY PALIW'
      ],
      tables: [
        [
          {
            name: 'EUR',
            rate: 4.6226.toFixed(4),
            change: '0.0000 (0.00%)'
          },
          {
            name: 'USD',
            rate: 3.8865.toFixed(4),
            change: '0.0159 (0.41%)'
          },
          {
            name: 'CHF',
            rate: 4.182.toFixed(4),
            change: '-0.0017 (-0.04%)'
          },
          {
            name: 'GBP',
            rate: 5.4116.toFixed(4),
            change: '0.0076 (0.14%)'
          },
          {
            name: 'JPY',
            rate: 3.5707.toFixed(4),
            change: '0.0207 (0.58%)'
          }
        ],
        [
          {
            name: 'ROPA',
            rate: 64.55.toFixed(2),
            change: '1.63 (2.59%)'
          },
          {
            name: 'ZŁOTO',
            rate: 1743.9.toFixed(2),
            change: '10.10 (0.58%)'
          },
          {
            name: 'SREBRO',
            rate: 26.33.toFixed(2),
            change: '0.24 (0.92%)'
          },
          {
            name: 'PLATYNA',
            rate: 1196.1.toFixed(2),
            change: '-10.00 (-0.83%)'
          },
          {
            name: 'MIEDŹ',
            rate: 9064.25.toFixed(2),
            change: '68.25 (0.76%)'
          }
        ],
        [
          {
            name: 'Euro 95',
            rate: '5.20 zł',
            change: '-0.12 zł'
          },
          {
            name: 'Superplus 98',
            rate: '5.38 zł',
            change: '-0.11 zł'
          },
          {
            name: 'Olej napędowy',
            rate: '5.20 zł',
            change: '-0.12 zł'
          },
          {
            name: 'LPG',
            rate: '2.60 zł',
            change: '-0.07 zł'
          }
        ]
      ],
      wallets2: [
        {
          name: 'Wallet 1',
          sum: 100000.00,
          currencies: 45000.00,
          resources: 20000.00,
          stock: 35000.00
        },
        {
          name: 'Wallet 2',
          sum: 100000.00,
          currencies: 45000.00,
          resources: 20000.00,
          stock: 35000.00
        },
        {
          name: 'Wallet 3',
          sum: 100000.00,
          currencies: 45000.00,
          resources: 20000.00,
          stock: 35000.00
        },
        {
          name: 'Wallet 4',
          sum: 100000.00,
          currencies: 45000.00,
          resources: 20000.00,
          stock: 35000.00
        },
        {
          name: 'Wallet 5',
          sum: 100000.00,
          currencies: 45000.00,
          resources: 20000.00,
          stock: 35000.00
        }
      ]
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
    wallets () { return this.getWallets() }
  },
  async created () {
    await this.loadWallets()
  },
  methods: {
    ...mapActions('wallets', ['loadWallets']),
    ...mapGetters('wallets', ['getWallets']),
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
