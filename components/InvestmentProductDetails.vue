<!--suppress JSUnresolvedVariable -->
<template>
  <v-container>
    <v-card
      class="col-12 mb-6 rounded-xl d-flex flex-row"
      style="height: 525px; background-color: #f6f6f6;"
      outlined
    >
      <InvestmentDataTable />
      <ChartComponent :name="symbolLong" :valuation="currentUnitPrice" />
    </v-card>
    <InvestmentHistoryDataTable />
  </v-container>
</template>

<script>
import ChartComponent from '@/components/products/entity/ChartComponent'
import InvestmentDataTable from '@/components/products/entity/InvestmentDataTable'
import InvestmentHistoryDataTable from '@/components/products/entity/InvestmentHistoryDataTable'
import chartData from 'assets/allegro-chart-data'
import Chart from 'chart.js'
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'

export default {
  name: 'InvestmentProductDetails',
  components: { ChartComponent, InvestmentDataTable, InvestmentHistoryDataTable },
  layout: 'parallax',
  data () {
    return {
      chartData,
      myChart: {}
    }
  },
  computed: {
    ...mapState('products/entity', ['currentUnitPrice', 'productType']),
    chartJson () { return this.getChartJson() },
    numberOfUnits () { return this.getNumberOfUnits() },
    purchaseHistory () { return this.getPurchaseHistory() },
    symbol () { return this.getSymbol() },
    symbolLong: {
      get () { return this.getSymbolLong() },
      set (val) { this.setSymbolLong(val) }
    }
  },

  async created () {
    this.productId = this.$route.params.id
    await this.updateData(this.productId)
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
    ...mapActions('products/entity', ['getStockData', 'updateData']),
    ...mapGetters('products/entity', [
      'getChartJson',
      'getNumberOfUnits',
      'getPurchaseHistory',
      'getSymbol',
      'getSymbolLong'
    ]),
    ...mapMutations('products/entity', ['setSymbolLong']),

    createChart (chartId, chartData) {
      const ctx = document.getElementById(chartId)
      this.myChart = new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options
      })
    }
  }
}
</script>
