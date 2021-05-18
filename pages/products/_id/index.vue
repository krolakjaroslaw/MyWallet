<!--suppress CssUnknownTarget, CssOverwrittenProperties -->
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
              ALLEGRO
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
                      <th class="text-left px-2">
                        Kurs odniesienia:
                      </th>
                      <td class="px-2">
                        {{ profileData.prevClose }} <span style="color: gray; font-size: small;">({{ item.prevCloseDate }})</span>
                      </td>
                    </tr>
                    <tr>
                      <th class="text-left px-2">
                        Data początkowa:
                      </th>
                      <td class="px-2">
                        {{ item.startDate }}
                      </td>
                    </tr>
                    <tr>
                      <th class="text-left px-2">
                        Data końcowa:
                      </th>
                      <td class="px-2">
                        {{ item.endDate }}
                      </td>
                    </tr>
                    <tr>
                      <th class="text-left px-2">
                        Zmiana:
                      </th>
                      <td class="px-2">
                        {{ item.changeValue }} ({{ item.changePercentValue }})
                      </td>
                    </tr>
                    <tr>
                      <th class="text-left px-2">
                        Minimum:
                      </th>
                      <td class="px-2">
                        {{ item.minValue }} <span style="color: gray; font-size: small;">({{ item.minValueDate }})</span>
                      </td>
                    </tr>
                    <tr>
                      <th class="text-left px-2">
                        Maksimum:
                      </th>
                      <td class="px-2">
                        {{ item.maxValue }} <span style="color: gray; font-size: small;">({{ item.maxValueDate }})</span>
                      </td>
                    </tr>
                    <tr>
                      <th class="text-left px-2">
                        Średni:
                      </th>
                      <td class="px-2">
                        {{ item.averageValue }}
                      </td>
                    </tr>
                    <tr>
                      <th class="text-left px-2">
                        Wolumen obrotu:
                      </th>
                      <td class="px-2">
                        {{ item.volumeSumValue }}
                      </td>
                    </tr>
                    <tr>
                      <th class="text-left px-2">
                        Średni wolumen:
                      </th>
                      <td class="px-2">
                        {{ item.volumeAverageValue }}
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
              <span>Allegro.eu SA (ALE)</span>
              <span>
                <b>58,1400 zł</b>
                <span style="color: green">1,29%</span>
              </span>
            </v-card-title>
            <v-card-text>
              <div id="productChart">
                <canvas id="chart" />
              </div>
              <div class="my-2">
                <span class="mr-4 font-weight-bold">Okres:</span>
                <v-btn
                  color="white"
                  small
                  @click="changeData('eur1d')"
                >
                  1D
                </v-btn>
                <v-btn
                  color="white"
                  small
                  @click="changeData('eur1t')"
                >
                  1T
                </v-btn>
                <v-btn
                  color="white"
                  small
                  @click="changeData('eur1m')"
                >
                  1M
                </v-btn>
                <v-btn
                  color="white"
                  small
                  @click="changeData('eur3m')"
                >
                  3M
                </v-btn>
                <v-btn
                  color="white"
                  small
                  @click="changeData('eur6m')"
                >
                  6M
                </v-btn>
                <v-btn
                  color="white"
                  small
                  @click="changeData('eur1y')"
                >
                  1Y
                </v-btn>
                <v-btn
                  color="white"
                  small
                  @click="changeData('eur5y')"
                >
                  5Y
                </v-btn>
                <v-btn
                  color="white"
                  small
                  @click="changeData('eurMax')"
                >
                  Max
                </v-btn>
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
                  @click="changeData('eur1m')"
                >
                  D
                </v-btn>
                <v-btn
                  color="white"
                  small
                  @click="changeData('eur3m')"
                >
                  T
                </v-btn>
                <v-btn
                  color="white"
                  small
                  @click="changeData('eur6m')"
                >
                  M
                </v-btn>
                <span class="mx-4 font-weight-bold">Intraday:</span>
                <v-btn
                  color="white"
                  small
                  @click="changeData('eur1y')"
                >
                  1 min.
                </v-btn>
                <v-btn
                  color="white"
                  small
                  @click="changeData('eur5y')"
                >
                  5 min.
                </v-btn>
                <v-btn
                  color="white"
                  small
                  @click="changeData('eurMax')"
                >
                  15 min.
                </v-btn>
                <v-btn
                  color="white"
                  small
                >
                  30 min.
                </v-btn>
                <v-btn
                  color="white"
                  small
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
import json from 'assets/allegro-data.json'
import chartData from 'assets/allegro-chart-data'
import Chart from 'chart.js'
import { mapActions } from 'vuex'

export default {
  name: 'ProductDetails',
  layout: 'parallax',
  data () {
    return {
      chartData,
      profileData: json.profileData,
      item: {
        prevClose: '56,5000 zł',
        prevCloseDate: '21-04-23 17:00',
        startDate: '2021-04-26 09:00',
        endDate: '2021-04-30 17:00',
        changeValue: '1,6400 zł',
        changePercentValue: '2,90%',
        minValue: '55,9200 zł',
        minValueDate: '21-04-26 10:12',
        maxValue: '58,4400 zł',
        maxValueDate: '21-04-29 12:48',
        averageValue: '57,0661 zł',
        volumeSumValue: '5 184 260 szt',
        volumeAverageValue: '4 625 szt'
      }
    }
  },
  created () {
    this.getProductSummary(this.$route.params.id)
    this.getHistoryData(this.$route.params.id)
  },
  mounted () {
    const labels = json.main.map(el => new Date(el[0]))
    const values = json.main.map(el => el[1])
    this.createChart('chart', this.chartData(labels, values))
  },
  methods: {
    ...mapActions('wallets/entity', ['getHistoryData', 'getProductSummary']),

    createChart (chartId, chartData) {
      const ctx = document.getElementById(chartId)
      const myChart = new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options
      })
      console.log(myChart)
    },
    changeData (item) {
      console.log('change', item)
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

#chart {
  width: 750px !important;
  height: 375px !important;
}
</style>
