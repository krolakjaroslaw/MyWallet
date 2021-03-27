<template>
  <div id="chart">
    <canvas id="eur-chart" />
    <v-btn
      color="default"
      small
      @click="changeData('eur1m')"
    >
      1M
    </v-btn>
    <v-btn
      color="default"
      small
      @click="changeData('eur3m')"
    >
      3M
    </v-btn>
    <v-btn
      color="default"
      small
      @click="changeData('eur6m')"
    >
      6M
    </v-btn>
    <v-btn
      color="default"
      small
      @click="changeData('eur1y')"
    >
      1Y
    </v-btn>
    <v-btn
      color="default"
      small
      @click="changeData('eur5y')"
    >
      5Y
    </v-btn>
    <v-btn
      color="default"
      small
      @click="changeData('eurMax')"
    >
      Max
    </v-btn>
    <v-btn
      color="default"
      small
      disabled
    >
      Custom
    </v-btn>
    <br>
    <br>
    <br>
    <br>
    <br>
    <v-select
      v-model="miniChart"
      :items="currencies"
      item-text="name"
      item-value="obj"
      class="select"
      dense
      rounded
      outlined
      return-object
      @change="changeMiniChart()"
    />
    <canvas id="mini-eur-chart" />
<!--    <br />-->
<!--    <br />-->
<!--    <br />-->
<!--    <v-carousel-->
<!--      light-->
<!--      height="250"-->
<!--      interval="3000"-->
<!--      style="width: 350px;"-->
<!--      hide-delimiter-background-->
<!--      show-arrows-on-hover-->
<!--      @change="update()"-->
<!--    >-->
<!--      <v-carousel-item-->
<!--        v-for="(chart, i) in charts"-->
<!--        :key="i"-->
<!--      >-->
<!--        <v-sheet-->
<!--          height="100%"-->
<!--        >-->
<!--          <v-row-->
<!--            class="fill-height"-->
<!--            align="center"-->
<!--            justify="center"-->
<!--          >-->
<!--            <div class="display-3">-->
<!--              <canvas :id="chart.id" />-->
<!--            </div>-->
<!--          </v-row>-->
<!--        </v-sheet>-->
<!--      </v-carousel-item>-->
<!--    </v-carousel>-->
  </div>
</template>

<script>
import Chart from 'chart.js'
import chartData from '../assets/chart-data'
import miniChartData from '../assets/chart-data-mini'
import eur1m from '../assets/eur_1m.json'
import eur3m from '../assets/eur_3m.json'
import eur6m from '../assets/eur_6m.json'
import eur1y from '../assets/eur_1y.json'
import eur5y from '../assets/eur_5y.json'
import eurMax from '../assets/eur_max.json'
import gbp1m from '../assets/gbp_1m.json'
import usd1m from '../assets/usd_1m.json'

export default {
  data () {
    return {
      chartData,
      miniChartData,
      chartId: -1,
      chart: eur1m,
      miniChart: eur1m,
      // carouselChart: eur1m,
      myChart: {},
      myMiniChart: {},
      // myCarouselChart: {},
      currencies: [
        { name: 'EUR/PLN', obj: eur1m },
        { name: 'GBP/PLN', obj: gbp1m },
        { name: 'USD/PLN', obj: usd1m }
      // ],
      // charts: [
      //   { id: 'carousel-eur-chart', model: eur1m },
      //   { id: 'carousel-gbp-chart', model: gbp1m },
      //   { id: 'carousel-usd-chart', model: usd1m }
      ]
    }
  },
  mounted () {
    this.drawChart()
    this.drawMiniChart()

    // this.charts.forEach((chart, index) => {
    //   console.log(index)
    //   this.carouselChart = chart.model
    //   console.log(this.carouselChart)
    // this.$nextTick(this.drawCarouselChart(chart.id))
    //   document.getElementsByClassName('v-window__next')[0].click()
    // })
  },
  methods: {
    createMiniChart (chartId, chartData) {
      const ctx = document.getElementById(chartId)
      this.myMiniChart = new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options
      })
      console.log(this.myMiniChart)
    },
    createChart (chartId, chartData) {
      const ctx = document.getElementById(chartId)
      this.myChart = new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options
      })
      console.log(this.myChart)
    },
    // createCarouselChart (chartId, chartData) {
    //   const ctx = document.getElementById(chartId)
    //   this.myCarouselChart = new Chart(ctx, {
    //     type: chartData.type,
    //     data: chartData.data,
    //     options: chartData.options
    //   })
    //   console.log('myCarouselChart', this.myCarouselChart)
    // },
    drawMiniChart () {
      const labels = this.miniChart.main.map(el => new Date(el[0]))
      const values = this.miniChart.main.map(el => el[1])
      this.createMiniChart('mini-eur-chart', this.miniChartData(labels, values))
    },
    drawChart () {
      const labels = this.chart.main.map(el => new Date(el[0]))
      const values = this.chart.main.map(el => el[1])
      this.createChart('eur-chart', this.chartData(labels, values))
    },
    // drawCarouselChart (chartId) {
    //   const labels = this.carouselChart.main.map(el => new Date(el[0]))
    //   const values = this.carouselChart.main.map(el => el[1])
    //   this.createCarouselChart(chartId, this.miniChartData(labels, values))
    // },
    updateChart (timeUnit) {
      this.myChart.data.labels = []
      this.myChart.data.datasets.forEach((dataset) => {
        dataset.data = []
      })
      const labels = this.chart.main.map(el => new Date(el[0]))
      const values = this.chart.main.map(el => el[1])
      this.myChart.data.labels = labels
      this.myChart.data.datasets.forEach((dataset) => {
        dataset.data = values
      })
      this.myChart.options.scales.xAxes[0].time.unit = timeUnit
      this.myChart.update()
    },
    updateMiniChart () {
      this.myMiniChart.data.labels = []
      this.myMiniChart.data.datasets.forEach((dataset) => {
        dataset.data = []
      })
      const labels = this.miniChart.obj.main.map(el => new Date(el[0]))
      const values = this.miniChart.obj.main.map(el => el[1])
      this.myMiniChart.data.labels = labels
      this.myMiniChart.data.datasets.forEach((dataset) => {
        dataset.data = values
      })
      this.myMiniChart.update()
    },
    // updateCarouselChart () {
    //   console.log('myCarouselChart', this.myCarouselChart.data.datasets[0].data)
    //   this.myCarouselChart.data.labels = []
    //   this.myCarouselChart.data.datasets.forEach((dataset) => {
    //     dataset.data = []
    //   })
    //   console.log('myCarouselChart', this.myCarouselChart.data.datasets[0].data)
    //   console.log('carouselChart', this.carouselChart.main)
    //   const labels = this.carouselChart.main.map(el => new Date(el[0]))
    //   const values = this.carouselChart.main.map(el => el[1])
    //   this.myCarouselChart.data.labels = labels
    //   this.myCarouselChart.data.datasets.forEach((dataset) => {
    //     dataset.data = values
    //   })
    //   console.log('myCarouselChart', this.myCarouselChart.data.datasets[0].data)
    //   this.myCarouselChart.update()
    // },
    changeData (item) {
      let timeUnit = 'week'
      if (item === 'eur1m') this.chart = eur1m
      if (item === 'eur3m') this.chart = eur3m
      if (item === 'eur6m') this.chart = eur6m
      if (item === 'eur1y') this.chart = eur1y
      if (item === 'eur5y') this.chart = eur5y
      if (item === 'eurMax') this.chart = eurMax
      if (item !== 'eur1m' && item !== 'eur3m') timeUnit = 'month'
      if (item === 'eur5y' || item === 'eurMax') timeUnit = 'year'
      this.updateChart(timeUnit)
    },
    changeMiniChart () {
      this.updateMiniChart()
    // },
    // update () {
    //   console.log('update', this.chartId)
    //   console.log('elo', document.getElementById('carousel-eur-chart'))
    //   console.log('elo', document.getElementById('carousel-gbp-chart'))
    //   console.log('elo', document.getElementById('carousel-usd-chart'))
    //   if (this.chartId < 0) {
    //     this.chartId++
    //   } else {
    //     const index = this.chartId % 3
    //     this.carouselChart = this.charts[index].model
    //     console.log('carouselChart', this.carouselChart.main)
    //     this.$nextTick(this.drawCarouselChart(this.charts[index].id))
    //     this.chartId++
    //   }
    }
  }
}
</script>

<style scoped>
#mini-eur-chart {
  width: 400px !important;
  height: 200px !important;
}

.carousel-chart {
  width: 350px !important;
  height: 200px !important;
}

.select {
  width: 200px;
}
</style>
