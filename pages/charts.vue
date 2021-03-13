<template>
  <div id="chart">
    <canvas id="eur-chart" />
  </div>
</template>

<script>
import Chart from 'chart.js'
import chartData from '../assets/chart-data'
import json from '../assets/data.json'

export default {
  data () {
    return {
      chartData
    }
  },
  mounted () {
    const labels = json.main.map(el => new Date(el[0]))
    const values = json.main.map(el => el[1])
    this.createChart('eur-chart', this.chartData(labels, values))
  },
  methods: {
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
