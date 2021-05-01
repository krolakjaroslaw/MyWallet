<!--suppress CssUnknownTarget, CssOverwrittenProperties -->
<template>
  <div>
    <div class="page-header">
      <parallax
        class="parallax"
        style="
          background: -webkit-linear-gradient(rgba(20, 75, 150, 0.6), rgba(44, 44, 44, 0.6)), url('profile.jpg') center center no-repeat; /* For Safari 5.1 to 6.0 */
          background: -o-linear-gradient(rgba(20, 75, 150, 0.6), rgba(44, 44, 44, 0.6)), url('profile.jpg') center center no-repeat; /* For Opera 11.1 to 12.0 */
          background: -moz-linear-gradient(rgba(20, 75, 150, 0.6), rgba(44, 44, 44, 0.6)), url('profile.jpg') center center no-repeat; /* For Firefox 3.6 to 15 */
          background: linear-gradient(rgba(20, 75, 150, 0.6), rgba(44, 44, 44, 0.6)), url('profile.jpg') center center no-repeat; /* Standard syntax */
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
            style="min-width: 150px; max-width: 200px;"
          >
            <v-card-title class="mb-4">
              Wallets:
            </v-card-title>
            <v-card-text
              v-for="wallet in wallets"
              :key="wallet.id"
              class="py-3"
            >
              {{ wallet.name }}
            </v-card-text>
          </v-card>

          <v-card
            elevation="0"
            style="background-color: transparent"
          >
            <v-card-title class="py-2">
              Wallet #12345
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
            v-for="(category, index) in categories"
            :key="index"
            class="elevation-3"
            expand
          >
            <v-expansion-panel-header>
              <template #default>
                <v-row no-gutters>
                  {{ category.name }}
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
                      <th class="text-left">
                        Name
                      </th>
                      <th class="text-left">
                        Value
                      </th>
                      <th class="text-left">
                        Change
                      </th>
                      <th class="text-left">
                        Last update
                      </th>
                      <th class="text-left">
                        Date created
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="item in realEstates"
                      :key="item.id"
                    >
                      <td>{{ item.name }}</td>
                      <td>{{ item.value }}</td>
                      <td>{{ item.change }}</td>
                      <td>{{ item.lastUpdate }}</td>
                      <td>{{ item.created }}</td>
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
import pieChartData from '../assets/pie-chart-data'

export default {
  name: 'WalletDetails',
  layout: 'parallax',
  data () {
    return {
      pieChartData,
      panel: [],
      categories: [
        {
          name: 'Real Estates',
          sum: 100000.00,
          currencies: 45000.00,
          resources: 20000.00,
          stock: 35000.00
        },
        {
          name: 'Currencies',
          sum: 100000.00,
          currencies: 45000.00,
          resources: 20000.00,
          stock: 35000.00
        },
        {
          name: 'Stock',
          sum: 100000.00,
          currencies: 45000.00,
          resources: 20000.00,
          stock: 35000.00
        }
      ],
      realEstates: [
        {
          name: 'Estate1',
          value: '1.000.000 zł',
          change: '-10%',
          lastUpdate: '30-04-2021',
          created: '30-04-2020',
          id: '0'
        },
        {
          name: 'Estate2',
          value: '1.500.000 zł',
          change: '+50%',
          lastUpdate: '30-04-2021',
          created: '30-04-2010',
          id: '1'
        },
        {
          name: 'Estate3',
          value: '500.000 zł',
          change: '+10%',
          lastUpdate: '30-04-2021',
          created: '30-01-2015',
          id: '2'
        }
      ],
      wallets: [
        { id: 1, name: 'wallet1' },
        { id: 2, name: 'wallet2' },
        { id: 3, name: 'wallet3' },
        { id: 4, name: 'wallet4' },
        { id: 5, name: 'wallet5' }
      ]
    }
  },
  mounted () {
    const pieLabels = ['Red', 'Orange', 'Yellow', 'Green', 'Blue']
    const pieValues = [10, 18, 22, 15, 35]
    const colors = [
      'rgba(255, 0, 0, 0.9)',
      'rgba(255, 150, 0, 0.9)',
      'rgba(255, 255, 0, 0.9)',
      'rgba(100, 255, 0, 0.9)',
      'rgba(0, 100, 255, 0.9)'
    ]
    this.createChart('pie-chart', this.pieChartData(pieLabels, pieValues, colors))
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
