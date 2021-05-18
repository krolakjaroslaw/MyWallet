<!--suppress CssUnknownTarget, CssOverwrittenProperties, JSUnresolvedVariable -->
<template>
  <div>
    <div class="page-header">
      <parallax
        class="parallax"
        style="
          background: -webkit-linear-gradient(rgba(20, 75, 150, 0.6), rgba(44, 44, 44, 0.6)), url('../profile.jpg') center center no-repeat; /* For Safari 5.1 to 6.0 */
          background: -o-linear-gradient(rgba(20, 75, 150, 0.6), rgba(44, 44, 44, 0.6)), url('../profile.jpg') center center no-repeat; /* For Opera 11.1 to 12.0 */
          background: -moz-linear-gradient(rgba(20, 75, 150, 0.6), rgba(44, 44, 44, 0.6)), url('../profile.jpg') center center no-repeat; /* For Firefox 3.6 to 15 */
          background: linear-gradient(rgba(20, 75, 150, 0.6), rgba(44, 44, 44, 0.6)), url('../profile.jpg') center center no-repeat; /* Standard syntax */
          -webkit-background-size: cover;
          -moz-background-size: cover;
          -o-background-size: cover;
          background-size: cover;
        "
      />
    </div>

    <div class="section">
      <v-container>
        <v-card
          class="col-12 mb-6 rounded-xl d-flex flex-row"
          style="height: 525px; background-color: #f6f6f6;"
          outlined
        >
          <!-- <v-card-->
          <!--   class="rounded-xl"-->
          <!--   elevation="0"-->
          <!--   style="min-width: 150px; max-width: 200px;"-->
          <!-- >-->
          <!--   <v-card-title class="mb-4">-->
          <!--     Wallets:-->
          <!--   </v-card-title>-->
          <!--   <v-card-text-->
          <!--     v-for="item in wallets"-->
          <!--     :key="item.id"-->
          <!--     class="py-3"-->
          <!--   >-->
          <!--     {{ item.name }}-->
          <!--   </v-card-text>-->
          <!-- </v-card>-->

          <v-card
            elevation="0"
            style="background-color: transparent"
          >
            <v-card-title class="py-2">
              Wallet composition - {{ wallet.name }}
            </v-card-title>
            <v-card-text>
              <div id="pieChart">
                <canvas id="pie-chart" />
              </div>
            </v-card-text>
          </v-card>
        </v-card>

        <v-expansion-panels
          v-model="panel"
          focusable
          multiple
          popout
          style="width: 100%;"
        >
          <v-expansion-panel
            v-if="commodities.length > 0"
            class="elevation-3"
          >
            <v-expansion-panel-header>
              <template #default>
                <v-row no-gutters>
                  Commodities
                </v-row>
              </template>
            </v-expansion-panel-header>

            <v-expansion-panel-content class="pt-4">
              <v-simple-table
                dense
                fixed-header
              >
                <template #default>
                  <thead>
                    <tr>
                      <th class="text-center">
                        Name
                      </th>
                      <th class="text-center">
                        Number of units
                      </th>
                      <th class="text-center">
                        Value
                      </th>
                      <th class="text-center">
                        Profit
                      </th>
                      <th class="text-center">
                        Rate of return
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="item in commodities"
                      :key="item.id"
                    >
                      <td class="text-center">
                        <router-link :to="{ name: 'products-id', params: { id: item.id } }">
                          {{ item.name }}
                        </router-link>
                      </td>
                      <td class="text-center">
                        {{ item.numberOfUnits }}
                      </td>
                      <td class="text-center">
                        {{ item.currentPurchaseValue }}
                      </td>
                      <td class="text-center">
                        {{ item.profit }}
                      </td>
                      <td class="text-center">
                        {{ item.rateOfReturn }}
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel
            v-if="currencies.length > 0"
            class="elevation-3"
          >
            <v-expansion-panel-header>
              <template #default>
                <v-row no-gutters>
                  Currencies
                </v-row>
              </template>
            </v-expansion-panel-header>

            <v-expansion-panel-content class="pt-4">
              <v-simple-table
                dense
                fixed-header
              >
                <template #default>
                  <thead>
                    <tr>
                      <th class="text-center">
                        Name
                      </th>
                      <th class="text-center">
                        Number of units
                      </th>
                      <th class="text-center">
                        Value
                      </th>
                      <th class="text-center">
                        Profit
                      </th>
                      <th class="text-center">
                        Rate of return
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="item in currencies"
                      :key="item.id"
                    >
                      <td class="text-center">
                        <router-link :to="{ name: 'products-id', params: { id: item.id } }">
                          {{ item.name }}
                        </router-link>
                      </td>
                      <td class="text-center">
                        {{ item.numberOfUnits }}
                      </td>
                      <td class="text-center">
                        {{ item.currentPurchaseValue }}
                      </td>
                      <td class="text-center">
                        {{ item.profit }}
                      </td>
                      <td class="text-center">
                        {{ item.rateOfReturn }}
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel
            v-if="deposits.length > 0"
            class="elevation-3"
          >
            <v-expansion-panel-header>
              <template #default>
                <v-row no-gutters>
                  Deposits
                </v-row>
              </template>
            </v-expansion-panel-header>

            <v-expansion-panel-content class="pt-4">
              <v-simple-table
                dense
                fixed-header
              >
                <template #default>
                  <thead>
                    <tr>
                      <th class="text-center">
                        Name
                      </th>
                      <th class="text-center">
                        Currency
                      </th>
                      <th class="text-center">
                        Value
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="item in deposits"
                      :key="item.id"
                    >
                      <td class="text-center">
                        <router-link :to="{ name: 'products-id', params: { id: item.id } }">
                          {{ item.name }}
                        </router-link>
                      </td>
                      <td class="text-center">
                        {{ item.currency }}
                      </td>
                      <td class="text-center">
                        {{ item.value }}
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel
            v-if="etfs.length > 0"
            class="elevation-3"
          >
            <v-expansion-panel-header>
              <template #default>
                <v-row no-gutters>
                  ETF GPW
                </v-row>
              </template>
            </v-expansion-panel-header>

            <v-expansion-panel-content class="pt-4">
              <v-simple-table
                dense
                fixed-header
              >
                <template #default>
                  <thead>
                    <tr>
                      <th class="text-center">
                        Name
                      </th>
                      <th class="text-center">
                        Number of units
                      </th>
                      <th class="text-center">
                        Value
                      </th>
                      <th class="text-center">
                        Profit
                      </th>
                      <th class="text-center">
                        Rate of return
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="item in etfs"
                      :key="item.id"
                    >
                      <td class="text-center">
                        <router-link :to="{ name: 'products-id', params: { id: item.id } }">
                          {{ item.name }}
                        </router-link>
                      </td>
                      <td class="text-center">
                        {{ item.numberOfUnits }}
                      </td>
                      <td class="text-center">
                        {{ item.currentPurchaseValue }}
                      </td>
                      <td class="text-center">
                        {{ item.profit }}
                      </td>
                      <td class="text-center">
                        {{ item.rateOfReturn }}
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel
            v-if="realEstates.length > 0"
            class="elevation-3"
          >
            <v-expansion-panel-header>
              <template #default>
                <v-row no-gutters>
                  Real Estates
                </v-row>
              </template>
            </v-expansion-panel-header>

            <v-expansion-panel-content class="pt-4">
              <v-simple-table
                dense
                fixed-header
              >
                <template #default>
                  <thead>
                    <tr>
                      <th class="text-center">
                        Name
                      </th>
                      <th class="text-center">
                        Currency
                      </th>
                      <th class="text-center">
                        Value
                      </th>
                      <th class="text-center">
                        Profit
                      </th>
                      <th class="text-center">
                        Rate of return
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="item in realEstates"
                      :key="item.id"
                    >
                      <td class="text-center">
                        <router-link :to="{ name: 'products-id', params: { id: item.id } }">
                          {{ item.name }}
                        </router-link>
                      </td>
                      <td class="text-center">
                        {{ item.currency }}
                      </td>
                      <td class="text-center">
                        {{ item.currentValuation }}
                      </td>
                      <td class="text-center">
                        {{ item.totalProfit }}
                      </td>
                      <td class="text-center">
                        {{ item.rateOfReturn }}
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel
            v-if="timeDeposits.length > 0"
            class="elevation-3"
          >
            <v-expansion-panel-header>
              <template #default>
                <v-row no-gutters>
                  Time Deposits
                </v-row>
              </template>
            </v-expansion-panel-header>

            <v-expansion-panel-content class="pt-4">
              <v-simple-table
                dense
                fixed-header
              >
                <template #default>
                  <thead>
                    <tr>
                      <th class="text-center">
                        Name
                      </th>
                      <th class="text-center">
                        Base amount
                      </th>
                      <th class="text-center">
                        Current profit
                      </th>
                      <th class="text-center">
                        Estimated profit
                      </th>
                      <th class="text-center">
                        Interest rate
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="item in timeDeposits"
                      :key="item.id"
                    >
                      <td class="text-center">
                        <router-link :to="{ name: 'products-id', params: { id: item.id } }">
                          {{ item.name }}
                        </router-link>
                      </td>
                      <td class="text-center">
                        {{ item.depositBaseAmount }}
                      </td>
                      <td class="text-center">
                        {{ item.currentProfit }}
                      </td>
                      <td class="text-center">
                        {{ item.estimatedProfit }}
                      </td>
                      <td class="text-center">
                        {{ item.interestRate }}
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel
            v-if="stock.length > 0"
            class="elevation-3"
          >
            <v-expansion-panel-header>
              <template #default>
                <v-row no-gutters>
                  Stock GPW
                </v-row>
              </template>
            </v-expansion-panel-header>

            <v-expansion-panel-content class="pt-4">
              <v-simple-table
                dense
                fixed-header
              >
                <template #default>
                  <thead>
                    <tr>
                      <th class="text-center">
                        Name
                      </th>
                      <th class="text-center">
                        Number of units
                      </th>
                      <th class="text-center">
                        Value
                      </th>
                      <th class="text-center">
                        Profit
                      </th>
                      <th class="text-center">
                        Rate of return
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="item in stock"
                      :key="item.id"
                    >
                      <td class="text-center">
                        <router-link :to="{ name: 'products-id', params: { id: item.id } }">
                          {{ item.name }}
                        </router-link>
                      </td>
                      <td class="text-center">
                        {{ item.numberOfUnits }}
                      </td>
                      <td class="text-center">
                        {{ item.currentPurchaseValue }}
                      </td>
                      <td class="text-center">
                        {{ item.profit }}
                      </td>
                      <td class="text-center">
                        {{ item.rateOfReturn }}
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-container>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import pieChartData from 'assets/pie-chart-data'

export default {
  name: 'WalletDetails',
  layout: 'parallax',
  data () {
    return {
      pieChartData,
      chartLabels: [],
      chartValues: [],
      panel: []
    }
  },
  computed: {
    commodities: {
      get () { return this.getCommodities() },
      set (val) { this.setCommodities(val) }
    },
    currencies: {
      get () { return this.getCurrencies() },
      set (val) { this.setCurrencies(val) }
    },
    deposits: {
      get () { return this.getDeposits() },
      set (val) { this.setDeposits(val) }
    },
    etfs: {
      get () { return this.getEtfs() },
      set (val) { this.setEtfs(val) }
    },
    realEstates: {
      get () { return this.getRealEstates() },
      set (val) { this.setRealEstates(val) }
    },
    stock: {
      get () { return this.getStock() },
      set (val) { this.setStock(val) }
    },
    timeDeposits: {
      get () { return this.getTimeDeposits() },
      set (val) { this.setTimeDeposits(val) }
    },
    wallet: {
      get () { return this.getWallet() },
      set (val) { this.setWallet(val) }
    // },
    // wallets () {
    //   return this.getWallets()
    }
  },
  async mounted () {
    await this.getWalletInfo(this.$route.params.id)
    // TODO: refactor
    await this.getDepositProducts(this.$route.params.id)
    await this.getInvestmentProducts(this.$route.params.id)
    await this.getRealEstateProducts(this.$route.params.id)
    await this.getTimeDepositProducts(this.$route.params.id)

    if (this.commodities.length > 0) {
      this.chartLabels.push('Commodities')
      const sum = this.commodities
        .map(item => item.currentPurchaseValue)
        .reduce((sum, item) => sum + item)
      this.chartValues.push(sum)
    }

    if (this.currencies.length > 0) {
      this.chartLabels.push('Currencies')
      const sum = this.currencies
        .map(item => item.currentPurchaseValue)
        .reduce((sum, item) => sum + item)
      this.chartValues.push(sum)
    }

    if (this.deposits.length > 0) {
      this.chartLabels.push('Deposits')
      const sum = this.deposits
        .map(item => item.value)
        .reduce((sum, item) => sum + item)
      this.chartValues.push(sum)
    }

    if (this.etfs.length > 0) {
      this.chartLabels.push('ETFs')
      const sum = this.etfs
        .map(item => item.currentPurchaseValue)
        .reduce((sum, item) => sum + item)
      this.chartValues.push(sum)
    }

    if (this.realEstates.length > 0) {
      this.chartLabels.push('Real Estates')
      const sum = this.realEstates
        .map(item => item.currentValuation)
        .reduce((sum, item) => sum + item)
      this.chartValues.push(sum)
    }

    if (this.stock.length > 0) {
      this.chartLabels.push('Stock')
      const sum = this.stock
        .map(item => item.currentPurchaseValue)
        .reduce((sum, item) => sum + item)
      this.chartValues.push(sum)
    }

    if (this.timeDeposits.length > 0) {
      this.chartLabels.push('Time Deposits')
      const sum = this.timeDeposits
        .map(item => item.depositBaseAmount)
        .reduce((sum, item) => sum + item)
      this.chartValues.push(sum)
    }

    const colors = [
      'rgba(0, 0, 139, 1)',
      'rgba(30, 144, 255, 1)',
      'rgba(0, 0, 205, 1)',
      'rgba(100, 149, 237, 1)',
      'rgba(0, 191, 255, 1)',
      'rgba(65, 105, 225, 1)',
      'rgba(135, 206, 250, 1)'
    ]
    this.createChart('pie-chart', this.pieChartData(this.chartLabels, this.chartValues, colors))
  },
  methods: {
    ...mapActions('wallets', ['getWalletInfo']),
    ...mapActions('wallets/entity', [
      'getDepositProducts',
      'getInvestmentProducts',
      'getRealEstateProducts',
      'getTimeDepositProducts'
    ]),
    // ...mapGetters('wallets', ['getWallets']),
    ...mapGetters('wallets/entity', [
      'getCommodities',
      'getCurrencies',
      'getDeposits',
      'getEtfs',
      'getRealEstates',
      'getStock',
      'getTimeDeposits',
      'getWallet'
    ]),
    ...mapMutations('wallets/entity', [
      'setCommodities',
      'setCurrencies',
      'setDeposits',
      'setEtfs',
      'setRealEstates',
      'setStock',
      'setTimeDeposits',
      'setWallet'
    ]),

    createChart (chartId, chartData) {
      const ctx = document.getElementById(chartId)
      const myChart = new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options
      })
      console.log(myChart)
    }
  }
}
</script>

<style lang="scss" scoped>
.page-header {
  width: 100%;
  height: 17vh;
}

.container {
  padding-top: 0;
}

.parallax {
  width: 100%;
  height: 150px !important;
}

.title {
  font-weight: bold;
  margin: 0 auto;
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

.v-expansion-panel--active > .v-expansion-panel-header {
  min-height: 48px;
}

.v-expansion-panel-header {
  padding: 8px 12px;
}

#pie-chart {
  height: 450px !important;
  width: 900px !important;
}
</style>
