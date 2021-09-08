<template>
  <v-card
    class="ml-2"
    elevation="0"
    style="background-color: transparent"
  >
    <v-card-title class="d-flex flex-row justify-space-between fill-width py-2">
      <span v-if="['ETF_GPW', 'STOCK_GPW'].includes(productType)">{{ symbolLong }} ({{ symbol }})</span>
      <span v-else>{{ symbolLong }}</span>
      <span>
        <b>{{ profileData.quote }} zł</b>
      </span>
    </v-card-title>
    <v-card-text>
      <div id="productChart">
        <canvas id="chart" />
      </div>
      <ChartPeriodButtons @updateChart="updateChart" />
    </v-card-text>
  </v-card>
</template>

<script>
import ChartPeriodButtons from '@/components/products/stock/ChartPeriodButtons'
import chartData from 'assets/product-details-chart-data'
import Chart from 'chart.js'
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'ChartComponent',
  components: { ChartPeriodButtons },
  data () {
    return {
      chartData,
      myChart: {},
      productType: null
    }
  },
  computed: {
    chartJson () { return this.getChartJson() },
    profileData () { return this.getProfileData() },
    symbol: {
      get () { return this.getSymbol() },
      set (val) { this.setSymbol(val) }
    },
    symbolLong: {
      get () { return this.getSymbolLong() },
      set (val) { this.setSymbolLong(val) }
    }
  },
  created () {
    const localParams = JSON.parse(localStorage.getItem('params'))
    this.productType = localParams.type
  },
  async mounted () {
    await this.loadData()

    const labels = this.chartJson.map(el => new Date(el[0]))
    const values = this.chartJson.map(el => el[1])
    this.createChart('chart', this.chartData(labels, values))
  },
  methods: {
    ...mapActions('products/stock', ['loadData']),
    ...mapGetters('products/stock', ['getChartJson', 'getProfileData', 'getSymbol', 'getSymbolLong']),
    ...mapMutations('products/stock', ['setSymbol', 'setSymbolLong']),
    createChart (chartId, chartData) {
      const ctx = document.getElementById(chartId)
      this.myChart = new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options
      })
    },
    updateChart (timeUnit, stepSize = 1) {
      this.myChart.data.labels = []
      this.myChart.data.datasets.forEach((dataset) => {
        dataset.data = []
      })
      const labels = this.chartJson.map(el => new Date(el[0]))
      const values = this.chartJson.map(el => el[1])
      this.myChart.data.labels = labels
      this.myChart.data.datasets.forEach((dataset) => {
        dataset.data = values
      })
      this.myChart.options.scales.xAxes[0].time.unit = timeUnit
      this.myChart.options.scales.xAxes[0].time.stepSize = stepSize
      this.myChart.update()
    }
  }
}
</script>

<style lang="scss" scoped>
#chart {
  width: 750px !important;
  height: 375px !important;
}
</style>
