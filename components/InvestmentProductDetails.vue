<!--suppress CssUnknownTarget, CssOverwrittenProperties, JSUnresolvedVariable -->
<!--eslint-disable vue/no-parsing-error-->
<template>
  <v-container>
    <v-card
      class="col-12 mb-6 rounded-xl d-flex flex-row"
      style="height: 525px; background-color: #f6f6f6;"
      outlined
    >
      <v-card
        class="rounded-xl"
        elevation="0"
        style="min-width: 300px; max-width: 300px;"
      >
        <v-card-title class="d-flex flex-column mb-15">
          {{ symbolLong }}
          <v-divider style="background-color: #144b96; width: 100%;" />
        </v-card-title>
        <v-card-text>
          <v-simple-table
            dense
            fixed-header
          >
            <template #default>
              <tbody>
                <tr>
                  <th class="px-2 text-left">
                    Średnia wartość transakcji:
                  </th>
                  <td class="px-2 text-right">
                    {{ averagePurchaseValue }} zł
                  </td>
                </tr>
                <tr>
                  <th class="px-2 text-left">
                    Aktualna wartość transakcji:
                  </th>
                  <td class="px-2 text-right">
                    {{ currentPurchaseValue }} zł
                  </td>
                </tr>
                <tr>
                  <th class="px-2 text-left">
                    Aktualna cena jednostki:
                  </th>
                  <td class="px-2 text-right">
                    {{ currentUnitPrice }} zł
                  </td>
                </tr>
                <tr>
                  <th class="px-2 text-left">
                    Liczba jednostek:
                  </th>
                  <td class="px-2 text-right">
                    {{ numberOfUnits }}
                  </td>
                </tr>
                <tr>
                  <th class="px-2 text-left">
                    Zysk:
                  </th>
                  <td class="px-2 text-right">
                    {{ profit }} zł
                  </td>
                </tr>
                <tr>
                  <th class="px-2 text-left">
                    Stopa zwrotu:
                  </th>
                  <td class="px-2 text-right">
                    {{ rateOfReturn }}
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>
      </v-card>
      <v-card
        class="ml-2"
        elevation="0"
        style="background-color: transparent"
      >
        <v-card-title class="d-flex flex-row justify-space-between fill-width py-2">
          <span>{{ symbolLong }}</span>
          <span>
            <b>{{ currentUnitPrice }} zł</b>
            <!--TODO-->
            <span style="color: green">1,29%</span>
          </span>
        </v-card-title>
        <v-card-text>
          <div id="productChart">
            <!--TODO-->
            <canvas id="chart" class="mt-8" />
          </div>
        </v-card-text>
      </v-card>
    </v-card>
    <v-card
      class="rounded-xl"
      elevation="0"
    >
      <v-card-title class="d-flex flex-column">
        Historia transakcji
        <v-divider style="background-color: #144b96; width: 100%;" />
      </v-card-title>
      <v-card-text>
        <v-simple-table
          dense
          fixed-header
        >
          <template #default>
            <thead>
              <tr>
                <th class="text-left">
                  Data
                </th>
                <th class="text-center">
                  Operacja
                </th>
                <th class="text-right">
                  Liczba jednostek
                </th>
                <th class="text-right">
                  Cena jednostki
                </th>
                <th class="text-right">
                  Prowizja
                </th>
                <th class="text-right">
                  Całkowita wartość
                </th>
                <th class="text-right">
                  Komentarz
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in purchaseHistory"
                :key="item.id"
              >
                <th class="text-left">
                  {{ item.transactionDate }}
                </th>
                <td class="text-center">
                  {{ parseInt(item.numberOfUnits) < 0 ? 'sprzedaż' : 'kupno' }}
                </td>
                <td class="text-right">
                  {{ Math.abs(item.numberOfUnits) }}
                </td>
                <td class="text-right">
                  {{ item.unitPriceAtTransactionTime }} zł
                </td>
                <td class="text-right">
                  {{ item.commissionValue }} zł
                </td>
                <td class="text-right">
                  {{ item.totalPurchaseValueWithCommission }} zł
                </td>
                <td class="text-right">
                  {{ item.comment }}
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import chartData from 'assets/allegro-chart-data'
import Chart from 'chart.js'
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'InvestmentProductDetails',
  layout: 'parallax',
  data () {
    return {
      chartData
    }
  },
  computed: {
    averagePurchaseValue () { return this.getAveragePurchaseValue() },
    chartJson () { return this.getChartJson() },
    currentPurchaseValue () { return this.getCurrentPurchaseValue() },
    currentUnitPrice () { return this.getCurrentUnitPrice() },
    numberOfUnits () { return this.getNumberOfUnits() },
    productType () { return this.getProductType() },
    profit () { return this.getProfit() },
    purchaseHistory () { return this.getPurchaseHistory() },
    rateOfReturn () { return this.getRateOfReturn() },
    symbol () { return this.getSymbol() },
    symbolLong: {
      get () { return this.getSymbolLong() },
      set (val) { this.setSymbolLong(val) }
    }
  },

  async mounted () {
    await this.getProductSummary(this.$route.params.id)
    await this.getHistoryData(this.$route.params.id)
    switch (this.productType) {
      case 'ETF_GPW': this.symbolLong = (await this.$backend.products.getETFSymbols())
        .data.find(item => item.symbolShort === this.symbol).symbol
        break
      case 'STOCK_GPW': this.symbolLong = (await this.$backend.products.getStockSymbols())
        .data.find(item => item.symbolShort === this.symbol).symbol
        break
      default: this.symbolLong = this.symbol
    }
    await this.getStockData()

    const labels = this.chartJson.map(el => new Date(el[0]))
    const values = this.chartJson.map(el => el[1])
    this.createChart('chart', this.chartData(labels, values, values[0]))
  },
  methods: {
    ...mapActions('products/entity', ['getHistoryData', 'getProductSummary', 'getAllStockData', 'getStockData']),
    ...mapGetters('products/entity', [
      'getAveragePurchaseValue',
      'getChartJson',
      'getCurrentPurchaseValue',
      'getCurrentUnitPrice',
      'getNumberOfUnits',
      'getProductType',
      'getProfit',
      'getPurchaseHistory',
      'getRateOfReturn',
      'getSymbol',
      'getSymbolLong'
    ]),
    ...mapMutations('products/entity', ['setSymbolLong']),

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
#chart {
  width: 800px !important;
  height: 400px !important;
}
</style>
