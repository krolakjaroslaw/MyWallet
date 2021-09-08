<template>
  <v-card
    class="mb-6 rounded-xl"
    style="height: 300px; background-color: #f6f6f6"
    outlined
  >
    <v-card-title class="py-2">
      WIG-20
    </v-card-title>
    <!--TODO: prepare for multi-charts-->
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
        <v-carousel-item justify="center">
          <div class="display-1">
            <canvas id="chart" />
          </div>
        </v-carousel-item>
      </v-carousel>
    </v-card-text>
  </v-card>
</template>

<script>
import chartData from 'assets/product-details-chart-data'
import Chart from 'chart.js'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'StockChartsCarousel',
  data () {
    return {
      chartData,
      myChart: {},
      chartsData: []
    }
  },
  computed: {
    ...mapState('dashboard', ['labels', 'values'])
  },
  async created () {
    await this.loadCharts()
    this.createChart('chart', this.chartData(this.labels, this.values))
  },
  methods: {
    ...mapActions('dashboard', ['loadCharts']),
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
