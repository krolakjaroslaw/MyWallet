<template>
  <div>
    <div id="chart">
      <canvas id="eur-chart" />
    </div>
    <br>
    <br>
    <br>
    <br>
    <br>
    <div id="polarChart">
      <canvas id="polar-chart" />
    </div>
    <br>
    <br>
    <br>
    <br>
    <br>
    <div id="pieChart">
      <canvas id="pie-chart" />
    </div>
    <br>
    <br>
    <br>
    <br>
    <br>
    <div id="doughnutChart">
      <canvas id="doughnut-chart" />
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js'
import chartData from '../assets/chart-data'
import doughnutChartData from '../assets/doughnut-chart-data'
import pieChartData from '../assets/pie-chart-data'
import polarChartData from '../assets/polar-chart-data'
import json from '../assets/data.json'

export default {
  data () {
    return {
      chartData,
      doughnutChartData,
      pieChartData,
      polarChartData
    }
  },
  mounted () {
    const labels = json.main.map(el => new Date(el[0]))
    const values = json.main.map(el => el[1])
    const pieLabels = ['Red', 'Orange', 'Yellow', 'Green', 'Blue']
    const pieValues = [10, 18, 22, 15, 35]
    const colors = [
      'rgba(255, 0, 0, 0.5)',
      'rgba(255, 150, 0, 0.5)',
      'rgba(255, 255, 0, 0.5)',
      'rgba(100, 255, 0, 0.5)',
      'rgba(0, 100, 255, 0.5)'
    ]
    this.createChart('eur-chart', this.chartData(labels, values))
    this.createChart('polar-chart', this.polarChartData(pieLabels, pieValues, colors))
    this.createChart('pie-chart', this.pieChartData(pieLabels, pieValues, colors))
    this.createChart('doughnut-chart', this.doughnutChartData(pieLabels, pieValues, colors))
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
