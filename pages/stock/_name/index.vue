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
          <v-card
            class="rounded-xl"
            elevation="0"
            style="min-width: 350px; max-width: 350px;"
          >
            <v-card-title class="d-flex flex-column mb-15">
              {{ symbolLong }}
              <v-divider style="background-color: #144b96; width: 100%;" />
            </v-card-title>
            <!--TODO: data for stock, etf etc-->
            <v-card-text>
              <v-simple-table
                dense
                fixed-header
              >
                <template #default>
                  <tbody>
                    <tr>
                      <th class="text-left px-2">
                        Kurs odniesienia:
                      </th>
                      <td class="px-2">
                        {{ today ? parseFloat(profileData.quoteOpen).toFixed(4) : profileData.prevClose }} zł
                        <span v-if="!today" style="color: gray; font-size: small;"> ({{ profileData.prevCloseDate }})</span>
                      </td>
                    </tr>
                    <tr>
                      <th class="text-left px-2">
                        {{ today ? 'Oferta kupna:' : 'Data początkowa:' }}
                      </th>
                      <td class="px-2">
                        {{ today ?`${parseFloat(profileData.bidSize).toFixed(4)} zł` : profileData.startDate }}
                      </td>
                    </tr>
                    <tr>
                      <th class="text-left px-2">
                        {{ today ? 'Oferta sprzedaży:' : 'Data końcowa:' }}
                      </th>
                      <td class="px-2">
                        {{ today ? `${parseFloat(profileData.askSize).toFixed(4)} zł` : profileData.endDate }}
                      </td>
                    </tr>
                    <tr v-if="!today">
                      <th class="text-left px-2">
                        Zmiana:
                      </th>
                      <td class="px-2">
                        {{ profileData.changeValue }} zł ({{ profileData.changePercentValue }})
                      </td>
                    </tr>
                    <tr>
                      <th class="text-left px-2">
                        Minimum:
                      </th>
                      <td class="px-2">
                        {{ today ? parseFloat(profileData.quoteMin).toFixed(4) : profileData.minValue }} zł
                        <span v-if="!today" style="color: gray; font-size: small;"> ({{ profileData.minValueDate }})</span>
                      </td>
                    </tr>
                    <tr>
                      <th class="text-left px-2">
                        Maksimum:
                      </th>
                      <td class="px-2">
                        {{ today ? parseFloat(profileData.quoteMax).toFixed(4) : profileData.maxValue }} zł
                        <span v-if="!today" style="color: gray; font-size: small;"> ({{ profileData.maxValueDate }})</span>
                      </td>
                    </tr>
                    <tr v-if="!today">
                      <th class="text-left px-2">
                        Średni:
                      </th>
                      <td class="px-2">
                        {{ profileData.valueAverage }} zł
                      </td>
                    </tr>
                    <tr>
                      <th class="text-left px-2">
                        Wolumen obrotu:
                      </th>
                      <td class="px-2">
                        {{ today ? profileData.volume : profileData.volumeSumValue }} szt
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
              <span>{{ symbolLong }} ({{ symbol }})</span>
              <span>
                <!--TODO-->
                <b>{{ profileData.quote }} zł</b>
              </span>
            </v-card-title>
            <!--TODO: scale-->
            <v-card-text>
              <div id="productChart">
                <canvas id="chart" />
              </div>
              <div class="my-2">
                <span class="mr-4 font-weight-bold">Okres:</span>
                <v-btn
                  color="white"
                  small
                  @click="changeData('1D')"
                >
                  1D
                </v-btn>
                <v-btn
                  color="white"
                  small
                  @click="changeData('1T')"
                >
                  1T
                </v-btn>
                <v-btn
                  color="white"
                  small
                  @click="changeData('1M')"
                >
                  1M
                </v-btn>
                <v-btn
                  color="white"
                  small
                  @click="changeData('3M')"
                >
                  3M
                </v-btn>
                <v-btn
                  color="white"
                  small
                  @click="changeData('6M')"
                >
                  6M
                </v-btn>
                <v-btn
                  color="white"
                  small
                  @click="changeData('1Y')"
                >
                  1Y
                </v-btn>
                <v-btn
                  color="white"
                  small
                  @click="changeData('5Y')"
                >
                  5Y
                </v-btn>
                <v-btn
                  color="white"
                  small
                  @click="changeData('MAX')"
                >
                  Max
                </v-btn>
                <!--TODO-->
                <v-btn
                  color="white"
                  small
                  disabled
                >
                  Custom
                </v-btn>
              </div>
              <div>
                <span class="mr-4 font-weight-bold">Interwał:</span>
                <v-btn
                  color="white"
                  small
                  :disabled="today"
                  @click="changeInterval('D')"
                >
                  D
                </v-btn>
                <v-btn
                  color="white"
                  small
                  :disabled="today"
                  @click="changeInterval('T')"
                >
                  T
                </v-btn>
                <v-btn
                  color="white"
                  small
                  :disabled="today"
                  @click="changeInterval('M')"
                >
                  M
                </v-btn>
                <span class="mx-4 font-weight-bold">Intraday:</span>
                <v-btn
                  color="white"
                  small
                  :disabled="!today"
                  @click="changeInterval('1min')"
                >
                  1 min.
                </v-btn>
                <v-btn
                  color="white"
                  small
                  :disabled="!today"
                  @click="changeInterval('5min')"
                >
                  5 min.
                </v-btn>
                <v-btn
                  color="white"
                  small
                  :disabled="!today"
                  @click="changeInterval('15min')"
                >
                  15 min.
                </v-btn>
                <v-btn
                  color="white"
                  small
                  :disabled="!today"
                  @click="changeInterval('30min')"
                >
                  30 min.
                </v-btn>
                <v-btn
                  color="white"
                  small
                  :disabled="!today"
                  @click="changeInterval('1h')"
                >
                  1h
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-card>
      </v-container>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js'
import moment from 'moment'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import chartData from 'assets/product-details-chart-data'

export default {
  name: 'ProductDetails',
  layout: 'parallax',
  data () {
    return {
      chartData,
      myChart: {}
    }
  },
  computed: {
    chartJson: {
      get () { return this.getChartJson() },
      set (val) { this.setChartJson(val) }
    },
    dateFrom: {
      get () { return this.getDateFrom() },
      set (val) { this.setDateFrom(val) }
    },
    profileData: {
      get () { return this.getProfileData() },
      set (val) { this.setProfileData(val) }
    },
    symbol: {
      get () { return this.getSymbol() },
      set (val) { this.setSymbol(val) }
    },
    symbolLong: {
      get () { return this.getSymbolLong() },
      set (val) { this.setSymbolLong(val) }
    },
    today: {
      get () { return this.getIsToday() },
      set (val) { this.setIsToday(val) }
    }
  },
  async mounted () {
    const params = {
      name: this.$route.params.name,
      symbol: this.$route.params.symbol,
      type: this.$route.params.type
    }
    if (!localStorage.getItem('params')) localStorage.setItem('params', JSON.stringify(params))
    const localParams = JSON.parse(localStorage.getItem('params'))

    this.symbolLong = localParams.name
    if (localStorage.getItem('params').symbol) this.symbol = localParams.symbol
    await this.getStockData(localParams.type)

    const labels = this.chartJson.map(el => new Date(el[0]))
    const values = this.chartJson.map(el => el[1])
    this.createChart('chart', this.chartData(labels, values))
  },
  destroyed () {
    this.resetState()
    localStorage.removeItem('params')
  },
  methods: {
    ...mapActions('products/stock', ['getStockData']),
    ...mapGetters('products/stock', [
      'getChartJson',
      'getDateFrom',
      'getDateTo',
      'getIsMaxPeriod',
      'getIsToday',
      'getProfileData',
      'getSymbol',
      'getSymbolLong'
    ]),
    ...mapMutations('products/stock', [
      'resetState',
      'setChartJson',
      'setDateFrom',
      'setDateTo',
      'setIsMaxPeriod',
      'setIsToday',
      'setProfileData',
      'setSymbol',
      'setSymbolLong'
    ]),
    createChart (chartId, chartData) {
      const ctx = document.getElementById(chartId)
      this.myChart = new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options
      })
      console.log(this.myChart)
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
    },
    async changeData (item) {
      let timeUnit = 'day'
      this.today = item === '1D'
      this.maxPeriod = item === 'MAX'

      switch (item) {
        case '1T': this.dateFrom = moment(new Date()).subtract(1, 'week').format('YYYY-MM-DD')
          break
        case '1M': this.dateFrom = moment(new Date()).subtract(1, 'month').format('YYYY-MM-DD')
          break
        case '3M': this.dateFrom = moment(new Date()).subtract(3, 'months').format('YYYY-MM-DD')
          break
        case '6M': this.dateFrom = moment(new Date()).subtract(6, 'months').format('YYYY-MM-DD')
          break
        case '1Y': this.dateFrom = moment(new Date()).subtract(1, 'year').format('YYYY-MM-DD')
          break
        case '5Y': this.dateFrom = moment(new Date()).subtract(5, 'years').format('YYYY-MM-DD')
          break
      }

      if (item === '1M' || item === '3M') timeUnit = 'week'
      if (item === '6M' || item === '1Y') timeUnit = 'month'
      if (item === '5Y' || item === 'MAX') timeUnit = 'year'

      await this.getStockData(this.$route.params.type)
      this.updateChart(timeUnit)
    },
    changeInterval (item) {
      let stepSize = 1
      let timeUnit = 'day'
      if (item === '1min') timeUnit = 'minute'
      if (item === '5min') {
        timeUnit = 'minute'
        stepSize = 5
      }
      if (item === '15min') {
        timeUnit = 'minute'
        stepSize = 15
      }
      if (item === '30min') {
        timeUnit = 'minute'
        stepSize = 30
      }
      if (item === '1h') timeUnit = 'hour'
      if (item === 'T') timeUnit = 'week'
      if (item === 'M') timeUnit = 'month'
      this.updateChart(timeUnit, stepSize)
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

.green {
  background-color: transparent !important;
  color: #43A047;
}

#chart {
  width: 750px !important;
  height: 375px !important;
}
</style>
